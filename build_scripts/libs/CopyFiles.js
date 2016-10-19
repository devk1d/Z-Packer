
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

    if(Helper.dirExists(rmPath) || Helper.fileExists(rmPath)) {
        const startTime = +new Date();
        Helper.log(`--- 任务: 复制目录 ---\n`);

        Helper.logCyan(`    - 删除目录/文件: ${rmPath}\n`);
        fs.removeSync(rmPath);

        const cpPath = path.join(paths.pages, relativePath);
        Helper.logCyan(`    - 复制目录/文件: ${cpPath}\n`);
        fs.copySync(cpPath, path.join(paths.output, relativePath));

        Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
        return true;
    }else {
        return false;
    }
}

export default CopyFiles;
