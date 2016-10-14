
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
    const jsFiles = glob.sync( path.join(paths.libs, 'js', '*.js') );
    const packedJsName = await PackJSCSS({
        packFiles: jsFiles,
        packType: 'js',
        outputName: 'libs_',
    });

    const cssFiles = glob.sync( path.join(paths.libs, 'css', '*.*ss') );
    const packedCssName = await PackJSCSS({
        packFiles: cssFiles,
        packType: 'css',
        outputName: 'libs_',
    })

    return {js: packedJsName, css: packedCssName};
}

export default PackLibs;
