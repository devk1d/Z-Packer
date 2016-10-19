'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var processGlobal = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pagePath) {
        var globalPath, globalAsset;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        globalPath = _path2.default.resolve(pagePath, '..', '..', 'global');
                        globalAsset = void 0;

                        if (!_Helper2.default.fileExists(_path2.default.join(globalPath, '.asset'))) {
                            _context.next = 6;
                            break;
                        }

                        globalAsset = JSON.parse(_fsExtra2.default.readFileSync(_path2.default.join(globalPath, '.asset'), { encoding: 'utf8' }));
                        _context.next = 11;
                        break;

                    case 6:
                        startTime = +new Date();
                        _context.next = 9;
                        return (0, _PackGlobal2.default)(globalPath);

                    case 9:
                        globalAsset = _context.sent;

                        _Helper2.default.logCyan('    - \u6253\u5305\u9875\u9762 global\uFF0C\u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + '\n');

                    case 11:
                        return _context.abrupt('return', globalAsset);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function processGlobal(_x) {
        return _ref.apply(this, arguments);
    };
}();

/*
 * 打包 libs
 *
 */


var PackSinglePage = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(pagePath) {
        var _this = this;

        var allStartTime, pageWidget, pathParse, pageDir, pageName, widgetPathArr, pageFileContent;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        allStartTime = +new Date();

                        _Helper2.default.log('--- \u4EFB\u52A1: \u6253\u5305\u9875\u9762 ' + _path2.default.relative(_config2.default.paths.output, pagePath) + ' ---\n');

                        pageWidget = (0, _GetPageIncludeWidget2.default)(pagePath);
                        pathParse = _path2.default.parse(pagePath);
                        pageDir = pathParse.dir;
                        pageName = pathParse.name;
                        widgetPathArr = pageWidget.map(function (widgetName) {
                            return _path2.default.join(pageDir, widgetName);
                        });


                        _Helper2.default.logCyan('    - \u5305\u542Bwidget: ' + pageWidget.join(', ') + '\n');

                        // 打包 image
                        startTime = +new Date();
                        _context3.next = 11;
                        return (0, _PackImage2.default)([pageDir].concat(widgetPathArr));

                    case 11:
                        _Helper2.default.logCyan('    - \u6253\u5305\u56FE\u7247\uFF0C\u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + '\n');

                        pageFileContent = _fsExtra2.default.readFileSync(pagePath, { encoding: 'utf8' });

                        // 如果有 layout 则打包js css

                        if (!~pageFileContent.indexOf('setLayout')) {
                            _context3.next = 15;
                            break;
                        }

                        return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
                            var globalAsset, jsFiles, pageAsset, cssFiles, phpFiles;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:

                                            // 添加 libs js css
                                            pageFileContent += '\n{pageLibsStatic "' + global.ASSETS.libs.js + '", "' + global.ASSETS.libs.css + '"}\n';

                                            // 添加 global js css
                                            _context2.next = 3;
                                            return processGlobal(pagePath);

                                        case 3:
                                            globalAsset = _context2.sent;

                                            pageFileContent += '\n{pageGlobalStatic "' + globalAsset.js + '", "' + globalAsset.css + '"}\n';

                                            // 添加 page js css
                                            startTime = +new Date();
                                            jsFiles = [], pageAsset = { js: '', css: '' };

                                            widgetPathArr.forEach(function (widgetPath) {
                                                jsFiles = jsFiles.concat(_glob2.default.sync(_path2.default.join(widgetPath, '*.js')));
                                            });
                                            jsFiles = jsFiles.concat(_glob2.default.sync(_path2.default.join(pageDir, pageName + '.js')));

                                            if (!jsFiles.length) {
                                                _context2.next = 13;
                                                break;
                                            }

                                            _context2.next = 12;
                                            return (0, _PackJSCSS2.default)({
                                                packFiles: jsFiles,
                                                packType: 'js',
                                                outputName: 'page_' + _Helper2.default.md5(_path2.default.relative(_config2.default.paths.output, pagePath)).slice(0, 5)
                                            });

                                        case 12:
                                            pageAsset.js = _context2.sent;

                                        case 13:
                                            cssFiles = [];

                                            widgetPathArr.forEach(function (widgetPath) {
                                                cssFiles = cssFiles.concat(_glob2.default.sync(_path2.default.join(widgetPath, '*.*ss')));
                                            });
                                            cssFiles = cssFiles.concat(_glob2.default.sync(_path2.default.join(pageDir, pageName + '.*ss')));

                                            if (!cssFiles.length) {
                                                _context2.next = 20;
                                                break;
                                            }

                                            _context2.next = 19;
                                            return (0, _PackJSCSS2.default)({
                                                packFiles: cssFiles,
                                                packType: 'css',
                                                outputName: 'page_' + _Helper2.default.md5(_path2.default.relative(_config2.default.paths.output, pagePath)).slice(0, 5)
                                            });

                                        case 19:
                                            pageAsset.css = _context2.sent;

                                        case 20:

                                            pageFileContent += '\n{pagePageStatic "' + pageAsset.js + '", "' + pageAsset.css + '"}\n';

                                            //  php 模板替换
                                            phpFiles = [];

                                            widgetPathArr.forEach(function (widgetPath) {
                                                phpFiles = phpFiles.concat(_glob2.default.sync(_path2.default.join(widgetPath, '*.php')));
                                            });
                                            phpFiles.forEach(function (filePath) {
                                                var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });
                                                var newFileContent = (0, _ReplaceTemplate2.default)(fileContent);

                                                newFileContent !== fileContent && _fsExtra2.default.writeFileSync(filePath, newFileContent);
                                            });

                                        case 24:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this);
                        })(), 't0', 15);

                    case 15:

                        //  php 模板替换
                        _fsExtra2.default.writeFileSync(pagePath, (0, _ReplaceTemplate2.default)(pageFileContent));

                        _Helper2.default.logCyan('    - \u6253\u5305\u9875\u9762 js/css\uFF0C\u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + '\n');
                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(allStartTime) + ' ---\n\n\n');

                    case 18:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function PackSinglePage(_x2) {
        return _ref2.apply(this, arguments);
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

var _PackJSCSS = require('../libs/PackJSCSS');

var _PackJSCSS2 = _interopRequireDefault(_PackJSCSS);

var _PackGlobal = require('../libs/PackGlobal');

var _PackGlobal2 = _interopRequireDefault(_PackGlobal);

var _GetPageIncludeWidget = require('../libs/GetPageIncludeWidget');

var _GetPageIncludeWidget2 = _interopRequireDefault(_GetPageIncludeWidget);

var _PackImage = require('../libs/PackImage');

var _PackImage2 = _interopRequireDefault(_PackImage);

var _ReplaceTemplate = require('../libs/ReplaceTemplate');

var _ReplaceTemplate2 = _interopRequireDefault(_ReplaceTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startTime = void 0;

exports.default = PackSinglePage;