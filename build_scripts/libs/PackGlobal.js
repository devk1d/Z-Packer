
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackImage from './PackImage';
import PackJSCSS from './PackJSCSS';
import ReplaceTemplate from './ReplaceTemplate';

/*
 * 打包 libs
 *
 */
async function PackGlobal(globalPath) {
    const namePrev = 'global_' + Helper.md5(path.relative(config.paths.output, globalPath)).slice(0, 5);
    const globalWidgetPhpFiles = glob.sync(path.join(globalPath, '*', '*.php'));

    let asset = {js: '', css: ''};

    if(!Helper.dirExists(globalPath)) {
        return asset;
    }

    // 删除原先文件
    glob.sync(path.join(config.paths.build, 'js', namePrev + '*.js'))
    .concat(glob.sync(path.join(config.paths.build, 'css', namePrev + '*.css')))
    .forEach(filePath => fs.removeSync(filePath));

    // 先打包图片
    await PackImage(globalWidgetPhpFiles.map(widgetPath => path.parse(widgetPath).dir));

    // 打包 js 和 css
    const jsFiles = glob.sync( path.join(globalPath, '**', '*.js') );
    asset.js = await PackJSCSS({
        packFiles: jsFiles,
        packType: 'js',
        outputName: namePrev,
    });

    const cssFiles = glob.sync( path.join(globalPath, '**', '*.*ss') );
    asset.css = await PackJSCSS({
        packFiles: cssFiles,
        packType: 'css',
        outputName: namePrev,
    });

    // php替换
    globalWidgetPhpFiles.forEach(filePath => {
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        const newFileContent = ReplaceTemplate(fileContent);

        if(fileContent !== newFileContent) {
            fs.writeFileSync(filePath, newFileContent);
        }
    });

    // 写入 asset
    fs.writeFileSync(path.join(globalPath, '.asset'), JSON.stringify(asset, null, 2));

    return asset;
}

export default PackGlobal;
