
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from '../libs/PackJSCSS';

const paths = config.paths;

/*
 * 打包 libs
 *
 */
async function PackLibs() {
    const startTime = +new Date();
    Helper.log(`--- 任务: 打包libs ---\n`);

    const jsFiles = glob.sync(path.join(paths.libs, 'js', '*.js'));
    const packedJsName = await PackJSCSS({
        packFiles: jsFiles,
        packType: 'js',
        outputName: 'libs_',
    });

    const cssFiles = glob.sync(path.join(paths.libs, 'css', '*.*ss'));
    const packedCssName = await PackJSCSS({
        packFiles: cssFiles,
        packType: 'css',
        outputName: 'libs_',
    })

    Helper.logCyan(`    - 打包 js/css \n`);
    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);

    return {js: packedJsName, css: packedCssName};
}

export default PackLibs;
