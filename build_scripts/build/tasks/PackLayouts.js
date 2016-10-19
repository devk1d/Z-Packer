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
var PackLayouts = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(layoutPath) {
        var startTime, fileContent, newFileContent;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        startTime = +new Date();

                        _Helper2.default.log('--- \u4EFB\u52A1: \u6253\u5305layout ' + _path2.default.relative(_config2.default.paths.output, layoutPath) + ' ---\n');

                        fileContent = _fsExtra2.default.readFileSync(layoutPath, { encoding: 'utf8' });
                        newFileContent = (0, _ReplaceTemplate2.default)(fileContent);


                        if (fileContent !== newFileContent) {
                            _fsExtra2.default.writeFileSync(layoutPath, newFileContent);
                        }

                        _Helper2.default.log('--- \u8017\u65F6\uFF1A' + _Helper2.default.caculateTime(startTime) + ' ---\n\n\n');

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function PackLayouts(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Helper = require('../tools/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _ReplaceTemplate = require('../libs/ReplaceTemplate');

var _ReplaceTemplate2 = _interopRequireDefault(_ReplaceTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = PackLayouts;