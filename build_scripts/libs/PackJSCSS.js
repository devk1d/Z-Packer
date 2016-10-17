import fs from 'fs-extra';
import path from 'path';
import UglifyJS from 'uglify-js';
import CleanCSS from 'clean-css';
import glob from 'glob';
import less from 'less';

import config from '../config';
import Helper from '../tools/Helper';
import ConcatFiles from './ConcatFiles';

async function PackJSCSS(opts) {
    // opts = {
    //     packFiles: [],
    //     packType: '', // js css
    //     outputName: ''
    // }

    const packFiles = opts.packFiles;
    const packType = opts.packType;
    const outputName = opts.outputName;
    const destPath = packType == 'js' ? config.paths.buildJs : config.paths.buildCss;

    let packedCoded = "";
    if(packType == 'css') {
        packedCoded = ConcatFiles(packFiles);

        try {
            packedCoded = (await less.render(packedCoded)).css;
        }catch(err) {
            console.log(err);
        }

        if(!config.debug) {
            packedCoded = new CleanCSS().minify(packedCoded).styles;
        }
    }else {
        if(!config.debug) {
            try {
                packedCoded = UglifyJS.minify(packFiles).code;
            }catch(err) {
                console.log(err);
            }

        }else {
            packedCoded = ConcatFiles(packFiles);
        }
    }

    // 删除原先的 文件
    const removeFiles = glob.sync(path.join(destPath, outputName + '*.' + packType));
    removeFiles.forEach(filePath => {
        fs.removeSync(filePath);
    });

    const destName = outputName + Helper.md5(packedCoded).slice(0, 5) + '.' + packType;
    fs.writeFileSync(path.join(destPath, destName), packedCoded);

    return destName;
}

export default PackJSCSS;
