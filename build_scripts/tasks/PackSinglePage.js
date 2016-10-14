
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from '../libs/PackJSCSS';
import PackGlobal from '../libs/PackGlobal';
import GetPageIncludeWidget from '../libs/GetPageIncludeWidget';
import PackImage from '../libs/PackImage';

const paths = config.paths;

async function processGlobal(pagePath) {
    const globalPath = path.resolve(pagePath, '..', '..', 'global');
    let globalAsset;

    if(Helper.fileExists(path.join(globalPath, '.asset'))) {
        globalAsset = JSON.parse(fs.readFileSync(path.join(globalPath, '.asset'), { encoding: 'utf8' }));
    }else {
        globalAsset = await PackGlobal(globalPath);
    }

    return globalAsset;
}

/*
 * 打包 libs
 *
 */
async function PackSinglePage(pagePath, libsAsset) {
    let fileContent = fs.readFileSync(pagePath, { encoding: 'utf8' });

    // 添加 libs js css
    fileContent += `\n{pageLibs "${libsAsset.js}", "${libsAsset.css}"}\n`;

    // 添加 global js css
    // const globalAsset = await processGlobal(pagePath);
    // fileContent += `\n{pageGlobal "${globalAsset.js}", "${globalAsset.css}"}\n`;


    // 打包 image
    const pageWidget = GetPageIncludeWidget(pagePath);
    const pageDir = path.parse(pagePath).dir;
    const widgetPathArr = pageWidget.map((widgetName) => {
        return path.join(pageDir, widgetName);
    });
    PackImage([pageDir].concat(widgetPathArr));


    // 添加 page js css
    // console.log(fileContent);
}




export default PackSinglePage;
