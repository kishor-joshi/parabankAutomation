import { RegistrationPage } from './../pages/registrationPageTest';
import { log4jsConfig } from './../log4js-configurations/log4jsConfig';
import { browser, element, by, ElementFinder, promise, protractor } from "protractor";
import { PropertiesFileReader } from "../utils/PropertiesReader";
import { ElementHelper } from "../helper/elementHelper";
import { ExcelReader } from "../utils/excelReader";
import { ValidationHelper } from '../helper/validationHelper';

var validationHelper = new ValidationHelper();

var locatorProperty = new PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/locators/register.properties');
var excelReader: ExcelReader = new ExcelReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/testData.xlsx');
var elementHelper: ElementHelper = new ElementHelper();

var testDataProperty = new PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/parabankTestData.properties');
var userDataRowNumber: number = 2;    //Number(testDataProperty.readPropertiesFileData('userDataRowNumber'));
var until = protractor.ExpectedConditions;

describe('parabank website automation', function () {

    beforeAll(function () {
        // browser.waitForAngularEnabled(false);
        // browser.driver.manage().window().maximize();
        // browser.get(testDataProperty.readPropertiesFileData('base_url'));
        // log4jsConfig.log().debug('navigated to url');
        RegistrationPage.launchApplication();

    })


    it('should validate title', function () {
        expect(browser.getCurrentUrl()).toBe(testDataProperty.readPropertiesFileData('base_url'));
        expect(browser.getTitle()).toBe(testDataProperty.readPropertiesFileData('hometitle'));
    });



    it('should click on registration link', function () {

        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.registerLink'), 'css');
    })



    it('should show error message at firstName and last for empty registration form submisson', function () {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        var firstNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.firstNameErrorText'), 'id')
        elementHelper.getTextData(firstNameErrorElement).then(function (firstNameErrorMessage: string) {
            validationHelper.validateText(firstNameErrorMessage, testDataProperty.readPropertiesFileData('firatNameErrorMessage'));


        });
        var lastNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.lastNameErrorText'), 'id')
        elementHelper.getTextData(lastNameErrorElement).then(function (lastNameErrorMessage: string) {
            validationHelper.validateText(lastNameErrorMessage, testDataProperty.readPropertiesFileData('lastNameErrorMessage'));

        });


    })
    it('should show error message for not matched confirm password', function () {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.password'), testDataProperty.readPropertiesFileData('password'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.confirm'), testDataProperty.readPropertiesFileData('wrongPassword'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        var repeatedPasswordErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.css.repeatedPasswordError'), 'css')
        elementHelper.getTextData(repeatedPasswordErrorElement).then(function (repeatedPasswordError: string) {
            validationHelper.validateText(repeatedPasswordError, testDataProperty.readPropertiesFileData('repeatedPasswordError'));

        });

    })
    it('should not show error message for entered first name field', function () {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.firstName'), testDataProperty.readPropertiesFileData('firstName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.lastName'), testDataProperty.readPropertiesFileData('lastName'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.firstNameErrorText'), 'css').then(function (isExist: boolean) {
            console.log(isExist);
            validationHelper.validateBoolean(isExist, false);
        });

    })
    it('should show error message for empty phone number field', function () {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.phoneNumberErrorMessage'), 'css').then(function (isExist: boolean) {
            console.log(isExist);
            validationHelper.validateBoolean(isExist, true);

        });
    })


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
        browser.wait(until.presenceOf(textElement), 7000, 'Element taking too long to appear in the DOM').then(function () {
            elementHelper.getTextData(textElement).then(function (wellmessageText: string) {
                validationHelper.validateText(wellmessageText, testDataProperty.readPropertiesFileData('wellcomeMessage'));
            });
            log4jsConfig.log().debug('navigated registered user page');


            browser.sleep(5000);
        });



    })


});

