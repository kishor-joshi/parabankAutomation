"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  configurations for log4js.
 *  set log4js from node_modules.
 *  configure log4js.json file.
 */
class log4jsConfig {
    static log() {
        var log4js = require('log4js');
        log4js.configure('log4js-configurations/log4js.json');
        let log = log4js.getLogger("default");
        return log;
    }
}
exports.log4jsConfig = log4jsConfig;
