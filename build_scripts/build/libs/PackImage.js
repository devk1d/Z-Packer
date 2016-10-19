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

var miniFile = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filePath) {
        var fileRelative, fileContent, originalSize, optimizedData, optimizedSize, saved, percent, savedMsg, msg;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        fileRelative = _path2.default.relative(paths.output, filePath);
                        fileContent = _fsExtra2.default.readFileSync(filePath);
                        originalSize = fileContent.length;

                        // 如果大于 500kb 则提示

                        if (!(originalSize >= 1000 * 500)) {
                            _context.next = 8;
                            break;
                        }

                        _Helper2.default.error('    Warning: ' + fileRelative + ' \u56FE\u7247\u8FC7\u5927\uFF1A' + (0, _prettyBytes2.default)(originalSize) + '\uFF0C\u56FE\u7247\u4E0D\u5F97\u5927\u4E8E 500kb\uFF0C\u8BF7\u538B\u7F29\u56FE\u7247!\n');
                        return _context.abrupt('return', fileContent);

                    case 8:
                        if (_config2.default.debug) {
                            _context.next = 28;
                            break;
                        }

                        optimizedData = fileContent;
                        _context.prev = 10;
                        _context.next = 13;
                        return _imagemin2.default.buffer(fileContent, {
                            plugins: [(0, _imageminJpegtran2.default)(), (0, _imageminOptipng2.default)({ optimizationLevel: 2 }), (0, _imageminGifsicle2.default)()]
                        });

                    case 13:
                        optimizedData = _context.sent;
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](10);

                        console.log(_context.t0);

                    case 19:
                        optimizedSize = optimizedData.length;
                        saved = originalSize - optimizedSize;
                        percent = originalSize > 0 ? saved / originalSize * 100 : 0;
                        savedMsg = 'saved ' + (0, _prettyBytes2.default)(saved) + ' - ' + percent.toFixed(1).replace(/\.0$/, '') + '%';
                        msg = saved > 0 ? savedMsg : 'already optimized';

                        console.log('    imagemin: ' + _chalk2.default.green('✔ ') + fileRelative + ' ' + _chalk2.default.gray(msg));

                        return _context.abrupt('return', optimizedData);

                    case 28:
                        return _context.abrupt('return', fileContent);

                    case 29:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[10, 16]]);
    }));

    return function miniFile(_x) {
        return _ref.apply(this, arguments);
    };
}();

// 打包一个目录下的图片


