import fs from 'fs-extra';
import path from 'path';
import UglifyJS from 'uglify-js';
import CleanCSS from 'clean-css';
import glob from 'glob';
import less from 'less';

import config from '../config';
import Helper from '../tools/Helper';
import ConcatFiles from './ConcatFiles';

class Pack_JS_CSS {
    constructor(packFiles, outputName, packType) {
        this.packFiles = packFiles;
        this.packType = packType; // js or css
        this.outputName = outputName;
        this.destPath = path.join(config.paths.build, packType);
    }

    start() {
        fs.ensureDirSync(this.destPath);
        
        let destName = this.packing();
        return destName;
    }

    async packing() {
        let packedCoded = "";

        if(this.packType == 'css') {
            packedCoded = ConcatFiles(this.packFiles);
            packedCoded = (await less.render(packedCoded)).css;
            packedCoded = new CleanCSS().minify(packedCoded).styles;
        }else {
            packedCoded = UglifyJS.minify(this.packFiles).code;
        }

        const destName = this.outputName + Helper.md5(packedCoded).slice(0, 5) + '.' + this.packType;

        this.removeOldFile();

        fs.writeFileSync(path.join(this.destPath, destName), packedCoded);

        return destName;
    }

    // 删除原先的 文件
    removeOldFile() {
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
