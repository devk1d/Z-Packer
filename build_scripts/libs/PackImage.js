
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

import Helper from '../tools/Helper';
import config from '../config';
import PackJSCSS from './PackJSCSS';
import TransformPHP from './TransformPHP';

const paths = config.paths;
const outputPath = path.join(config.paths.build, 'img');

function md5Slice(content) {
    return Helper.md5(content).slice(0, 5);
}

// 打包一个目录下的图片
async function packImageByDir(dirPath) {
    !global.TEMP_CACHE.packImg && (global.TEMP_CACHE.packImg = {});
    if(global.TEMP_CACHE.packImg[dirPath]) {
        return ;
    }
    global.TEMP_CACHE.packImg[dirPath] = 1;

    const namePrev = md5Slice(path.relative(config.paths.output, dirPath));

    removeOldFile("img_" + namePrev);

    const imgFiles = glob.sync(path.join(dirPath, '*.+(jpeg|jpg|png|gif)'));

    if(!imgFiles.length) return ;

    console.log('first: ');
    console.log(imgFiles);

    let miniedFiles;
    try {
        const miniedFiles = await imagemin(imgFiles, '', {
            plugins: [
                imageminMozjpeg({quality: '65-80'}),
                imageminPngquant({quality: '65-80'})
            ]
        });
    }catch(e) {
        console.log(e);
    }

    console.log(miniedFiles);
    console.log('second: ');
    console.log(imgFiles);return ;

    let imgNameReplaceObj = {};
    imgFiles.forEach((filePath, index) => {

        const pathInfo = path.parse(filePath);
        const fileContent = miniedFiles[index].data;
        const destImgName = "img_" + namePrev + md5Slice(fileContent) + "_" + pathInfo.base;

        // 写入图片
        fs.writeFileSync(path.join(outputPath, destImgName), fileContent);

        imgNameReplaceObj[pathInfo.base] = destImgName;
    })

    // 替换图片路径
    let replaceFiles = glob.sync(path.join(dirPath, '*.+(php|js|*ss)'));
    replaceImgPath(replaceFiles, imgNameReplaceObj);
}

// 删除原先的 文件
function removeOldFile(outputName) {
    const removeFiles = glob.sync(path.join(outputPath, outputName + '*.*'));
    removeFiles.forEach((filePath) => {
        fs.removeSync(filePath);
    });
}

/*
 * 替换内容
 * imgNameReplaceObj: {"test.png": "img_348fsc_test.png"}
 */
function replaceImgPath(filePathArr, imgNameReplaceObj) {
    console.log(filePathArr);
    console.log(imgNameReplaceObj);

    filePathArr.forEach(filePath => {
        const fileExt = path.parse(filePath).ext;
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8'});

        for (let imgName in imgNameReplaceObj) {
            const replaceName = imgNameReplaceObj[imgName];

            if(fileExt == 'js') {
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
            } else if(fileExt == 'php') {
                //ex: "background: url(test.png)";
                _reg =  new RegExp('url\\('+ imgName +'\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url({=STATIC_HOST}page/img/' + replaceName + ')');
                //ex: img src='test.png'
                _reg =  new RegExp('\''+ imgName +'\'', 'g');
                fileContent = fileContent.replace(_reg, '\'{=STATIC_HOST}page/img/' + replaceName + '\'');
                //ex: img src="test.png"
                _reg =  new RegExp('"'+ imgName +'"', 'g');
                fileContent = fileContent.replace(_reg, '"{=STATIC_HOST}page/img/' + replaceName + '"');
            } else if(fileExt == 'css' || fileExt == 'less') {
                //ex: background: url(test.png)
                _reg =  new RegExp('url\\('+ imgName +'\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url(/page/img/' + replaceName + ')');
            }

            if (fileExt == 'php') {
                fileContent = TransformPHP(fileContent);
            }
        }


    })

}

/*
 * 打包 图片
 */
function PackImage(dirPathArr) {
    dirPathArr.forEach(function(dirPath) {
        if(~dirPath.indexOf('widget1')) {
            packImageByDir(dirPath);
        }
    })
}

export default PackImage;
