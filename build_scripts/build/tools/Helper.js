'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
    md5: function md5(str) {
        return _cryptoJs2.default.MD5(str).toString();
    },
    log: function log(msg) {
        console.log(_chalk2.default.green(msg));
    },
    logCyan: function logCyan(msg) {
        console.log(_chalk2.default.cyan(msg));
    },
    error: function error(msg) {
        console.log(_chalk2.default.red(msg));
    },
    fileExists: function fileExists(filePath) {
        try {
            return _fsExtra2.default.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    },
    dirExists: function dirExists(filePath) {
        try {
            return _fsExtra2.default.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
    caculateTime: function caculateTime(startTime) {
        return ((+new Date() - startTime) / 1000).toFixed(2) + 's';
    },
    initVal: function initVal() {
        global.ASSETS = {
            libs: {
                js: '',
                css: ''
            }
        };
        global.TEMP_CACHE = {};
    }
};

exports.default = Helper;