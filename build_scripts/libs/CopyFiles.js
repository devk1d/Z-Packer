
import path from 'path';
import fs from 'fs-extra';
import Helper from '../tools/Helper';
import config from '../config';

const paths = config.paths;

/*
 * 拷贝目录方法
 * relativePath 相对 paths.pages 的目录位置
 */
function CopyFiles(relativePath) {
    // 删除响应的 output 目录
    const rmPath = path.join(paths.output, relativePath);
    fs.removeSync(rmPath);
    Helper.logCyan(`    - 删除目录: ${rmPath}\n`);

    const cpPath = path.join(paths.pages, relativePath);
    fs.copySync(cpPath, path.join(paths.output, relativePath));
    Helper.logCyan(`    - 复制目录: ${cpPath}\n`);
}

export default CopyFiles;
