import path from 'path';
import glob from 'glob';
import Helper from '../tools/Helper';
import config from '../config';

import GetPageIncludeWidget from './GetPageIncludeWidget';
import Pack_JS_CSS from './Pack_JS_CSS';

function pack(pagePath) {
    const widgetName = GetPageIncludeWidget(pagePath);

    const packedJsName = Pack_JS_CSS({
        packFiles: (() => {
            let packFiles = [];
            widgetName.forEach((name) => {
                packFiles = packFiles.concat( glob.sync(path.join(path.dirname(pagePath), name, '*.js')) );
            })
            return packFiles;
        })(),
        packType: 'js',
        outputName: 'page_' + Helper.md5(path.relative(config.paths.output, pagePath)).slice(0, 5),
    });

    console.log(packedJsName);

    const packedCssName = Pack_JS_CSS({
        packFiles: (() => {
            let packFiles = [];
            widgetName.forEach((name) => {
                packFiles = packFiles.concat( glob.sync(path.join(path.dirname(pagePath), name, '*.less')) );
            })
            return packFiles;
        })(),
        packType: 'css',
        outputName: 'page_' + Helper.md5(path.relative(config.paths.output, pagePath)).slice(0, 5)
    });

    console.log(packedCssName);
}


export default pack;
