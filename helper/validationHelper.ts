import { log4jsConfig } from './../log4js-configurations/log4jsConfig';
export class ValidationHelper {

    validateText(actualText: string, expected: string) {
        expect(expected).toBe(actualText);
        log4jsConfig.log().debug('actual text matched with expected: ', actualText);

    }
    validateBoolean(isElementPresent: boolean, expectedElementPresence: boolean) {
        expect(expectedElementPresence).toBe(isElementPresent);
        log4jsConfig.log().debug('element present behaviour passed: ', expectedElementPresence);

    }
} 