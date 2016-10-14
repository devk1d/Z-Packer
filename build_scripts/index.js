
import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import config from './config';
import CopyFiles from './libs/CopyFiles';
import PackLibs from './tasks/PackLibs';
import PackSinglePage from './tasks/PackSinglePage';

const paths = config.paths;
const regExp = config.regExp;

let ASSETS = {
    libs: {
        js: '',
        css: ''
    }
};


(async function run() {

    global.TEMP_CACHE = {};
    // 复制 pages 目录
    // CopyFiles('.');

    // 打包 libs
    // const libsAsset = await PackLibs(); // return {js: 'js file name', css: 'css file name'}
    // console.log(libsAsset);
    // ASSETS.libs = libsAsset;

    // 遍历页面
    const pageFiles = glob.sync( path.join(paths.output, '*', '*', '*.php') );
    pageFiles.forEach(async function(filePath) {
        await PackSinglePage(filePath, ASSETS.libs);
    })

// // 删除 output 目录
// fs.removeSync(paths.output);
//
// // 复制 pages 目录
// fs.ensureDirSync(paths.output);
// fs.copySync(paths.pages, paths.output);
// log(chalk.green('复制 pages 目录成功'));


// 遍历 Global 文件
// const globalFiles = glob.sync( path.join(paths.output, '*', 'global', '**', '*.*') );
// const jsFiles = globalFiles.filter( filePath  => ~filePath.indexOf('.js') )
// console.log(jsFiles);
//
// const packedJsName = Pack_JS_CSS({
//     packFiles: jsFiles,
//     packType: 'js',
//     outputName: 'global_' + Helper.md5(path.relative(config.paths.output, pagePath)).slice(0, 5),
// });
//
// console.log(packedJsName);

})();
