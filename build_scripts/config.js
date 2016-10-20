import fs from 'fs-extra';
import path from 'path';

let rootPath = path.resolve(__dirname, '..');

if(process.env.STATE === 'build') {
    rootPath = path.resolve(__dirname, '..', '..');
}

let conf = {
    debug: process.env.NODE_ENV === "production" ? false : true,
    paths: {
        pages: path.resolve(rootPath, '..', '..', 'wwwroot', 'protected', 'pages'),
        output: path.resolve(rootPath, '..', '..', 'wwwroot', 'protected', 'output'),
        build: path.resolve(rootPath, '..', '..', 'wwwroot', 'static', 'page'),
        libs: path.resolve(rootPath, '..', '..', 'wwwroot', 'static', 'libs'),
    },
    regExp: {
        widget: /{widget (.*?)}/gi,
    },
}

conf.paths.buildJs = path.resolve(conf.paths.build, 'js');
conf.paths.buildCss = path.resolve(conf.paths.build, 'css');
conf.paths.buildImg = path.resolve(conf.paths.build, 'img');

for (let name in conf.paths) {
    fs.ensureDirSync(conf.paths[name]);
}

export default conf;
