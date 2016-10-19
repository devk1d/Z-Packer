'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 打包 libs
 *
 */
function ConcatFiles(filePaths, splitStr) {
    splitStr = splitStr || "";
    return filePaths.reduce(function (prevValue, currentFilePath) {
        return prevValue + _fsExtra2.default.readFileSync(currentFilePath, { encoding: 'utf8' });
    }, "");
}

exports.default = ConcatFiles;