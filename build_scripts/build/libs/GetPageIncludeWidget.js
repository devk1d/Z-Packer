'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPageIncludeWidget;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regExp = _config2.default.regExp;

function arrUnique(arr) {
    return arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}

// 获取包含的 widget
function getIncludeWidget(filePath) {
    if (!_Helper2.default.fileExists(filePath)) {
        return [];
    }

    !global.TEMP_CACHE.includeWidget && (global.TEMP_CACHE.includeWidget = {});

    if (global.TEMP_CACHE.includeWidget[filePath]) {
        return global.TEMP_CACHE.includeWidget[filePath];
    }

    var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });

    // 忽略掉注释
    fileContent = fileContent.replace(/<!--(.*?)-->/gi, '');

    var matches = fileContent.match(regExp.widget) || [];

    var includeWidget = [];

    matches.forEach(function (mat) {
        if (mat.search(/"global"|'global'/) > -1) {
            return;
        }

        var name = mat.replace(regExp.widget, '$1');
        name = name.split(',')[0].replace(/\(|"|'|\)/g, "");

        includeWidget.push(name);
    });

    includeWidget = arrUnique(includeWidget);

    global.TEMP_CACHE.includeWidget[filePath] = includeWidget;

    return includeWidget;
}

// 分析页面  widget 的依赖关系
var count = 99; // 避免循环依赖
function getWidget(filePath, isPage) {
    if (count < 0) return [];
    count--;

    var widgets = getIncludeWidget(filePath);
    var subWidget = [];

    widgets.forEach(function (widgetName) {
        var widgetFilePath = isPage ? _path2.default.join(_path2.default.parse(filePath).dir, widgetName, widgetName + '.php') : _path2.default.join(_path2.default.parse(filePath).dir, '..', widgetName, widgetName + '.php');
        subWidget = subWidget.concat(getWidget(widgetFilePath, false));
    });

    widgets = arrUnique(widgets.concat(subWidget));
    return widgets;
}

function getPageIncludeWidget(pagePath) {
    count = 99;

    var widgets = getWidget(pagePath, true);
    return widgets;
};