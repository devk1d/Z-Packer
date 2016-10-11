
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
    }
}

Helper.md5Name = (filePath, content) => {
    return Helper.md5(filePath).slice(0, 5) + Helper.md5(content).slice(0, 5)
}

export default Helper
