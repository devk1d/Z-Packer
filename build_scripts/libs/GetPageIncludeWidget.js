import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import config from '../config';

const regExp = config.regExp;

function arrUnique(arr) {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
}

// 获取包含的 widget
let INCLUDE_CACHE = {};
function getIncludeWidget(filePath) {
    if(INCLUDE_CACHE[filePath]) {
        return INCLUDE_CACHE[filePath];
    }

    const _fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const matches = _fileContent.match(regExp.widget) || [];

    let includeWidget = [];

    matches.forEach((mat) => {
        if(mat.search(/"global"|'global'/) > -1) {
            return ;
        }

        var name = mat.replace(regExp.widget, '$1');
        name = name.split(',')[0].replace(/\(|"|'|\)/g, "");

        includeWidget.push(name);
    })

    includeWidget = arrUnique(includeWidget)

    INCLUDE_CACHE[filePath] = includeWidget;

    return includeWidget;
}

// 分析页面  widget 的依赖关系
let count = 99; // 避免循环依赖
function getWidget(filePath, isPage) {
    if(count < 0) return [];
    count--;

    let widgets = getIncludeWidget(filePath);
    let subWidget = [];

    widgets.forEach((widgetName) => {
        const widgetFilePath = isPage ? path.join(path.parse(filePath).dir, widgetName, widgetName + '.php') : path.join(path.parse(filePath).dir, '..', widgetName, widgetName + '.php');
        subWidget = subWidget.concat(getWidget(widgetFilePath, false));
    })

    widgets = arrUnique(widgets.concat(subWidget));
    return widgets;
}

export default function getPageIncludeWidget(pagePath) {
    count = 99;

    const widgets = getWidget(pagePath, true);
    return widgets;
};
