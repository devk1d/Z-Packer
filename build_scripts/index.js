
import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';

import config from './config';
import CopyFiles from './libs/CopyFiles';
import PackLibs from './tasks/PackLibs';
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


(async function run() {
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

    chokidar.watch([config.paths.pages, config.paths.libs], {ignored: /[\/\\]\./}).on('all', async function(event, changeFilePath) {
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
        }
    });
})();
