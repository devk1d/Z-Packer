
import path from 'path';
import Helper from '../tools/Helper';
import config from './config';

const paths = config.paths;

/*
 * 拷贝目录方法
 * relativePath 相对 paths.pages 的目录位置
 */
function CopyFiles(relativePath) {
    // 删除响应的 output 目录
    const rmPath = path.join(paths.output, relativePath);
    fs.removeSync(rmPath);
    Helper('删除目录: ' + rmPath);

    // 复制响应的 pages 目录
    fs.ensureDirSync(paths.output);
    fs.copySync(path.join(paths.pages, relativePath), path.join(paths.output, relativePath));
    Helper('复制目录: ' + relativePath);
}

export default CopyFiles;
