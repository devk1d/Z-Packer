'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;

/*
 * 拷贝目录方法
 * relativePath 相对 paths.pages 的目录位置
 */
function CopyFiles(relativePath) {
    // 删除相应的 output 目录
    var rmPath = _path2.default.join(paths.output, relativePath);

    if (_Helper2.default.dirExists(rmPath) || _Helper2.default.fileExists(rmPath)) {
        var startTime = +new Date();
        _Helper2.default.log('--- \u4EFB\u52A1: \u590D\u5236\u76EE\u5F55 ---\n');

        _Helper2.default.logCyan('    - \u5220\u9664\u76EE\u5F55/\u6587\u4EF6: ' + rmPath + '\n');
        _fsExtra2.default.removeSync(rmPath);

        var cpPath = _path2.default.join(paths.pages, relativePath);
        _Helper2.default.logCyan('    - \u590D\u5236\u76EE\u5F55/\u6587\u4EF6: ' + cpPath + '\n');
        _fsExtra2.default.copySync(cpPath, _path2.default.join(paths.output, relativePath));

        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');
        return true;
    } else {
        return false;
    }
}

exports.default = CopyFiles;