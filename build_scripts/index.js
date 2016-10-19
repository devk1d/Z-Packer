
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import config from './config';
import CopyFiles from './libs/CopyFiles';
import PackLayouts from './tasks/PackLayouts';
import PackLibs from './tasks/PackLibs';
import PackGlobal from './libs/PackGlobal';
import PackSinglePage from './tasks/PackSinglePage';
import WatchFiles from './tasks/WatchFiles';
import Helper from './tools/Helper';

const paths = config.paths;

async function packAll() {
    Helper.initVal();

    // 复制 pages 目录
    CopyFiles('.');

    // 打包 layout
    const layoutPathArr = glob.sync(path.join(paths.output, 'layouts', '*.php'));
    layoutPathArr.forEach(layoutPath => {
        PackLayouts(layoutPath);
    });

    // 打包 libs
    const libsAsset = await PackLibs(); // return {js: 'js file name', css: 'css file name'}
    global.ASSETS.libs = libsAsset;

    // 遍历页面
    const pageFiles = glob.sync(path.join(paths.output, '*', '*', '*.php'));
    for (let filePath of pageFiles) {
        await PackSinglePage(filePath);
    }
}

(async function run() {
    await packAll();
    await WatchFiles();
})();
