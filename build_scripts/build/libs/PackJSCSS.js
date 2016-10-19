'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var PackJSCSS = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts) {
        var packFiles, packType, outputName, destPath, packedCoded, removeFiles, destName;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // opts = {
                        //     packFiles: [],
                        //     packType: '', // js css
                        //     outputName: ''
                        // }

                        packFiles = opts.packFiles;
                        packType = opts.packType;
                        outputName = opts.outputName;
                        destPath = packType == 'js' ? _config2.default.paths.buildJs : _config2.default.paths.buildCss;
                        packedCoded = (0, _ConcatFiles2.default)(packFiles);

                        if (!(packType == 'css')) {
                            _context.next = 18;
                            break;
                        }

                        _context.prev = 6;
                        _context.next = 9;
                        return _less2.default.render(packedCoded);

                    case 9:
                        packedCoded = _context.sent.css;
                        _context.next = 15;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](6);

                        console.log(_context.t0);

                    case 15:

                        if (!_config2.default.debug) {
                            try {
                                packedCoded = new _cleanCss2.default().minify(packedCoded).styles;
                            } catch (err) {
                                console.log(err);
                            }
                        }
                        _context.next = 20;
                        break;

                    case 18:
                        try {
                            packedCoded = babel.transform(packedCoded, {
                                presets: ['latest'],
                                plugins: [/*'transform-runtime'*/],
                                compact: false
                            }).code;
                        } catch (err) {
                            console.log(err);
                        }

                        if (!_config2.default.debug) {
                            try {
                                packedCoded = _uglifyJs2.default.minify(packedCoded, { fromString: true }).code;
                            } catch (err) {
                                console.log(err);
                            }
                        }

                    case 20:

                        // 删除原先的 文件
                        removeFiles = _glob2.default.sync(_path2.default.join(destPath, outputName + '*.' + packType));

                        removeFiles.forEach(function (filePath) {
                            _fsExtra2.default.removeSync(filePath);
                        });

                        destName = outputName + _Helper2.default.md5(packedCoded).slice(0, 5) + '.' + packType;

                        _fsExtra2.default.writeFileSync(_path2.default.join(destPath, destName), packedCoded);

                        return _context.abrupt('return', destName);

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[6, 12]]);
    }));

    return function PackJSCSS(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _ConcatFiles = require('./ConcatFiles');

var _ConcatFiles2 = _interopRequireDefault(_ConcatFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require('babel-core');

exports.default = PackJSCSS;