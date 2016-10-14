
import fs from 'fs-extra';

/*
 * 打包 libs
 *
 */
function ConcatFiles(filePaths, splitStr) {
    splitStr = splitStr || "";
    return filePaths.reduce((prevValue, currentFilePath) => {
        return prevValue + fs.readFileSync(currentFilePath, { encoding: 'utf8' });
    }, "");
}

export default ConcatFiles;
