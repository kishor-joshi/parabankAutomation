import { FilePath } from './../utils/filePath';
import { browser, protractor } from "protractor";
import { PropertiesFileReader } from "../utils/PropertiesReader";
import { log4jsConfig } from './../log4js-configurations/log4jsConfig';
import { ElementHelper } from "../helper/elementHelper";
import { ValidationHelper } from '../helper/validationHelper';


var testDataProperty = new PropertiesFileReader(FilePath.registrationTestData);
var locatorProperty = new PropertiesFileReader(FilePath.registrationLocatorPath);
var elementHelper: ElementHelper = new ElementHelper();
var validationHelper = new ValidationHelper();
var until = protractor.ExpectedConditions;

export class RegistrationPage {
    /**
     * lauch the application with specifield url
     */
    static launchApplication() {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig.log().debug('navigated to url');
    }


    static validatePageTitle() {
        expect(browser.getCurrentUrl()).toBe(testDataProperty.readPropertiesFileData('base_url'));
        expect(browser.getTitle()).toBe(testDataProperty.readPropertiesFileData('hometitle'));
    }

    static navigateToRegistrationForm() {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.registerLink'), 'css');

    }

    static clickOnRegisterButton() {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');

    }

    static validateFirstNameErrorMessage() {
        RegistrationPage.clickOnRegisterButton();
        var firstNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.firstNameErrorText'), 'id')
        elementHelper.getTextData(firstNameErrorElement).then(function (firstNameErrorMessage: string) {
            validationHelper.validateText(firstNameErrorMessage, testDataProperty.readPropertiesFileData('firatNameErrorMessage'));

        });
    }

    static validateLastNameErrorMessage() {
        var lastNameErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.id.lastNameErrorText'), 'id')
        elementHelper.getTextData(lastNameErrorElement).then(function (lastNameErrorMessage: string) {
            validationHelper.validateText(lastNameErrorMessage, testDataProperty.readPropertiesFileData('lastNameErrorMessage'));

        });
    }

    static sendFirstName() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.firstName'), testDataProperty.readPropertiesFileData('firstName'), 'id');

    }

    static sendLastName() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.lastName'), testDataProperty.readPropertiesFileData('lastName'), 'id');

    }

    static sendAddress() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.address'), testDataProperty.readPropertiesFileData('address'), 'id');

    }

    static sendCity() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.city'), testDataProperty.readPropertiesFileData('city'), 'id');

    }

    static sendPhoneNumber() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.phoneNumber'), testDataProperty.readPropertiesFileData('phonenumber'), 'id');

    }

    static sendUserName() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.userName'), testDataProperty.readPropertiesFileData('userName'), 'id');

    }

    static sendPassword() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.password'), testDataProperty.readPropertiesFileData('password'), 'id');

    }

    static sendConfirmPassword() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.confirm'), testDataProperty.readPropertiesFileData('confirmPassword'), 'id');

    }

    static sendState() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.state'), testDataProperty.readPropertiesFileData('state'), 'id');

    }

    static sendZipcode() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.zipCode'), testDataProperty.readPropertiesFileData('zipcode'), 'id');

    }

    static sendSSN() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.ssn'), testDataProperty.readPropertiesFileData('ssn'), 'id');

    }

    static varifyPasswordFunctionality() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.password'), testDataProperty.readPropertiesFileData('password'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.confirm'), testDataProperty.readPropertiesFileData('wrongPassword'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        var repeatedPasswordErrorElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.css.repeatedPasswordError'), 'css')
        elementHelper.getTextData(repeatedPasswordErrorElement).then(function (repeatedPasswordError: string) {
            validationHelper.validateText(repeatedPasswordError, testDataProperty.readPropertiesFileData('repeatedPasswordError'));

        });
    }

    static varifyFirstNameErrorMessage() {
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.firstName'), testDataProperty.readPropertiesFileData('firstName'), 'id');
        elementHelper.sendData(locatorProperty.readPropertiesFileData('locator.id.lastName'), testDataProperty.readPropertiesFileData('lastName'), 'id');
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.firstNameErrorText'), 'css').then(function (isExist: boolean) {
            //  console.log(isExist);
            validationHelper.validateBoolean(isExist, false);
        });
    }

    static varifyPhNumberErrorMessage() {
        elementHelper.clickOnElement(locatorProperty.readPropertiesFileData('locator.css.register'), 'css');
        elementHelper.isElementExist(locatorProperty.readPropertiesFileData('locator.css.phoneNumberErrorMessage'), 'css').then(function (isExist: boolean) {
            // console.log(isExist);
            validationHelper.validateBoolean(isExist, true);

        });
    }

    static varifysuccessfulRegisterPage() {
        var textElement = elementHelper.getElement(locatorProperty.readPropertiesFileData('locator.xpath.wellcomemessage'), 'xpath');
        browser.wait(until.presenceOf(textElement), 7000, 'Element taking too long to appear in the DOM').then(function () {
            elementHelper.getTextData(textElement).then(function (wellmessageText: string) {
                validationHelper.validateText(wellmessageText, testDataProperty.readPropertiesFileData('wellcomeMessage'));
            });
            //  browser.sleep(5000);
        });
    }
}