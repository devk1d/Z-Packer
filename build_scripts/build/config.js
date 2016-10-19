'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = _path2.default.resolve(__dirname, '..');

if (process.env.STATE === 'build') {
    rootPath = _path2.default.resolve(__dirname, '..', '..');
}

var conf = {
    debug: process.env.NODE_ENV === "production" ? false : true,
    paths: {
        pages: _path2.default.resolve(rootPath, '..', '..', 'wwwroot', 'protected', 'pages'),
        output: _path2.default.resolve(rootPath, '..', '..', 'wwwroot', 'protected', 'output'),
        build: _path2.default.resolve(rootPath, '..', '..', 'wwwroot', 'static', 'page'),
        libs: _path2.default.resolve(rootPath, '..', '..', 'wwwroot', 'static', 'libs')
    },
    regExp: {
        widget: /{widget (.*?)}/gi
    }
};

conf.paths.buildJs = _path2.default.resolve(conf.paths.build, 'js');
conf.paths.buildCss = _path2.default.resolve(conf.paths.build, 'css');
conf.paths.buildImg = _path2.default.resolve(conf.paths.build, 'img');

for (var name in conf.paths) {
    _fsExtra2.default.ensureDirSync(conf.paths[name]);
}

exports.default = conf;