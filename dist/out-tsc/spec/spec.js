"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registrationPageTest_1 = require("./../pages/registrationPageTest");
const log4jsConfig_1 = require("./../log4js-configurations/log4jsConfig");
const protractor_1 = require("protractor");
const PropertiesReader_1 = require("../utils/PropertiesReader");
const elementHelper_1 = require("../helper/elementHelper");
const excelReader_1 = require("../utils/excelReader");
const validationHelper_1 = require("../helper/validationHelper");
var validationHelper = new validationHelper_1.ValidationHelper();
var locatorProperty = new PropertiesReader_1.PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/locators/register.properties');
var excelReader = new excelReader_1.ExcelReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/testData.xlsx');
var elementHelper = new elementHelper_1.ElementHelper();
var testDataProperty = new PropertiesReader_1.PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/parabankTestData.properties');
var userDataRowNumber = 2; //Number(testDataProperty.readPropertiesFileData('userDataRowNumber'));
var until = protractor_1.protractor.ExpectedConditions;
describe('parabank website automation', function () {
    beforeAll(function () {
        // browser.waitForAngularEnabled(false);
        // browser.driver.manage().window().maximize();
        // browser.get(testDataProperty.readPropertiesFileData('base_url'));
        // log4jsConfig.log().debug('navigated to url');
        registrationPageTest_1.RegistrationPage.launchApplication();
    });
    it('should validate title', function () {
        expect(protractor_1.browser.getCurrentUrl()).toBe(testDataProperty.readPropertiesFileData('base_url'));
        expect(protractor_1.browser.getTitle()).toBe(testDataProperty.readPropertiesFileData('hometitle'));
    });
    it('should click on registration link', function () {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.registerLink'), 'css');
    });
    it('should show error message at firstName and last for empty registration form submisson', function () {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        var firstNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.firstNameErrorText'), 'id');
        elementHelper.getTextData(firstNameErrorElement).then(function (firstNameErrorMessage) {
            validationHelper.validateText(firstNameErrorMessage, testDataProperty.readPropertiesFileData('firatNameErrorMessage'));
        });
        var lastNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.lastNameErrorText'), 'id');
        elementHelper.getTextData(lastNameErrorElement).then(function (lastNameErrorMessage) {
            validationHelper.validateText(lastNameErrorMessage, testDataProperty.readPropertiesFileData('lastNameErrorMessage'));
        });
    });
    it('should show error message for not matched confirm password', function () {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.password'), testDataProperty.readPropertiesFileData('password'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.confirm'), testDataProperty.readPropertiesFileData('wrongPassword'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        var repeatedPasswordErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.css.repeatedPasswordError'), 'css');
        elementHelper.getTextData(repeatedPasswordErrorElement).then(function (repeatedPasswordError) {
            validationHelper.validateText(repeatedPasswordError, testDataProperty.readPropertiesFileData('repeatedPasswordError'));
        });
    });
    it('should not show error message for entered first name field', function () {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.firstName'), testDataProperty.readPropertiesFileData('firstName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.lastName'), testDataProperty.readPropertiesFileData('lastName'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.firstNameErrorText'), 'css').then(function (isExist) {
            console.log(isExist);
            validationHelper.validateBoolean(isExist, false);
        });
    });
    it('should show error message for empty phone number field', function () {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.phoneNumberErrorMessage'), 'css').then(function (isExist) {
            console.log(isExist);
            validationHelper.validateBoolean(isExist, true);
        });
    });
    it('fill registration page and validation successfull registration page', function () {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.firstName'), testDataProperty.readPropertiesFileData('firstName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.lastName'), testDataProperty.readPropertiesFileData('lastName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.address'), testDataProperty.readPropertiesFileData('address'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.city'), testDataProperty.readPropertiesFileData('city'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.state'), testDataProperty.readPropertiesFileData('state'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.zipCode'), testDataProperty.readPropertiesFileData('zipcode'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.phoneNumber'), testDataProperty.readPropertiesFileData('phonenumber'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.ssn'), testDataProperty.readPropertiesFileData('ssn'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.userName'), testDataProperty.readPropertiesFileData('userName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.password'), testDataProperty.readPropertiesFileData('password'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.confirm'), testDataProperty.readPropertiesFileData('confirmPassword'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        //  browser.sleep(5000);
        var textElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.xpath.wellcomemessage'), 'xpath');
        protractor_1.browser.wait(until.presenceOf(textElement), 7000, 'Element taking too long to appear in the DOM').then(function () {
            elementHelper.getTextData(textElement).then(function (wellmessageText) {
                validationHelper.validateText(wellmessageText, testDataProperty.readPropertiesFileData('wellcomeMessage'));
            });
            log4jsConfig_1.log4jsConfig.log().debug('navigated registered user page');
            protractor_1.browser.sleep(5000);
        });
    });
});
