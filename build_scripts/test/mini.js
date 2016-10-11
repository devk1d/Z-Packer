var UglifyJS = require('uglify-js');

var result = UglifyJS.minify([ '/Users/wei/Documents/dev/node/Z-Project/output/www/index/widget1/widget1_extend.js',
  '/Users/wei/Documents/dev/node/Z-Project/output/www/index/widget1/widget1.js',
  '/Users/wei/Documents/dev/node/Z-Project/output/www/index/widget2/widget2.js',
  '/Users/wei/Documents/dev/node/Z-Project/output/www/index/widget3/widget3.js' ]);
console.log(result.code);
