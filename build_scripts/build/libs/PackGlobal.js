'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/*
 * 打包 libs
 *
 */
var PackGlobal = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(globalPath) {
        var namePrev, globalWidgetPhpFiles, asset, jsFiles, cssFiles;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        namePrev = 'global_' + _Helper2.default.md5(_path2.default.relative(_config2.default.paths.output, globalPath)).slice(0, 5);
                        globalWidgetPhpFiles = _glob2.default.sync(_path2.default.join(globalPath, '*', '*.php'));
                        asset = { js: '', css: '' };

                        if (_Helper2.default.dirExists(globalPath)) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', asset);

                    case 5:

                        // 删除原先文件
                        _glob2.default.sync(_path2.default.join(_config2.default.paths.build, 'js', namePrev + '*.js')).concat(_glob2.default.sync(_path2.default.join(_config2.default.paths.build, 'css', namePrev + '*.css'))).forEach(function (filePath) {
                            return _fsExtra2.default.removeSync(filePath);
                        });

                        // 先打包图片
                        _context.next = 8;
                        return (0, _PackImage2.default)(globalWidgetPhpFiles.map(function (widgetPath) {
                            return _path2.default.parse(widgetPath).dir;
                        }));

                    case 8:

                        // 打包 js 和 css
                        jsFiles = _glob2.default.sync(_path2.default.join(globalPath, '**', '*.js'));
                        _context.next = 11;
                        return (0, _PackJSCSS2.default)({
                            packFiles: jsFiles,
                            packType: 'js',
                            outputName: namePrev
                        });

                    case 11:
                        asset.js = _context.sent;
                        cssFiles = _glob2.default.sync(_path2.default.join(globalPath, '**', '*.*ss'));
                        _context.next = 15;
                        return (0, _PackJSCSS2.default)({
                            packFiles: cssFiles,
                            packType: 'css',
                            outputName: namePrev
                        });

                    case 15:
                        asset.css = _context.sent;


                        // php替换
                        globalWidgetPhpFiles.forEach(function (filePath) {
                            var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });
                            var newFileContent = (0, _ReplaceTemplate2.default)(fileContent);

                            if (fileContent !== newFileContent) {
                                _fsExtra2.default.writeFileSync(filePath, newFileContent);
                            }
                        });

                        // 写入 asset
                        _fsExtra2.default.writeFileSync(_path2.default.join(globalPath, '.asset'), (0, _stringify2.default)(asset, null, 2));

                        return _context.abrupt('return', asset);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function PackGlobal(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _PackImage = require('./PackImage');

var _PackImage2 = _interopRequireDefault(_PackImage);

var _PackJSCSS = require('./PackJSCSS');

var _PackJSCSS2 = _interopRequireDefault(_PackJSCSS);

var _ReplaceTemplate = require('./ReplaceTemplate');

var _ReplaceTemplate2 = _interopRequireDefault(_ReplaceTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = PackGlobal;