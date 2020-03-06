import { LoginPage } from './../pages/loginPageTest';
import { log4jsConfig } from "../log4js-configurations/log4jsConfig";



/**
 * parabank login page validation
 */
describe('login page validation', function () {
    /**
     * launch the application
     */
    beforeAll(function () {

        LoginPage.launchApplication();
        log4jsConfig.log().debug('navigated to url');

    })
    /**
     * Tests the login page visible text.(UI testing)
     */
    it('Validate text at login page.', function () {
        LoginPage.validateLoginTextField();
        log4jsConfig.log().debug('validated login page visible text');


    })
    /**
     * Tests the error message when empty login credentials are submitted
     */
    it('Validate error message when empty login credentials are submitted', function () {
        LoginPage.validateErrorMessageForEmptyLoginCredentialSubmission();
        log4jsConfig.log().debug('validated error message when empty login credentials are submitted');


    })
    /**
     * Tests the error message for wrong login credential submission
     */

    it('Validate error message for wrong login credential submission', function () {

        LoginPage.validateErrorMessageForWrongLoginCredentialSubmisson();
        log4jsConfig.log().debug('validated error message when wrong login credentials are submitted');
    })
})