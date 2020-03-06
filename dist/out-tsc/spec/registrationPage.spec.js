"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4jsConfig_1 = require("./../log4js-configurations/log4jsConfig");
const registrationPageTest_1 = require("../pages/registrationPageTest");
/**
 * tests the registration page of parabank website.
 */
describe('parabank website registration page automation', function () {
    /**
     * launch the application.
     */
    beforeAll(function () {
        registrationPageTest_1.RegistrationPage.launchApplication();
        log4jsConfig_1.log4jsConfig.log().debug('navigated to url');
    });
    /**
     * validates registration page title.
     */
    it('should validate registration page title', function () {
        registrationPageTest_1.RegistrationPage.validatePageTitle();
        log4jsConfig_1.log4jsConfig.log().debug('page title is validated');
    });
    /**
     * validates the registration link functionality.
     */
    it('validate registration link functionality', function () {
        registrationPageTest_1.RegistrationPage.navigateToRegistrationForm();
        log4jsConfig_1.log4jsConfig.log().debug('navigated to register form page');
    });
    /**
     * Tests the firstname and lastname text box functionality.
     */
    it('Validate  error message functionality of firstName and lastName', function () {
        registrationPageTest_1.RegistrationPage.sendAddress();
        registrationPageTest_1.RegistrationPage.sendCity();
        registrationPageTest_1.RegistrationPage.sendState();
        registrationPageTest_1.RegistrationPage.sendZipcode();
        registrationPageTest_1.RegistrationPage.sendPhoneNumber();
        registrationPageTest_1.RegistrationPage.sendSSN();
        registrationPageTest_1.RegistrationPage.sendPassword();
        registrationPageTest_1.RegistrationPage.sendUserName();
        registrationPageTest_1.RegistrationPage.sendConfirmPassword();
        registrationPageTest_1.RegistrationPage.sendPhoneNumber();
        registrationPageTest_1.RegistrationPage.clickOnRegisterButton();
        registrationPageTest_1.RegistrationPage.validateFirstNameErrorMessage();
        registrationPageTest_1.RegistrationPage.validateLastNameErrorMessage();
        log4jsConfig_1.log4jsConfig.log().debug('validated error functionality of firstname and last name');
    });
    /**
     * Tests the password functionality for for mismatched password with confirm password
     */
    it('varify password functionality for mismatched password with confirm password', function () {
        registrationPageTest_1.RegistrationPage.varifyPasswordFunctionality();
        log4jsConfig_1.log4jsConfig.log().debug('validated password functionality ');
    });
    /**
     * Varify first name text field functionality when firstname field is filled.
     */
    it('Varify error message functionality of first name when first name is filled', function () {
        registrationPageTest_1.RegistrationPage.varifyFirstNameErrorMessage();
        log4jsConfig_1.log4jsConfig.log().debug('validated error functionality with positive scenario');
    });
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
        registrationPageTest_1.RegistrationPage.sendFirstName();
        registrationPageTest_1.RegistrationPage.sendLastName();
        registrationPageTest_1.RegistrationPage.sendAddress();
        registrationPageTest_1.RegistrationPage.sendCity();
        registrationPageTest_1.RegistrationPage.sendState();
        registrationPageTest_1.RegistrationPage.sendZipcode();
        registrationPageTest_1.RegistrationPage.sendPhoneNumber();
        registrationPageTest_1.RegistrationPage.sendSSN();
        registrationPageTest_1.RegistrationPage.sendPassword();
        registrationPageTest_1.RegistrationPage.sendUserName();
        registrationPageTest_1.RegistrationPage.sendConfirmPassword();
        registrationPageTest_1.RegistrationPage.sendPhoneNumber();
        registrationPageTest_1.RegistrationPage.clickOnRegisterButton();
        registrationPageTest_1.RegistrationPage.varifysuccessfulRegisterPage();
        log4jsConfig_1.log4jsConfig.log().debug('validated successful registration form');
    });
});
