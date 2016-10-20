import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
const babel = require('babel-core');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

// 拷贝项目文件
const dirFiles = glob.sync(path.join(rootDir, '*.js'));
const libsFiles = glob.sync(path.join(rootDir, 'libs', '*.js'));
const tasksFiles = glob.sync(path.join(rootDir, 'tasks', '*.js'));
const toolsFiles = glob.sync(path.join(rootDir, 'tools', '*.js'));

// 删除 build 里的文件
fs.removeSync(buildDir);
fs.ensureDirSync(buildDir);

dirFiles.concat(libsFiles).concat(tasksFiles).concat(toolsFiles).forEach(filePath => {
    if(~filePath.indexOf('Build.js')) return ;

    const buildPath = path.join(buildDir, path.relative(rootDir, filePath));
    const transCode = babel.transform(fs.readFileSync(filePath), { presets: ['latest'], plugins: ['transform-runtime'] }).code;

    fs.ensureDirSync(path.parse(buildPath).dir);
    fs.writeFileSync(buildPath, transCode);
})

console.log('构建成功\n');
