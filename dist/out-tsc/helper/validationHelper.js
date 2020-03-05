"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4jsConfig_1 = require("./../log4js-configurations/log4jsConfig");
class ValidationHelper {
    validateText(actualText, expected) {
        expect(expected).toBe(actualText);
        log4jsConfig_1.log4jsConfig.log().debug('actual text matched with expected: ', actualText);
    }
    validateBoolean(isElementPresent, expectedElementPresence) {
        expect(expectedElementPresence).toBe(isElementPresent);
        log4jsConfig_1.log4jsConfig.log().debug('element present behaviour passed: ', expectedElementPresence);
    }
}
exports.ValidationHelper = ValidationHelper;
