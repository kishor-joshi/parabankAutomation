import { FilePath } from './../utils/filePath';

import { PropertiesFileReader } from "../utils/PropertiesReader";
import { log4jsConfig } from "../log4js-configurations/log4jsConfig";
import { ElementHelper } from '../helper/elementHelper';
import { browser } from 'protractor';
import { ValidationHelper } from './../helper/validationHelper';
import { ExcelReader } from '../utils/excelReader';

var excelReader: ExcelReader = new ExcelReader(FilePath.loginExcelTestData);
var loginLocator = new PropertiesFileReader(FilePath.loginLocators);
var testDataProperty = new PropertiesFileReader(FilePath.loginTestDataPath);
var elementHelper: ElementHelper = new ElementHelper();
var validationHelper = new ValidationHelper();

export class LoginPage {

    static launchApplication() {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig.log().debug('navigated to url');
    }


    static validateLoginTextField() {
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.customerlogin'), 'css')).then(function (custorloginText: string) {
            validationHelper.validateText(custorloginText, testDataProperty.readPropertiesFileData('customerloginText'))
        })
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.usernametext'), 'css')).then(function (usernameText: string) {
            validationHelper.validateText(usernameText, testDataProperty.readPropertiesFileData('usernametext'))

        })
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.passwordtext'), 'css')).then(function (passwordtext: string) {
            validationHelper.validateText(passwordtext, testDataProperty.readPropertiesFileData('passwordtext'))

        })

        elementHelper.isElementExist(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css').then(function (isbuttonExist: boolean) {
            validationHelper.validateBoolean(isbuttonExist, true);
        })
    }

    static validateErrorMessageForEmptyLoginCredentialSubmission() {
        elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage: string) {
            validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforemptycredential'))

        })
    }
    static validateErrorMessageForWrongLoginCredentialSubmisson() {
        excelReader.readExcelData(2, 'username', 'loginDetails').then(function (excelData: string) {
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), excelData, 'css')
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), excelData, 'css')
            elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')

        }).then(function () {
            elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage: string) {

                validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforwronginputdata'))

           

            })
        })
    }

}