import { log4jsConfig } from './../log4js-configurations/log4jsConfig';
import { RegistrationPage } from '../pages/registrationPageTest';

/**
 * tests the registration page of parabank website.
 */
describe('parabank website registration page automation', function () {
    /**
     * launch the application.
     */
    beforeAll(function () {
        RegistrationPage.launchApplication();
        log4jsConfig.log().debug('navigated to url');

    })
    /**
     * validates registration page title.
     */
    it('should validate registration page title', function () {
        RegistrationPage.validatePageTitle();
        log4jsConfig.log().debug('page title is validated');

    });
    /**
     * validates the registration link functionality.
     */
    it('validate registration link functionality', function () {
        RegistrationPage.navigateToRegistrationForm();
        log4jsConfig.log().debug('navigated to register form page');

    })

    /**
     * Tests the firstname and lastname text box functionality.
     */
    it('Validate  error message functionality of firstName and lastName', function () {
        RegistrationPage.sendAddress();
        RegistrationPage.sendCity();
        RegistrationPage.sendState();
        RegistrationPage.sendZipcode();
        RegistrationPage.sendPhoneNumber();
        RegistrationPage.sendSSN();
        RegistrationPage.sendPassword();
        RegistrationPage.sendUserName();
        RegistrationPage.sendConfirmPassword();
        RegistrationPage.sendPhoneNumber();
        RegistrationPage.clickOnRegisterButton();
        RegistrationPage.validateFirstNameErrorMessage();
        RegistrationPage.validateLastNameErrorMessage();
        log4jsConfig.log().debug('validated error functionality of firstname and last name');

    })

    /**
     * Tests the password functionality for for mismatched password with confirm password
     */
    it('varify password functionality for mismatched password with confirm password', function () {
        RegistrationPage.varifyPasswordFunctionality();
        log4jsConfig.log().debug('validated password functionality ');

    })
    /**
     * Varify first name text field functionality when firstname field is filled.
     */
    it('Varify error message functionality of first name when first name is filled', function () {
        RegistrationPage.varifyFirstNameErrorMessage();
        log4jsConfig.log().debug('validated error functionality with positive scenario');

    })

    /**
     * 
     */
    // it('varify the phone number field functionality when ph no. field the empty', function () {
    //     RegistrationPage.varifyPhNumberErrorMessage();
    //     log4jsConfig.log().debug('validated error functionality of phone number');

    // })

    /**
     * fill registration page and validation successfull registration page.
     */
    it('fill registration page and validation successfull registration page', function () {
        RegistrationPage.sendFirstName();
        RegistrationPage.sendLastName();
        RegistrationPage.sendAddress();
        RegistrationPage.sendCity();
        RegistrationPage.sendState();
        RegistrationPage.sendZipcode();
        RegistrationPage.sendPhoneNumber();
        RegistrationPage.sendSSN();
        RegistrationPage.sendPassword();
        RegistrationPage.sendUserName();
        RegistrationPage.sendConfirmPassword();
        RegistrationPage.sendPhoneNumber();
        RegistrationPage.clickOnRegisterButton();
        RegistrationPage.varifysuccessfulRegisterPage();
        log4jsConfig.log().debug('validated successful registration form');

    })
});

