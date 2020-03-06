"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filePath_1 = require("./../utils/filePath");
const PropertiesReader_1 = require("../utils/PropertiesReader");
const log4jsConfig_1 = require("../log4js-configurations/log4jsConfig");
const elementHelper_1 = require("../helper/elementHelper");
const protractor_1 = require("protractor");
const validationHelper_1 = require("./../helper/validationHelper");
const excelReader_1 = require("../utils/excelReader");
var excelReader = new excelReader_1.ExcelReader(filePath_1.FilePath.loginExcelTestData);
var loginLocator = new PropertiesReader_1.PropertiesFileReader(filePath_1.FilePath.loginLocators);
var testDataProperty = new PropertiesReader_1.PropertiesFileReader(filePath_1.FilePath.loginTestDataPath);
var elementHelper = new elementHelper_1.ElementHelper();
var validationHelper = new validationHelper_1.ValidationHelper();
class LoginPage {
    static launchApplication() {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.driver.manage().window().maximize();
        protractor_1.browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig_1.log4jsConfig.log().debug('navigated to url');
    }
    static validateLoginTextField() {
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.customerlogin'), 'css')).then(function (custorloginText) {
            validationHelper.validateText(custorloginText, testDataProperty.readPropertiesFileData('customerloginText'));
        });
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.usernametext'), 'css')).then(function (usernameText) {
            validationHelper.validateText(usernameText, testDataProperty.readPropertiesFileData('usernametext'));
        });
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.passwordtext'), 'css')).then(function (passwordtext) {
            validationHelper.validateText(passwordtext, testDataProperty.readPropertiesFileData('passwordtext'));
        });
        elementHelper.isElementExist(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css').then(function (isbuttonExist) {
            validationHelper.validateBoolean(isbuttonExist, true);
        });
    }
    static validateErrorMessageForEmptyLoginCredentialSubmission() {
        elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css');
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage) {
            validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforemptycredential'));
        });
    }
    static validateErrorMessageForWrongLoginCredentialSubmisson() {
        excelReader.readExcelData(2, 'username', 'loginDetails').then(function (excelData) {
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), excelData, 'css');
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), excelData, 'css');
            elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css');
        }).then(function () {
            elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage) {
                validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforwronginputdata'));
            });
        });
    }
}
exports.LoginPage = LoginPage;
