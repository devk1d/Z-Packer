import fs from 'fs-extra';
import path from 'path';
import UglifyJS from 'uglify-js';
import CleanCSS from 'clean-css';
import glob from 'glob';

import config from '../config';
import Helper from '../tools/Helper';


class Pack_JS_CSS {
    constructor(packFiles, outputName, packType) {
        this.packFiles = packFiles;
        this.packType = packType; // js or css
        this.outputName = outputName;
        this.destPath = path.join(config.paths.static, packType);
    }

    start() {
        fs.ensureDirSync(this.destPath);

        let destName = this.packing();

        return destName;
    }

    packing() {
        const minifyCoded = this.packType == 'js' ? UglifyJS.minify(this.packFiles).code : (new CleanCSS().minify(this.packFiles));
        const destName = this.outputName + Helper.md5(minifyCoded).slice(0, 5) + '.' + this.packType;

        this.removePackedFile();
        fs.writeFileSync(path.join(this.destPath, destName), minifyCoded);

        return destName;
    }

    // 删除原先的 js
    removePackedFile() {
        const removeFiles = glob.sync(path.join(this.destPath, this.outputName + '*.' + this.packType));
        removeFiles.forEach((filePath) => {
            fs.removeSync(filePath);
        });
    }
}

export default function pack(opts) {
    const packIns = new Pack_JS_CSS(opts.packFiles, opts.outputName, opts.packType);
    return packIns.start();
}
