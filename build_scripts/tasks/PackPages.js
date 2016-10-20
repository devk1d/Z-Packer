
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

import Helper from '../tools/Helper';
import config from '../config';
import PackSinglePage from '../libs/PackSinglePage';

const paths = config.paths;

/*
 * 打包页面
 */
async function PackPages() {
    // 遍历页面, 要打包的项目，如果为空则遍历全部页面
    let packFiles = [];
    let packProject = process.env.npm_config_pack_project ? process.env.npm_config_pack_project.split(/\s+/) : [];
    if(packProject.length) {
        packProject.forEach(projectName => {
            if(projectName) {
                packFiles = packFiles.concat(glob.sync(path.join(paths.output, projectName, '*', '*.php')));
            }
        });
    }else {
        packFiles = glob.sync(path.join(paths.output, '*', '*', '*.php'));
    }

    let totalPage = packFiles.length;
    for (let filePath of packFiles) {
        await PackSinglePage(filePath);
        Helper.logBlue(`--- 剩余页面：${--totalPage} ---\n\n\n`);
    }
}

export default PackPages;
