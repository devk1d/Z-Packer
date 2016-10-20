
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';
import config from '../config';
import CopyFiles from '../libs/CopyFiles';
import PackGlobal from '../libs/PackGlobal';
import PackLayouts from './PackLayouts';
import PackLibs from './PackLibs';
import PackSinglePage from './PackSinglePage';
import Helper from '../tools/Helper';

const paths = config.paths;

async function WatchFiles() {
    Helper.log('--- 开始监测文件变化 ---\n');

    let watchDir = [paths.libs, path.join(paths.pages, 'layouts')];

    // 要监测的项目，为空则全部监测
    let packProject = process.env.npm_config_pack_project;
    if(packProject) packProject = packProject.split(/\s+/);
    if(packProject && packProject.length) {
        packProject.forEach((projectName) => {
            watchDir.push(path.join(paths.pages, projectName));
        })
    }else {
        watchDir.push(paths.pages);
    }

    chokidar.watch(watchDir, { ignored: /[\/\\]\./, ignoreInitial: true }).on('all', async function(event, changeFilePath) {
        Helper.initVal();

        Helper.log(`--- 变化文件：${path.relative(paths.pages, changeFilePath)}, 类型：${event} ---\n`);

        const pathParse = path.parse(changeFilePath);

        // libs
        if(~changeFilePath.indexOf(paths.libs)) {
            // 打包 libs
            const libsAsset = await PackLibs();
            global.ASSETS.libs = libsAsset;

            // 遍历页面
            glob.sync(path.join(paths.output, '*', '*', '*.php')).forEach(filePath => {
                let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
                const mat = fileContent.match(/\$this->pageLibsStatic\((.+)\)/g);

                if(!mat) {
                    return ;
                }

                fileContent = fileContent
                .replace(/libs_([a-zA-Z0-9]+).js/, global.ASSETS.libs.js)
                .replace(/libs_([a-zA-Z0-9]+).css/, global.ASSETS.libs.css);

                fs.writeFileSync(filePath, fileContent);
            })
        }
        // layout
        else if(~changeFilePath.indexOf('layouts')) {
            const relativePath = path.relative(paths.pages, changeFilePath);

            // 移动文件至 output
            const isSuccess = CopyFiles(relativePath);

            if(isSuccess) {
                PackLayouts(path.join(paths.output, relativePath));
            }
        }
        else {
            const spDir = pathParse.dir.split('/').reverse();

            // global
            if(spDir[0] == 'global' || spDir[1] == 'global') {
                Helper.log('--- 打包 global ---\n');
                const globalPath = spDir[0] == 'global' ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(paths.pages, globalPath);
                const globalOutputPath = path.join(paths.output, relativePath);

                // 移动文件至 output
                CopyFiles(relativePath);

                // 打包 global
                const startTime = +new Date();
                const globalAsset = await PackGlobal(globalOutputPath);
                Helper.logCyan(`    - 打包页面 global\n`);
                Helper.log(`--- 耗时：${ Helper.caculateTime(startTime) } ---\n\n\n`);

                // 遍历项目的所有页面，替换 global js css
                glob.sync(path.join(globalOutputPath, '..', '*', '*.php')).forEach(filePath => {
                    let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
                    const mat = fileContent.match(/\$this->pageGlobalStatic\((.+)\)/g);

                    if(!mat) {
                        return ;
                    }

                    fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).js/, globalAsset.js);
                    fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).css/, globalAsset.css);
                    fs.writeFileSync(filePath, fileContent);
                })
            }
            // 单页面打包
            else {
                Helper.log('--- 打包页面 ---\n');
                // www/mobile/index.php or www/mobile/page/page.php
                const pagePath = path.relative(paths.pages, changeFilePath).split('/').length == 3 ? pathParse.dir : path.join(pathParse.dir, '..');
                const relativePath = path.relative(paths.pages, pagePath);
                const pageOutputPath = path.join(paths.output, relativePath);

                CopyFiles(relativePath);

                // 遍历项目的所有页面，重新打包 page js css
                const pageFiles = glob.sync(path.join(pageOutputPath, '*.php'));
                for (let filePath of pageFiles) {
                    await PackSinglePage(filePath);
                };
            }
        }

    });
}


export default WatchFiles;
