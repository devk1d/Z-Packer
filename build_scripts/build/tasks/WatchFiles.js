'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var WatchFiles = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var watchDir, packProject;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _Helper2.default.log('--- 开始监测文件变化 ---\n');

                        watchDir = [paths.libs, _path2.default.join(paths.pages, 'layouts')];

                        // 要监测的项目，为空则全部监测

                        packProject = process.env.npm_config_pack_project;

                        if (packProject) packProject = packProject.split(/\s+/);
                        if (packProject && packProject.length) {
                            packProject.forEach(function (projectName) {
                                watchDir.push(_path2.default.join(paths.pages, projectName));
                            });
                        } else {
                            watchDir.push(paths.pages);
                        }

                        _chokidar2.default.watch(watchDir, { ignored: /[\/\\]\./, ignoreInitial: true }).on('all', function () {
                            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(event, changeFilePath) {
                                var _this = this;

                                var pathParse, libsAsset, relativePath, isSuccess, spDir, pagePath, _relativePath, pageOutputPath, pageFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath;

                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _Helper2.default.initVal();

                                                _Helper2.default.log('--- \u53D8\u5316\u6587\u4EF6\uFF1A' + _path2.default.relative(paths.pages, changeFilePath) + ', \u7C7B\u578B\uFF1A' + event + ' ---\n');

                                                pathParse = _path2.default.parse(changeFilePath);

                                                // libs

                                                if (!~changeFilePath.indexOf(paths.libs)) {
                                                    _context2.next = 11;
                                                    break;
                                                }

                                                _context2.next = 6;
                                                return (0, _PackLibs2.default)();

                                            case 6:
                                                libsAsset = _context2.sent;

                                                global.ASSETS.libs = libsAsset;

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
                                                _context2.next = 55;
                                                break;

                                            case 11:
                                                if (!~changeFilePath.indexOf('layouts')) {
                                                    _context2.next = 17;
                                                    break;
                                                }

                                                relativePath = _path2.default.relative(paths.pages, changeFilePath);

                                                // 移动文件至 output

                                                isSuccess = (0, _CopyFiles2.default)(relativePath);


                                                if (isSuccess) {
                                                    (0, _PackLayouts2.default)(_path2.default.join(paths.output, relativePath));
                                                }
                                                _context2.next = 55;
                                                break;

                                            case 17:
                                                spDir = pathParse.dir.split('/').reverse();

                                                // global

                                                if (!(spDir[0] == 'global' || spDir[1] == 'global')) {
                                                    _context2.next = 22;
                                                    break;
                                                }

                                                return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                                                    var globalPath, relativePath, globalOutputPath, startTime, globalAsset;
                                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                                        while (1) {
                                                            switch (_context.prev = _context.next) {
                                                                case 0:
                                                                    _Helper2.default.log('--- 打包 global ---\n');
                                                                    globalPath = spDir[0] == 'global' ? pathParse.dir : _path2.default.join(pathParse.dir, '..');
                                                                    relativePath = _path2.default.relative(paths.pages, globalPath);
                                                                    globalOutputPath = _path2.default.join(paths.output, relativePath);

                                                                    // 移动文件至 output

                                                                    (0, _CopyFiles2.default)(relativePath);

                                                                    // 打包 global
                                                                    startTime = +new Date();
                                                                    _context.next = 8;
                                                                    return (0, _PackGlobal2.default)(globalOutputPath);

                                                                case 8:
                                                                    globalAsset = _context.sent;

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
                                                                    return _context.stop();
                                                            }
                                                        }
                                                    }, _callee, _this);
                                                })(), 't0', 20);

                                            case 20:
                                                _context2.next = 55;
                                                break;

                                            case 22:
                                                _Helper2.default.log('--- 打包页面 ---\n');
                                                // www/mobile/index.php or www/mobile/page/page.php
                                                pagePath = _path2.default.relative(paths.pages, changeFilePath).split('/').length == 3 ? pathParse.dir : _path2.default.join(pathParse.dir, '..');
                                                _relativePath = _path2.default.relative(paths.pages, pagePath);
                                                pageOutputPath = _path2.default.join(paths.output, _relativePath);


                                                (0, _CopyFiles2.default)(_relativePath);

                                                // 遍历项目的所有页面，重新打包 page js css
                                                pageFiles = _glob2.default.sync(_path2.default.join(pageOutputPath, '*.php'));
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context2.prev = 31;
                                                _iterator = (0, _getIterator3.default)(pageFiles);

                                            case 33:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context2.next = 40;
                                                    break;
                                                }

                                                filePath = _step.value;
                                                _context2.next = 37;
                                                return (0, _PackSinglePage2.default)(filePath);

                                            case 37:
                                                _iteratorNormalCompletion = true;
                                                _context2.next = 33;
                                                break;

                                            case 40:
                                                _context2.next = 46;
                                                break;

                                            case 42:
                                                _context2.prev = 42;
                                                _context2.t1 = _context2['catch'](31);
                                                _didIteratorError = true;
                                                _iteratorError = _context2.t1;

                                            case 46:
                                                _context2.prev = 46;
                                                _context2.prev = 47;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 49:
                                                _context2.prev = 49;

                                                if (!_didIteratorError) {
                                                    _context2.next = 52;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 52:
                                                return _context2.finish(49);

                                            case 53:
                                                return _context2.finish(46);

                                            case 54:
                                                ;

                                            case 55:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this, [[31, 42, 46, 54], [47,, 49, 53]]);
                            }));

                            return function (_x, _x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function WatchFiles() {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _CopyFiles = require('../libs/CopyFiles');

var _CopyFiles2 = _interopRequireDefault(_CopyFiles);

var _PackGlobal = require('../libs/PackGlobal');

var _PackGlobal2 = _interopRequireDefault(_PackGlobal);

var _PackLayouts = require('./PackLayouts');

var _PackLayouts2 = _interopRequireDefault(_PackLayouts);

var _PackLibs = require('./PackLibs');

var _PackLibs2 = _interopRequireDefault(_PackLibs);

var _PackSinglePage = require('./PackSinglePage');

var _PackSinglePage2 = _interopRequireDefault(_PackSinglePage);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;

exports.default = WatchFiles;