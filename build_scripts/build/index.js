'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var packAll = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var layoutPathArr, libsAsset, pageFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _Helper2.default.initVal();

                        // 复制 pages 目录
                        (0, _CopyFiles2.default)('.');

                        // 打包 layout
                        layoutPathArr = _glob2.default.sync(_path2.default.join(paths.output, 'layouts', '*.php'));

                        layoutPathArr.forEach(function (layoutPath) {
                            (0, _PackLayouts2.default)(layoutPath);
                        });

                        // 打包 libs
                        _context.next = 6;
                        return (0, _PackLibs2.default)();

                    case 6:
                        libsAsset = _context.sent;
                        // return {js: 'js file name', css: 'css file name'}
                        global.ASSETS.libs = libsAsset;

                        // 遍历页面
                        pageFiles = _glob2.default.sync(_path2.default.join(paths.output, '*', '*', '*.php'));
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 12;
                        _iterator = (0, _getIterator3.default)(pageFiles);

                    case 14:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 21;
                            break;
                        }

                        filePath = _step.value;
                        _context.next = 18;
                        return (0, _PackSinglePage2.default)(filePath);

                    case 18:
                        _iteratorNormalCompletion = true;
                        _context.next = 14;
                        break;

                    case 21:
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context['catch'](12);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 27:
                        _context.prev = 27;
                        _context.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context.prev = 30;

                        if (!_didIteratorError) {
                            _context.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context.finish(30);

                    case 34:
                        return _context.finish(27);

                    case 35:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[12, 23, 27, 35], [28,, 30, 34]]);
    }));

    return function packAll() {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

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

var _WatchFiles = require('./tasks/WatchFiles');

var _WatchFiles2 = _interopRequireDefault(_WatchFiles);

var _Helper = require('./tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;

(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return packAll();

                    case 2:
                        _context2.next = 4;
                        return (0, _WatchFiles2.default)();

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    function run() {
        return _ref2.apply(this, arguments);
    }

    return run;
})()();