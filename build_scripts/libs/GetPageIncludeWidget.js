import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import config from '../config';

const regExp = config.regExp;

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

// 获取包含的 widget
function getIncludeWidget(filePath) {
    const _fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    // console.log(_fileContent);
    const matches = _fileContent.match(regExp.widget) || [];
    // console.log(matches);

    let includeWidget = [];

    matches.forEach((mat) => {
        if(mat.search(/"global"|'global'/) > -1) {
            return ;
        }

        var name = mat.replace(regExp.widget, '$1');
        name = name.split(',')[0].replace(/\(|"|'|\)/g, "");

        includeWidget.push(name);
    })

    includeWidget.length && (includeWidget = includeWidget.filter((value, index, self) => {
        return self.indexOf(value) === index;
    }))

    return includeWidget;
}

// 分析页面目录所有 widget 的依赖关系
function mapWidget(pageDir) {
    const maps = {};
    const files = glob.sync([pageDir, '*', '*.php'].join('/'));

    files.forEach((filePath) => {
        const pathInfo = path.parse(filePath);
        maps[pathInfo.name] = getIncludeWidget(filePath);
    })

    return maps;
}

export default function getPageIncludeWidget(filePath) {
    const pageDir = path.dirname(filePath); // 页面目录
    const maps = mapWidget(pageDir);

    let widgets = getIncludeWidget(filePath);

    let newWidgets = {};
    function addMark(name) {
        if(maps[name]) {
            newWidgets[name] = 1;
            maps[name].forEach((subName) => { addMark(subName)  })
        }
    }

    widgets.forEach((name) => { addMark(name) });

    let widgetArr = [];
    for (var key in newWidgets) {
        widgetArr.push(key);
    }

    return widgetArr;
};
