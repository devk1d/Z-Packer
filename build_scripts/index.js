
import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';
import config from './config';
import CopyFiles from './libs/CopyFiles';
import PackLibs from './tasks/PackLibs';
import PackGlobal from './libs/PackGlobal';
import PackSinglePage from './tasks/PackSinglePage';
import Helper from './tools/Helper';

let startTime = +new Date();
let taskCount = 0;

async function _packLibs() {
    // 打包 libs
    startTime = +new Date();
    Helper.log(`--- 任务 ${++taskCount}: 打包libs ---\n`);

    const libsAsset = await PackLibs(); // return {js: 'js file name', css: 'css file name'}
    global.ASSETS.libs = libsAsset;

    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n\n`);
}

async function WatchFiles() {

    chokidar.watch([config.paths.pages, config.paths.libs], {ignored: /[\/\\]\./}).on('all', async function(event, changeFilePath) {
        const pathParse = path.parse(changeFilePath);

        // libs
        if(~changeFilePath.indexOf(config.paths.libs)) {
            await _packLibs();

            // 遍历页面
            glob.sync(path.join(config.paths.output, '*', '*', '*.php')).forEach(filePath => {
                let fileContent = fs.readFileSync(filePath);
                const mat = fileContent.match(/\$this->pageLibsStatic\((.+)\)/g);

                if(!mat) {
                    return ;
                }

                fileContent = fileContent.replace(/libs_(.+).js/, global.ASSETS.libs.js);
                fileContent = fileContent.replace(/libs_(.+).css/, global.ASSETS.libs.css);
                fs.writeFileSync(filePath, fileContent);
            })
        }else {
            const spDir = pathParse.dir.split('/').reverse();

            // global
            if(spDir[0] == 'global' || spDir[1] == 'global') {
                const globalPath = spDir[0] == 'global' ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(config.paths.pages, globalPath);
                const globalOutputPath = path.join(config.paths.output, relativePath);

                // 移动文件至 output
                CopyFiles(relativePath);

                // 打包 global
                const globalAsset = await PackGlobal(globalOutputPath);

                // 遍历项目的所有页面，替换 global js css
                glob.sync(path.join(globalOutputPath, '..', '*', '*.php')).forEach(filePath => {
                    let fileContent = fs.readFileSync(filePath);
                    const mat = fileContent.match(/\$this->pageGlobalStatic\((.+)\)/g);

                    if(!mat) {
                        return ;
                    }

                    fileContent = fileContent.replace(/global_(.+).js/, globalAsset.js);
                    fileContent = fileContent.replace(/global_(.+).css/, globalAsset.css);
                    fs.writeFileSync(filePath, fileContent);
                })
            }
            // 单页面打包
            else {
                // www/mobile/index.php or www/mobile/page/page.php
                const pagePath = path.relative(config.paths.pages, changeFilePath).split('/').length == 3 ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(config.paths.pages, pagePath);
                const pageOutputPath = path.join(config.paths.output, relativePath);

                CopyFiles(relativePath);

                // 遍历项目的所有页面，替换 page js css
                const pageFiles = glob.sync(path.join(pageOutputPath, '*.php'));
                for (let filePath of pageFiles) {
                    startTime = +new Date();
                    Helper.log(`--- 任务 ${++taskCount}: 打包页面 ${path.relative(config.paths.output, filePath)} ---\n`);
                    await PackSinglePage(filePath);
                    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n\n`);
                };
            }
        }

    });
}

async function packAll() {
    taskCount = 0;
    global.ASSETS = {
        libs: {
            js: '',
            css: ''
        }
    };
    global.TEMP_CACHE = {};

    // 复制 pages 目录
    startTime = +new Date();
    Helper.log(`--- 任务 ${++taskCount}: 复制目录 ---\n`);
    CopyFiles('.');
    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n\n`);

    await _packLibs();

    // 遍历页面
    const pageFiles = glob.sync(path.join(config.paths.output, '*', '*', '*.php'));
    for (let filePath of pageFiles) {
        startTime = +new Date();
        Helper.log(`--- 任务 ${++taskCount}: 打包页面 ${path.relative(config.paths.output, filePath)} ---\n`);
        await PackSinglePage(filePath);
        Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n\n`);
    }
}

(async function run() {
    await packAll();
    await WatchFiles();
})();
