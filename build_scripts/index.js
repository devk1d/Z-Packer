
import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';
import config from './config';
import CopyFiles from './libs/CopyFiles';
import PackLayouts from './tasks/PackLayouts';
import PackLibs from './tasks/PackLibs';
import PackGlobal from './libs/PackGlobal';
import PackSinglePage from './tasks/PackSinglePage';
import Helper from './tools/Helper';

const paths = config.paths;

let startTime = +new Date();
let taskCount = 0;

async function _packLibs() {
    // 打包 libs
    startTime = +new Date();
    Helper.log(`--- 任务 ${++taskCount}: 打包libs ---\n`);

    const libsAsset = await PackLibs(); // return {js: 'js file name', css: 'css file name'}
    global.ASSETS.libs = libsAsset;

    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
}

async function WatchFiles() {
    Helper.log('--- 开始监测文件变化 ---\n');
    chokidar.watch([paths.pages, paths.libs], { ignored: /[\/\\]\./, ignoreInitial: true }).on('all', async function(event, changeFilePath) {
        initVal();

        Helper.log(`--- 变化文件：${path.relative(paths.pages, changeFilePath)}, 类型：${event} ---\n`);

        const pathParse = path.parse(changeFilePath);

        // libs
        if(~changeFilePath.indexOf(paths.libs)) {
            await _packLibs();

            // 遍历页面
            glob.sync(path.join(paths.output, '*', '*', '*.php')).forEach(filePath => {
                let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
                const mat = fileContent.match(/\$this->pageLibsStatic\((.+)\)/g);

                if(!mat) {
                    return ;
                }

                fileContent = fileContent.replace(/libs_([a-zA-Z0-9]+).js/, global.ASSETS.libs.js);
                fileContent = fileContent.replace(/libs_([a-zA-Z0-9]+).css/, global.ASSETS.libs.css);
                fs.writeFileSync(filePath, fileContent);
            })
        }
        // layout
        else if(~changeFilePath.indexOf('layouts')) {
            const relativePath = path.relative(paths.pages, changeFilePath);

            // 移动文件至 output
            const isSuccess = CopyFiles(relativePath);

            if(isSuccess) {
                startTime = +new Date();
                Helper.log(`--- 任务 ${++taskCount}: 打包layout ${relativePath} ---\n`);
                PackLayouts(path.join(paths.output, relativePath));
                Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
            }
        }
        else {
            const spDir = pathParse.dir.split('/').reverse();

            // global
            if(spDir[0] == 'global' || spDir[1] == 'global') {
                Helper.log('--- 打包 global ---\n');
                const globalPath = spDir[0] == 'global' ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(paths.pages, globalPath);
                const globalOutputPath = path.join(paths.output, relativePath);

                // 移动文件至 output
                CopyFiles(relativePath);

                // 打包 global
                startTime = +new Date();
                const globalAsset = await PackGlobal(globalOutputPath);
                Helper.logCyan(`    - 打包页面 global\n`);
                Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);

                // 遍历项目的所有页面，替换 global js css
                glob.sync(path.join(globalOutputPath, '..', '*', '*.php')).forEach(filePath => {
                    let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
                    const mat = fileContent.match(/\$this->pageGlobalStatic\((.+)\)/g);

                    if(!mat) {
                        return ;
                    }

                    fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).js/, globalAsset.js);
                    fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).css/, globalAsset.css);
                    fs.writeFileSync(filePath, fileContent);
                })
            }
            // 单页面打包
            else {
                Helper.log('--- 打包页面 ---\n');
                // www/mobile/index.php or www/mobile/page/page.php
                const pagePath = path.relative(paths.pages, changeFilePath).split('/').length == 3 ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(paths.pages, pagePath);
                const pageOutputPath = path.join(paths.output, relativePath);

                CopyFiles(relativePath);

                // 遍历项目的所有页面，替换 page js css
                const pageFiles = glob.sync(path.join(pageOutputPath, '*.php'));

                for (let filePath of pageFiles) {

                    startTime = +new Date();
                    Helper.log(`--- 任务 ${++taskCount}: 打包页面 ${path.relative(paths.output, filePath)} ---\n`);
                    await PackSinglePage(filePath);
                    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
                };
            }
        }

    });
}

function initVal() {
    global.ASSETS = {
        libs: {
            js: '',
            css: ''
        }
    };
    global.TEMP_CACHE = {};
}

async function packAll() {
    initVal();

    // 复制 pages 目录
    startTime = +new Date();
    Helper.log(`--- 任务 ${++taskCount}: 复制目录 ---\n`);
    CopyFiles('.');
    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);

    // 打包 layout
    const layoutPathArr = glob.sync(path.join(paths.output, 'layouts', '*.php'));
    layoutPathArr.forEach(layoutPath => {
        startTime = +new Date();
        Helper.log(`--- 任务 ${++taskCount}: 打包layout ${path.relative(paths.output, layoutPath)} ---\n`);
        PackLayouts(layoutPath);
        Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
    });

    // 打包 libs
    await _packLibs();

    // 遍历页面
    const pageFiles = glob.sync(path.join(paths.output, '*', '*', '*.php'));
    for (let filePath of pageFiles) {
        startTime = +new Date();
        Helper.log(`--- 任务 ${++taskCount}: 打包页面 ${path.relative(paths.output, filePath)} ---\n`);
        await PackSinglePage(filePath);
        Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
    }
}

(async function run() {
    await packAll();
    await WatchFiles();
})();
