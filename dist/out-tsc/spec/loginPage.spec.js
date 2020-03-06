"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginPageTest_1 = require("./../pages/loginPageTest");
const log4jsConfig_1 = require("../log4js-configurations/log4jsConfig");
/**
 * parabank login page validation
 */
describe('login page validation', function () {
    /**
     * launch the application
     */
    beforeAll(function () {
        loginPageTest_1.LoginPage.launchApplication();
        log4jsConfig_1.log4jsConfig.log().debug('navigated to url');
    });
    /**
     * Tests the login page visible text.(UI testing)
     */
    it('Validate text at login page.', function () {
        loginPageTest_1.LoginPage.validateLoginTextField();
        log4jsConfig_1.log4jsConfig.log().debug('validated login page visible text');
    });
    /**
     * Tests the error message when empty login credentials are submitted
     */
    it('Validate error message when empty login credentials are submitted', function () {
        loginPageTest_1.LoginPage.validateErrorMessageForEmptyLoginCredentialSubmission();
        log4jsConfig_1.log4jsConfig.log().debug('validated error message when empty login credentials are submitted');
    });
    /**
     * Tests the error message for wrong login credential submission
     */
    it('Validate error message for wrong login credential submission', function () {
        loginPageTest_1.LoginPage.validateErrorMessageForWrongLoginCredentialSubmisson();
        log4jsConfig_1.log4jsConfig.log().debug('validated error message when wrong login credentials are submitted');
    });
});
