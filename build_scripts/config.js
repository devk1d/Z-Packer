
import path from 'path';


let conf = {
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

export default conf;
