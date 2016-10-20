
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import config from './config';
import Helper from './tools/Helper';

import PackLayouts from './tasks/PackLayouts';
import WatchFiles from './tasks/WatchFiles';
import PackLibs from './tasks/PackLibs';
import PackPages from './tasks/PackPages';
import CopyFiles from './libs/CopyFiles';
import PackGlobal from './libs/PackGlobal';

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

    await PackPages();
}

(async function run() {
    await packAll();
    await WatchFiles();
})();
