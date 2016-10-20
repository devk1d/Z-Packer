'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/*
 * 打包页面
 */
var PackPages = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var packFiles, packProject, totalPage, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // 遍历页面, 要打包的项目，如果为空则遍历全部页面
                        packFiles = [];
                        packProject = process.env.npm_config_pack_project ? process.env.npm_config_pack_project.split(/\s+/) : [];

                        if (packProject.length) {
                            packProject.forEach(function (projectName) {
                                if (projectName) {
                                    packFiles = packFiles.concat(_glob2.default.sync(_path2.default.join(paths.output, projectName, '*', '*.php')));
                                }
                            });
                        } else {
                            packFiles = _glob2.default.sync(_path2.default.join(paths.output, '*', '*', '*.php'));
                        }

                        totalPage = packFiles.length;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;
                        _iterator = (0, _getIterator3.default)(packFiles);

                    case 9:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 17;
                            break;
                        }

                        filePath = _step.value;
                        _context.next = 13;
                        return (0, _PackSinglePage2.default)(filePath);

                    case 13:
                        _Helper2.default.logBlue('--- \u5269\u4F59\u9875\u9762\uFF1A' + --totalPage + ' ---\n\n\n');

                    case 14:
                        _iteratorNormalCompletion = true;
                        _context.next = 9;
                        break;

                    case 17:
                        _context.next = 23;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t0 = _context['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 23:
                        _context.prev = 23;
                        _context.prev = 24;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 26:
                        _context.prev = 26;

                        if (!_didIteratorError) {
                            _context.next = 29;
                            break;
                        }

                        throw _iteratorError;

                    case 29:
                        return _context.finish(26);

                    case 30:
                        return _context.finish(23);

                    case 31:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 19, 23, 31], [24,, 26, 30]]);
    }));

    return function PackPages() {
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

var _PackSinglePage = require('../libs/PackSinglePage');

var _PackSinglePage2 = _interopRequireDefault(_PackSinglePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paths = _config2.default.paths;exports.default = PackPages;