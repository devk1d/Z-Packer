import fs from 'fs-extra';
import path from 'path';
import UglifyJS from 'uglify-js';
import CleanCSS from 'clean-css';
import glob from 'glob';
import less from 'less';

const babel = require('babel-core');


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

    let packedCoded = ConcatFiles(packFiles);

    if(packType == 'css') {
        try {
            packedCoded = (await less.render(packedCoded)).css;
        }catch(err) {
            console.log(err);
        }

        if(!config.debug) {
            try {
                packedCoded = new CleanCSS().minify(packedCoded).styles;
            }catch(err) {
                console.log(err);
            }
        }
    }else {
        try {
            packedCoded = babel.transform(packedCoded, {
                presets: ['latest'],
                plugins: ['babel-plugin-transform-remove-strict-mode' /*, 'transform-runtime'*/],
                compact: false,
            }).code;
        }catch(err) {
            console.log(err);
        }

        if(!config.debug) {
            try {
                packedCoded = UglifyJS.minify(packedCoded, { fromString: true }).code;
            }catch(err) {
                console.log(err);
            }
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
