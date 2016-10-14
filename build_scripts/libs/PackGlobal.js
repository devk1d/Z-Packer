
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from './PackJSCSS';

const paths = config.paths;

/*
 * 打包 libs
 *
 */
async function PackGlobal(globalPath) {
    let asset = {js: '', css: ''};

    if(!Helper.dirExists(globalPath)) {
        return asset;
    }

    const jsFiles = glob.sync( path.join(globalPath, '**', '*.js') );

    asset.js = await PackJSCSS({
        packFiles: jsFiles,
        packType: 'js',
        outputName: 'global_' + Helper.md5(globalPath).slice(0, 5),
    });

    const cssFiles = glob.sync( path.join(globalPath, '**', '*.*ss') );
    asset.css = await PackJSCSS({
        packFiles: cssFiles,
        packType: 'css',
        outputName: 'global_' + Helper.md5(globalPath).slice(0, 5),
    })

    // 写入 asset
    fs.writeFileSync(path.join(globalPath, '.asset'), JSON.stringify(asset, null, 2));

    return asset;
}

export default PackGlobal;
