'use strict';

var _packLibs = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var libsAsset;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // 打包 libs
                        startTime = +new Date();
                        _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u6253\u5305libs ---\n');

                        _context.next = 4;
                        return (0, _PackLibs2.default)();

                    case 4:
                        libsAsset = _context.sent;
                        // return {js: 'js file name', css: 'css file name'}
                        global.ASSETS.libs = libsAsset;

                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function _packLibs() {
        return _ref.apply(this, arguments);
    };
}();

var WatchFiles = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _Helper2.default.log('--- 开始监测文件变化 ---\n');
                        _chokidar2.default.watch([paths.pages, paths.libs], { ignored: /[\/\\]\./, ignoreInitial: true }).on('all', function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event, changeFilePath) {
                                var _this = this;

                                var pathParse, relativePath, isSuccess, spDir, pagePath, _relativePath, pageOutputPath, pageFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath;

                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                initVal();

                                                _Helper2.default.log('--- \u53D8\u5316\u6587\u4EF6\uFF1A' + _path2.default.relative(paths.pages, changeFilePath) + ', \u7C7B\u578B\uFF1A' + event + ' ---\n');

                                                pathParse = _path2.default.parse(changeFilePath);

                                                // libs

                                                if (!~changeFilePath.indexOf(paths.libs)) {
                                                    _context3.next = 9;
                                                    break;
                                                }

                                                _context3.next = 6;
                                                return _packLibs();

                                            case 6:

                                                // 遍历页面
                                                _glob2.default.sync(_path2.default.join(paths.output, '*', '*', '*.php')).forEach(function (filePath) {
                                                    var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });
                                                    var mat = fileContent.match(/\$this->pageLibsStatic\((.+)\)/g);

                                                    if (!mat) {
                                                        return;
                                                    }

                                                    fileContent = fileContent.replace(/libs_([a-zA-Z0-9]+).js/, global.ASSETS.libs.js).replace(/libs_([a-zA-Z0-9]+).css/, global.ASSETS.libs.css);

                                                    _fsExtra2.default.writeFileSync(filePath, fileContent);
                                                });
                                                _context3.next = 56;
                                                break;

                                            case 9:
                                                if (!~changeFilePath.indexOf('layouts')) {
                                                    _context3.next = 15;
                                                    break;
                                                }

                                                relativePath = _path2.default.relative(paths.pages, changeFilePath);

                                                // 移动文件至 output

                                                isSuccess = (0, _CopyFiles2.default)(relativePath);


                                                if (isSuccess) {
                                                    startTime = +new Date();
                                                    _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u6253\u5305layout ' + relativePath + ' ---\n');
                                                    (0, _PackLayouts2.default)(_path2.default.join(paths.output, relativePath));
                                                    _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');
                                                }
                                                _context3.next = 56;
                                                break;

                                            case 15:
                                                spDir = pathParse.dir.split('/').reverse();

                                                // global

                                                if (!(spDir[0] == 'global' || spDir[1] == 'global')) {
                                                    _context3.next = 20;
                                                    break;
                                                }

                                                return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                                    var globalPath, relativePath, globalOutputPath, globalAsset;
                                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                        while (1) {
                                                            switch (_context2.prev = _context2.next) {
                                                                case 0:
                                                                    _Helper2.default.log('--- 打包 global ---\n');
                                                                    globalPath = spDir[0] == 'global' ? pathParse.dir : _path2.default.join(pathParse.dir, '..');
                                                                    relativePath = _path2.default.relative(paths.pages, globalPath);
                                                                    globalOutputPath = _path2.default.join(paths.output, relativePath);

                                                                    // 移动文件至 output

                                                                    (0, _CopyFiles2.default)(relativePath);

                                                                    // 打包 global
                                                                    startTime = +new Date();
                                                                    _context2.next = 8;
                                                                    return (0, _PackGlobal2.default)(globalOutputPath);

                                                                case 8:
                                                                    globalAsset = _context2.sent;

                                                                    _Helper2.default.logCyan('    - \u6253\u5305\u9875\u9762 global\n');
                                                                    _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                                                                    // 遍历项目的所有页面，替换 global js css
                                                                    _glob2.default.sync(_path2.default.join(globalOutputPath, '..', '*', '*.php')).forEach(function (filePath) {
                                                                        var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });
                                                                        var mat = fileContent.match(/\$this->pageGlobalStatic\((.+)\)/g);

                                                                        if (!mat) {
                                                                            return;
                                                                        }

                                                                        fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).js/, globalAsset.js);
                                                                        fileContent = fileContent.replace(/global_([a-zA-Z0-9]+).css/, globalAsset.css);
                                                                        _fsExtra2.default.writeFileSync(filePath, fileContent);
                                                                    });

                                                                case 12:
                                                                case 'end':
                                                                    return _context2.stop();
                                                            }
                                                        }
                                                    }, _callee2, _this);
                                                })(), 't0', 18);

                                            case 18:
                                                _context3.next = 56;
                                                break;

                                            case 20:
                                                _Helper2.default.log('--- 打包页面 ---\n');
                                                // www/mobile/index.php or www/mobile/page/page.php
                                                pagePath = _path2.default.relative(paths.pages, changeFilePath).split('/').length == 3 ? pathParse.dir : _path2.default.join(pathParse.dir, '..');
                                                _relativePath = _path2.default.relative(paths.pages, pagePath);
                                                pageOutputPath = _path2.default.join(paths.output, _relativePath);


                                                (0, _CopyFiles2.default)(_relativePath);

                                                // 遍历项目的所有页面，替换 page js css
                                                pageFiles = _glob2.default.sync(_path2.default.join(pageOutputPath, '*.php'));
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context3.prev = 29;
                                                _iterator = pageFiles[Symbol.iterator]();

                                            case 31:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context3.next = 41;
                                                    break;
                                                }

                                                filePath = _step.value;


                                                startTime = +new Date();
                                                _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u6253\u5305\u9875\u9762 ' + _path2.default.relative(paths.output, filePath) + ' ---\n');
                                                _context3.next = 37;
                                                return (0, _PackSinglePage2.default)(filePath);

                                            case 37:
                                                _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                                            case 38:
                                                _iteratorNormalCompletion = true;
                                                _context3.next = 31;
                                                break;

                                            case 41:
                                                _context3.next = 47;
                                                break;

                                            case 43:
                                                _context3.prev = 43;
                                                _context3.t1 = _context3['catch'](29);
                                                _didIteratorError = true;
                                                _iteratorError = _context3.t1;

                                            case 47:
                                                _context3.prev = 47;
                                                _context3.prev = 48;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 50:
                                                _context3.prev = 50;

                                                if (!_didIteratorError) {
                                                    _context3.next = 53;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 53:
                                                return _context3.finish(50);

                                            case 54:
                                                return _context3.finish(47);

                                            case 55:
                                                ;

                                            case 56:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, this, [[29, 43, 47, 55], [48,, 50, 54]]);
                            }));

                            return function (_x, _x2) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function WatchFiles() {
        return _ref2.apply(this, arguments);
    };
}();

