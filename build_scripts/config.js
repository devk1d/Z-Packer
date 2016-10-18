import fs from 'fs-extra';
import path from 'path';


let conf = {
    debug: true,
    paths: {
        pages: path.resolve(__dirname, '..', 'pages'),
        output: path.resolve(__dirname, '..', 'output'),
        build: path.resolve(__dirname, '..', 'static', 'page'),
        libs: path.resolve(__dirname, '..', 'static', 'libs'),
    },
    regExp: {
        widget: /{widget (.*?)}/gi,
    },
}

conf.paths.buildJs = path.resolve(conf.paths.build, 'js');
conf.paths.buildCss = path.resolve(conf.paths.build, 'css');
conf.paths.buildImg = path.resolve(conf.paths.build, 'img');

for (var name in conf.paths) {
    fs.ensureDirSync(conf.paths[name]);
}

export default conf;
