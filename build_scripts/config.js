
import path from 'path';


let conf = {
    paths: {
        pages: path.resolve(__dirname, '..', 'pages'),
        output: path.resolve(__dirname, '..', 'output'),
        static: path.resolve(__dirname, '..', 'static'),
    },
    regExp: {
        widget: /{widget (.*?)}/gi,
    }
}

export default conf;
