
import path from 'path';
import fs from 'fs-extra';
import config from '../config';
import ReplaceTemplate from '../libs/ReplaceTemplate';

/*
 * 打包 libs
 *
 */
async function PackLayouts(layoutPath) {
    const fileContent = fs.readFileSync(layoutPath, { encoding: 'utf8' });
    const newFileContent = ReplaceTemplate(fileContent);

    if(fileContent !== newFileContent) {
        fs.writeFileSync(layoutPath, newFileContent);
    }    
}

export default PackLayouts;
