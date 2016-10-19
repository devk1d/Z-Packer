
import path from 'path';
import fs from 'fs-extra';
import config from '../config';
import Helper from '../tools/Helper';
import ReplaceTemplate from '../libs/ReplaceTemplate';

/*
 * 打包 libs
 *
 */
async function PackLayouts(layoutPath) {
    const startTime = +new Date();
    Helper.log(`--- 任务: 打包layout ${path.relative(config.paths.output, layoutPath)} ---\n`);

    const fileContent = fs.readFileSync(layoutPath, { encoding: 'utf8' });
    const newFileContent = ReplaceTemplate(fileContent);

    if(fileContent !== newFileContent) {
        fs.writeFileSync(layoutPath, newFileContent);
    }

    Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);
}

export default PackLayouts;