var packImageByDir = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dirPath) {
        var namePrev, imgFiles, miniedFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath, miniedContent, imgNameReplaceObj, replaceFiles;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // 加入缓存判断，同一目录的避免重复打包替换
                        !global.TEMP_CACHE.packImg && (global.TEMP_CACHE.packImg = {});

                        if (!global.TEMP_CACHE.packImg[dirPath]) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 3:
                        global.TEMP_CACHE.packImg[dirPath] = 1;

                        namePrev = md5Slice(_path2.default.relative(paths.output, dirPath));


                        removeOldFile("img_" + namePrev);

                        imgFiles = _glob2.default.sync(_path2.default.join(dirPath, '*.+(jpeg|jpg|png|gif)'));

                        if (imgFiles.length) {
                            _context2.next = 9;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 9:
                        miniedFiles = {};

                        // 读取文件
                        // console.log(`    打包目录：${dirPath}`);

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 13;
                        _iterator = (0, _getIterator3.default)(imgFiles);

                    case 15:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 24;
                            break;
                        }

                        filePath = _step.value;
                        _context2.next = 19;
                        return miniFile(filePath);

                    case 19:
                        miniedContent = _context2.sent;

                        miniedFiles[filePath] = miniedContent;

                    case 21:
                        _iteratorNormalCompletion = true;
                        _context2.next = 15;
                        break;

                    case 24:
                        _context2.next = 30;
                        break;

                    case 26:
                        _context2.prev = 26;
                        _context2.t0 = _context2['catch'](13);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 30:
                        _context2.prev = 30;
                        _context2.prev = 31;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 33:
                        _context2.prev = 33;

                        if (!_didIteratorError) {
                            _context2.next = 36;
                            break;
                        }

                        throw _iteratorError;

                    case 36:
                        return _context2.finish(33);

                    case 37:
                        return _context2.finish(30);

                    case 38:
                        if (!_config2.default.debug) {
                            console.log("\n");
                        }

                        imgNameReplaceObj = {};
                        // 循环写入图片

                        imgFiles.forEach(function (filePath, index) {
                            var pathInfo = _path2.default.parse(filePath);
                            var fileContent = miniedFiles[filePath];
                            var destImgName = "img_" + namePrev + md5Slice(fileContent) + "_" + pathInfo.base;

                            _fsExtra2.default.writeFileSync(_path2.default.join(paths.buildImg, destImgName), fileContent);
                            imgNameReplaceObj[pathInfo.base] = destImgName;
                        });

                        // 替换图片路径
                        replaceFiles = _glob2.default.sync(_path2.default.join(dirPath, '*.+(php|js|*ss)'));

                        replaceImgPath(replaceFiles, imgNameReplaceObj);

                    case 43:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[13, 26, 30, 38], [31,, 33, 37]]);
    }));

    return function packImageByDir(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

// 删除原先的 文件


/*
 * 打包 图片
 */
var PackImage = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(dirPathArr) {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, dirPath;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context3.prev = 3;
                        _iterator2 = (0, _getIterator3.default)(dirPathArr);

                    case 5:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context3.next = 12;
                            break;
                        }

                        dirPath = _step2.value;
                        _context3.next = 9;
                        return packImageByDir(dirPath);

                    case 9:
                        _iteratorNormalCompletion2 = true;
                        _context3.next = 5;
                        break;

                    case 12:
                        _context3.next = 18;
                        break;

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3['catch'](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context3.t0;

                    case 18:
                        _context3.prev = 18;
                        _context3.prev = 19;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 21:
                        _context3.prev = 21;

                        if (!_didIteratorError2) {
                            _context3.next = 24;
                            break;
                        }

                        throw _iteratorError2;

                    case 24:
                        return _context3.finish(21);

                    case 25:
                        return _context3.finish(18);

                    case 26:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function PackImage(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _imagemin = require('imagemin');

var _imagemin2 = _interopRequireDefault(_imagemin);

var _prettyBytes = require('pretty-bytes');

var _prettyBytes2 = _interopRequireDefault(_prettyBytes);

var _imageminJpegtran = require('imagemin-jpegtran');

var _imageminJpegtran2 = _interopRequireDefault(_imageminJpegtran);

var _imageminOptipng = require('imagemin-optipng');

var _imageminOptipng2 = _interopRequireDefault(_imageminOptipng);

var _imageminGifsicle = require('imagemin-gifsicle');

var _imageminGifsicle2 = _interopRequireDefault(_imageminGifsicle);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _PackJSCSS = require('./PackJSCSS');

var _PackJSCSS2 = _interopRequireDefault(_PackJSCSS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;

function md5Slice(content) {
    return _Helper2.default.md5(content).slice(0, 5);
}

function removeOldFile(outputName) {
    var removeFiles = _glob2.default.sync(_path2.default.join(paths.buildImg, outputName + '*.*'));
    removeFiles.forEach(function (filePath) {
        _fsExtra2.default.removeSync(filePath);
    });
}

/*
 * 替换内容
 * imgNameReplaceObj: {"test.png": "img_348fsc_test.png"}
 */
function replaceImgPath(filePathArr, imgNameReplaceObj) {

    filePathArr.forEach(function (filePath) {
        var fileExt = _path2.default.parse(filePath).ext;
        var fileContent = _fsExtra2.default.readFileSync(filePath, { encoding: 'utf8' });

        for (var imgName in imgNameReplaceObj) {
            var replaceName = imgNameReplaceObj[imgName];
            var _reg = void 0;

            if (fileExt == '.js') {
                //ex: src='test.png'
                _reg = new RegExp('\'' + imgName + '\'', 'g');
                fileContent = fileContent.replace(_reg, 'window.STATIC_HOST+\'page/img/' + replaceName + '\'');
                //ex: src="test.png"
                _reg = new RegExp('"' + imgName + '"', 'g');
                fileContent = fileContent.replace(_reg, 'window.STATIC_HOST+"page/img/' + replaceName + '"');
                //ex: "url(test.png)"
                _reg = new RegExp('"url\\(' + imgName + '\\)"', 'g');
                fileContent = fileContent.replace(_reg, '"url("+window.STATIC_HOST+"page/img/' + replaceName + ')"');
                //ex: 'url(test.png)'
                _reg = new RegExp('\'url\\(' + imgName + '\\)\'', 'g');
                fileContent = fileContent.replace(_reg, '\'url(\'+window.STATIC_HOST+\'page/img/' + replaceName + ')\'');
            } else if (fileExt == '.php') {
                //ex: "background: url(test.png)";
                _reg = new RegExp('url\\(' + imgName + '\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url({=STATIC_HOST}page/img/' + replaceName + ')');
                //ex: img src='test.png'
                _reg = new RegExp('\'' + imgName + '\'', 'g');
                fileContent = fileContent.replace(_reg, '\'{=STATIC_HOST}page/img/' + replaceName + '\'');
                //ex: img src="test.png"
                _reg = new RegExp('"' + imgName + '"', 'g');
                fileContent = fileContent.replace(_reg, '"{=STATIC_HOST}page/img/' + replaceName + '"');
            } else if (fileExt == '.css' || fileExt == '.less') {
                //ex: background: url(test.png)
                _reg = new RegExp('url\\(' + imgName + '\\)', 'g');
                fileContent = fileContent.replace(_reg, 'url(/page/img/' + replaceName + ')');
            }
        }

        // 写入文件
        _fsExtra2.default.writeFileSync(filePath, fileContent);
    });
}exports.default = PackImage;