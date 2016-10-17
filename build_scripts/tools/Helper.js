import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import CryptoJS from 'crypto-js';
import config from '../config';

let Helper = {
    md5: (str) => {
        return CryptoJS.MD5(str).toString()
    },
    log: (msg) => {
        console.log(chalk.green(msg));
    },
    logCyan: (msg) => {
        console.log(chalk.cyan(msg));
    },
    error: (msg) => {
        console.log(chalk.red(msg));
    },
    fileExists: (filePath) => {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    },
    dirExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
    caculateTime(startTime) {
        return ((+new Date() - startTime)/1000).toFixed(2) + 's';
    }
}

Helper.md5Name = (filePath, content) => {
    return Helper.md5(filePath).slice(0, 5) + Helper.md5(content).slice(0, 5)
}

export default Helper
