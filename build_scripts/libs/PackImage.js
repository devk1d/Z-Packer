
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chalk from 'chalk';
import imagemin from 'imagemin';
import prettyBytes from 'pretty-bytes';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminGifsicle from 'imagemin-gifsicle';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from './PackJSCSS';

const paths = config.paths;

function md5Slice(content) {
    return Helper.md5(content).slice(0, 5);
}

async function miniFile(filePath) {
    const fileRelative = path.relative(paths.output, filePath);
    const fileContent = fs.readFileSync(filePath);
    const originalSize = fileContent.length;

    // 如果大于 500kb 则提示
    if(originalSize >= 1000 * 500) {
        Helper.error(`    Warning: ${fileRelative} 图片过大：${prettyBytes(originalSize)}，图片不得大于 500kb，请压缩图片!\n`);
        return fileContent;
    }else {
        if(!config.debug) {
            let optimizedData = fileContent;

            try {
                optimizedData = await imagemin.buffer(fileContent, {
                    plugins: [
                        imageminJpegtran(),
                        imageminOptipng({ optimizationLevel: 2 }),
                        imageminGifsicle()
                    ]
                });
            } catch (e) {
                console.log(e);
            }

            const optimizedSize = optimizedData.length;
            const saved = originalSize - optimizedSize;
            const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;
            const savedMsg = `saved ${prettyBytes(saved)} - ${percent.toFixed(1).replace(/\.0$/, '')}%`;
            const msg = saved > 0 ? savedMsg : 'already optimized';
            console.log(`    imagemin: ${chalk.green('✔ ')}${fileRelative} ${chalk.gray(msg)}`);

            return optimizedData;
        }
    }
}

// 打包一个目录下的图片
async function packImageByDir(dirPath) {
    // 加入缓存判断，同一目录的避免重复打包替换
    !global.TEMP_CACHE.packImg && (global.TEMP_CACHE.packImg = {});
    if(global.TEMP_CACHE.packImg[dirPath]) {
        return ;
    }
    global.TEMP_CACHE.packImg[dirPath] = 1;

    const namePrev = md5Slice(path.relative(paths.output, dirPath));

    removeOldFile("img_" + namePrev);

    const imgFiles = glob.sync(path.join(dirPath, '*.+(jpeg|jpg|png|gif)'));

    if(!imgFiles.length) return ;

    let miniedFiles = {};

    // 读取文件
    // console.log(`    打包目录：${dirPath}`);
    for (let filePath of imgFiles) {
        const miniedContent = await miniFile(filePath);
        miniedFiles[filePath] = miniedContent;
    }

    let imgNameReplaceObj = {};
    // 循环写入图片
    imgFiles.forEach((filePath, index) => {
        const pathInfo = path.parse(filePath);
        const fileContent = miniedFiles[filePath];
        const destImgName = "img_" + namePrev + md5Slice(fileContent) + "_" + pathInfo.base;

        fs.writeFileSync(path.join(paths.buildImg, destImgName), fileContent);
        imgNameReplaceObj[pathInfo.base] = destImgName;
    })

    // 替换图片路径
    let replaceFiles = glob.sync(path.join(dirPath, '*.+(php|js|*ss)'));
    replaceImgPath(replaceFiles, imgNameReplaceObj);
}

// 删除原先的 文件
function removeOldFile(outputName) {
    const removeFiles = glob.sync(path.join(paths.buildImg, outputName + '*.*'));
    removeFiles.forEach((filePath) => {
        fs.removeSync(filePath);
    });
}

/*
 * 替换内容
 * imgNameReplaceObj: {"test.png": "img_348fsc_test.png"}
 */
function replaceImgPath(filePathArr, imgNameReplaceObj) {

    filePathArr.forEach(filePath => {
        const fileExt = path.parse(filePath).ext;
        let fileContent = fs.readFileSync(filePath, { encoding: 'utf8'});

        for (let imgName in imgNameReplaceObj) {
            const replaceName = imgNameReplaceObj[imgName];
            let _reg;

            if(fileExt == '.js') {
                //ex: src='test.png'
                _reg =  new RegExp('\''+ imgName +'\'', 'g');
                fileContent = fileContent.replace(_reg, 'window.STATIC_HOST+\'page/img/' + replaceName + '\'');
                //ex: src="test.png"
                _reg =  new RegExp('"'+ imgName +'"', 'g');
                fileContent = fileContent.replace(_reg, 'window.STATIC_HOST+"page/img/' + replaceName + '"');
                //ex: "url(test.png)"
                _reg =  new RegExp('"url\\('+ imgName +'\\)"', 'g');
                fileContent = fileContent.replace(_reg, '"url("+window.STATIC_HOST+"page/img/' + replaceName + ')"');
                //ex: 'url(test.png)'
                _reg =  new RegExp('\'url\\('+ imgName +'\\)\'', 'g');
                fileContent = fileContent.replace(_reg, '\'url(\'+window.STATIC_HOST+\'page/img/' + replaceName + ')\'');
            } else if(fileExt == '.php') {
                //ex: "background: url(test.png)";
                _reg =  new RegExp('url\\('+ imgName +'\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url({=STATIC_HOST}page/img/' + replaceName + ')');
                //ex: img src='test.png'
                _reg =  new RegExp('\''+ imgName +'\'', 'g');
                fileContent = fileContent.replace(_reg, '\'{=STATIC_HOST}page/img/' + replaceName + '\'');
                //ex: img src="test.png"
                _reg =  new RegExp('"'+ imgName +'"', 'g');
                fileContent = fileContent.replace(_reg, '"{=STATIC_HOST}page/img/' + replaceName + '"');
            } else if(fileExt == '.css' || fileExt == '.less') {
                //ex: background: url(test.png)
                _reg =  new RegExp('url\\('+ imgName +'\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url(/page/img/' + replaceName + ')');
            }
        }

        // 写入文件
        fs.writeFileSync(filePath, fileContent);
    })
}

/*
 * 打包 图片
 */
async function PackImage(dirPathArr) {
    for (let dirPath of dirPathArr) {
        await packImageByDir(dirPath);
    }
}

export default PackImage;
