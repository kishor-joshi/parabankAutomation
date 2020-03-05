"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationHelper_1 = require("./../helper/validationHelper");
const protractor_1 = require("protractor");
const PropertiesReader_1 = require("../utils/PropertiesReader");
const log4jsConfig_1 = require("./../log4js-configurations/log4jsConfig");
const elementHelper_1 = require("../helper/elementHelper");
const excelReader_1 = require("../utils/excelReader");
var validationHelper = new validationHelper_1.ValidationHelper();
var excelReader = new excelReader_1.ExcelReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/loginDetails.xlsx');
var until = protractor_1.protractor.ExpectedConditions;
var testDataProperty = new PropertiesReader_1.PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/loginTestData.properties');
var loginLocator = new PropertiesReader_1.PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/locators/loginLocator.properties');
var elementHelper = new elementHelper_1.ElementHelper();
describe('login page validation', function () {
    beforeAll(function () {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.driver.manage().window().maximize();
        protractor_1.browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig_1.log4jsConfig.log().debug('navigated to url');
    });
    it('should show text at login page.', function () {
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
        //  elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')
        //   elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css'))
    });
    it('should show error message for empty login credential submission', function () {
        elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css');
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage) {
            validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforemptycredential'));
        });
    });
    it('should show error message for wrong login credential submission', function () {
        excelReader.readExcelData(2, 'username', 'loginDetails').then(function (excelData) {
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), excelData, 'css');
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), excelData, 'css');
            elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css');
        }).then(function () {
            elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage) {
                validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforwronginputdata'));
                console.log('running'); // browser.sleep(5000);
            });
        });
        // elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), 'ffgg', 'css')
        //  elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), 'ffgg', 'css')
    });
});
