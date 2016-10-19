'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/*
 * 打包 libs
 *
 */
var PackLibs = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var startTime, jsFiles, packedJsName, cssFiles, packedCssName;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        startTime = +new Date();

                        _Helper2.default.log('--- \u4EFB\u52A1: \u6253\u5305libs ---\n');

                        jsFiles = _glob2.default.sync(_path2.default.join(paths.libs, 'js', '*.js'));
                        _context.next = 5;
                        return (0, _PackJSCSS2.default)({
                            packFiles: jsFiles,
                            packType: 'js',
                            outputName: 'libs_'
                        });

                    case 5:
                        packedJsName = _context.sent;
                        cssFiles = _glob2.default.sync(_path2.default.join(paths.libs, 'css', '*.*ss'));
                        _context.next = 9;
                        return (0, _PackJSCSS2.default)({
                            packFiles: cssFiles,
                            packType: 'css',
                            outputName: 'libs_'
                        });

                    case 9:
                        packedCssName = _context.sent;


                        _Helper2.default.logCyan('    - \u6253\u5305 js/css \n');
                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                        return _context.abrupt('return', { js: packedJsName, css: packedCssName });

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function PackLibs() {
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

var _PackJSCSS = require('../libs/PackJSCSS');

var _PackJSCSS2 = _interopRequireDefault(_PackJSCSS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;exports.default = PackLibs;