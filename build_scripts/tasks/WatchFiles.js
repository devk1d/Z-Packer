import path from 'path';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import config from '../config';

function WatchFiles() {

    chokidar.watch([config.paths.pages, config.paths.libs], {ignored: /[\/\\]\./}).on('all', async function(event, changeFilePath) {
        const pathParse = path.parse(changeFilePath);

        // libs
        if(~changeFilePath.indexOf(config.paths.libs)) {
            await _packLibs();

            // 遍历页面
            glob.sync(path.join(config.paths.output, '*', '*', '*.php')).forEach(filePath => {
                let fileContent = fs.readFileSync(filePath);
                const mat = fileContent.match(/\$this->pageLibsStatic\((.+)\)/g);

                if(!mat) {
                    return ;
                }

                fileContent = fileContent.replace(/libs_(.+).js/, global.ASSETS.libs.js);
                fileContent = fileContent.replace(/libs_(.+).css/, global.ASSETS.libs.css);
                fs.writeFileSync(filePath, fileContent);
            })
        }else {
            const spDir = pathParse.dir.split('/').reverse();

            // global
            if(spDir[0] == 'global' || spDir[1] == 'global') {
                CopyFiles(path.relative(config.paths.pages, filePath));

                
            }
        }
    });

}

export default WatchFiles;