var packAll = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var layoutPathArr, pageFiles, n, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, filePath;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        initVal();

                        // 复制 pages 目录
                        startTime = +new Date();
                        _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u590D\u5236\u76EE\u5F55 ---\n');
                        (0, _CopyFiles2.default)('.');
                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                        // 打包 layout
                        layoutPathArr = _glob2.default.sync(_path2.default.join(paths.output, 'layouts', '*.php'));

                        layoutPathArr.forEach(function (layoutPath) {
                            startTime = +new Date();
                            _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u6253\u5305layout ' + _path2.default.relative(paths.output, layoutPath) + ' ---\n');
                            (0, _PackLayouts2.default)(layoutPath);
                            _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');
                        });

                        // 打包 libs
                        _context5.next = 9;
                        return _packLibs();

                    case 9:

                        // 遍历页面
                        pageFiles = _glob2.default.sync(_path2.default.join(paths.output, '*', '*', '*.php'));
                        n = 0;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context5.prev = 14;
                        _iterator2 = pageFiles[Symbol.iterator]();

                    case 16:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context5.next = 29;
                            break;
                        }

                        filePath = _step2.value;

                        n++;

                        if (!(n > 15)) {
                            _context5.next = 21;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 21:

                        startTime = +new Date();
                        _Helper2.default.log('--- \u4EFB\u52A1 ' + ++taskCount + ': \u6253\u5305\u9875\u9762 ' + _path2.default.relative(paths.output, filePath) + ' ---\n');
                        _context5.next = 25;
                        return (0, _PackSinglePage2.default)(filePath);

                    case 25:
                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                    case 26:
                        _iteratorNormalCompletion2 = true;
                        _context5.next = 16;
                        break;

                    case 29:
                        _context5.next = 35;
                        break;

                    case 31:
                        _context5.prev = 31;
                        _context5.t0 = _context5['catch'](14);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context5.t0;

                    case 35:
                        _context5.prev = 35;
                        _context5.prev = 36;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 38:
                        _context5.prev = 38;

                        if (!_didIteratorError2) {
                            _context5.next = 41;
                            break;
                        }

                        throw _iteratorError2;

                    case 41:
                        return _context5.finish(38);

                    case 42:
                        return _context5.finish(35);

                    case 43:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[14, 31, 35, 43], [36,, 38, 42]]);
    }));

    return function packAll() {
        return _ref4.apply(this, arguments);
    };
}();

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _CopyFiles = require('./libs/CopyFiles');

var _CopyFiles2 = _interopRequireDefault(_CopyFiles);

var _PackLayouts = require('./tasks/PackLayouts');

var _PackLayouts2 = _interopRequireDefault(_PackLayouts);

var _PackLibs = require('./tasks/PackLibs');

var _PackLibs2 = _interopRequireDefault(_PackLibs);

var _PackGlobal = require('./libs/PackGlobal');

var _PackGlobal2 = _interopRequireDefault(_PackGlobal);

var _PackSinglePage = require('./tasks/PackSinglePage');

var _PackSinglePage2 = _interopRequireDefault(_PackSinglePage);

var _Helper = require('./tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var paths = _config2.default.paths;

var startTime = +new Date();
var taskCount = 0;

function initVal() {
    global.ASSETS = {
        libs: {
            js: '',
            css: ''
        }
    };
    global.TEMP_CACHE = {};
}

(function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return packAll();

                    case 2:
                        _context6.next = 4;
                        return WatchFiles();

                    case 4:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    function run() {
        return _ref5.apply(this, arguments);
    }

    return run;
})()();
