
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from '../libs/PackJSCSS';
import PackGlobal from '../libs/PackGlobal';
import GetPageIncludeWidget from '../libs/GetPageIncludeWidget';
import PackImage from '../libs/PackImage';
import ReplaceTemplate from '../libs/ReplaceTemplate';

let startTime;

async function processGlobal(pagePath) {
    const globalPath = path.resolve(pagePath, '..', '..', 'global');
    let globalAsset;

    if(Helper.fileExists(path.join(globalPath, '.asset'))) {
        globalAsset = JSON.parse(fs.readFileSync(path.join(globalPath, '.asset'), { encoding: 'utf8' }));
    }else {
        startTime = +new Date();
        globalAsset = await PackGlobal(globalPath);
        Helper.logCyan(`    - 打包页面 global，耗时：${Helper.caculateTime(startTime)}\n`);
    }

    return globalAsset;
}

/*
 * 打包 libs
 *
 */
async function PackSinglePage(pagePath) {
    const pageWidget = GetPageIncludeWidget(pagePath);
    const pathParse = path.parse(pagePath);
    const pageDir = pathParse.dir;
    const pageName = pathParse.name;
    const widgetPathArr = pageWidget.map(widgetName => path.join(pageDir, widgetName));

    Helper.logCyan(`    - 包含widget: ${pageWidget.join(', ')}\n`);

    // 打包 image
    startTime = +new Date();
    await PackImage([pageDir].concat(widgetPathArr));
    Helper.logCyan(`    - 打包图片，耗时：${Helper.caculateTime(startTime)}\n`);

    let fileContent = fs.readFileSync(pagePath, { encoding: 'utf8' });

    // 如果没有 layout 那就不用打包js css了
    if(!~fileContent.indexOf('setLayout')) {
        return ;
    }

    // 添加 libs js css
    fileContent += `\n{pageLibsStatic "${global.ASSETS.libs.js}", "${global.ASSETS.libs.css}"}\n`;

    // 添加 global js css
    const globalAsset = await processGlobal(pagePath);
    fileContent += `\n{pageGlobalStatic "${globalAsset.js}", "${globalAsset.css}"}\n`;

    // 添加 page js css
    startTime = +new Date();
    let jsFiles = [], pageAsset = {js: '', css: ''};
    widgetPathArr.forEach(widgetPath => {
        jsFiles = jsFiles.concat(glob.sync(path.join(widgetPath, '*.js')));
    });
    jsFiles = jsFiles.concat(glob.sync(path.join(pageDir, pageName + '.js')));
    if(jsFiles.length) {
        pageAsset.js = await PackJSCSS({
            packFiles: jsFiles,
            packType: 'js',
            outputName: 'page_' + Helper.md5(path.relative(config.paths.output, pagePath)).slice(0, 5),
        });
    }

    let cssFiles = [];
    widgetPathArr.forEach(widgetPath => {
        cssFiles = cssFiles.concat(glob.sync(path.join(widgetPath, '*.*ss')));
    });
    cssFiles = cssFiles.concat(glob.sync(path.join(pageDir, pageName + '.*ss')));
    if(cssFiles.length) {
        pageAsset.css = await PackJSCSS({
            packFiles: cssFiles,
            packType: 'css',
            outputName: 'page_' + Helper.md5(path.relative(config.paths.output, pagePath)).slice(0, 5),
        })
    }
    fileContent += `\n{pageStatic "${pageAsset.js}", "${pageAsset.css}"}\n`;

    //  php 模板替换
    fileContent = ReplaceTemplate(fileContent);

    fs.writeFileSync(pagePath, fileContent);
    Helper.logCyan(`    - 打包页面 js/css，耗时：${Helper.caculateTime(startTime)}\n`);
}

export default PackSinglePage;
