import { ValidationHelper } from './../helper/validationHelper';
import { browser, WebDriver, protractor } from "protractor";
import { PropertiesFileReader } from "../utils/PropertiesReader";
import { log4jsConfig } from './../log4js-configurations/log4jsConfig';
import { ElementHelper } from "../helper/elementHelper";
import { ExcelReader } from "../utils/excelReader";

var validationHelper = new ValidationHelper();
var excelReader: ExcelReader = new ExcelReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/loginDetails.xlsx');
var until = protractor.ExpectedConditions;

var testDataProperty = new PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/testData/loginTestData.properties');
var loginLocator = new PropertiesFileReader('C:/Users/kishor.joshi/Desktop/protractor/parabankWebsiteAutomation/locators/loginLocator.properties');
var elementHelper: ElementHelper = new ElementHelper();

describe('login page validation', function () {
    beforeAll(function () {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig.log().debug('navigated to url');

    })
    it('should show text at login page.', function () {
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
        //  elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')
        //   elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css'))
    })
    it('should show error message for empty login credential submission', function () {
        elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')
        elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage: string) {
            validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforemptycredential'))

        })

    })
    it('should show error message for wrong login credential submission', function () {
        excelReader.readExcelData(2, 'username', 'loginDetails').then(function (excelData: string) {
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), excelData, 'css')
            elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), excelData, 'css')
            elementHelper.clickOnElement(loginLocator.readPropertiesFileData('locator.css.loginbutton'), 'css')

        }).then(function () {
            elementHelper.getTextData(elementHelper.getElement(loginLocator.readPropertiesFileData('locator.css.loginerrormessage'), 'css')).then(function (loginerrormessage: string) {

                validationHelper.validateText(loginerrormessage, testDataProperty.readPropertiesFileData('errorforwronginputdata'))

                console.log('running') // browser.sleep(5000);

            })
        })
        // elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.usernameinput'), 'ffgg', 'css')
        //  elementHelper.sendData(loginLocator.readPropertiesFileData('locator.css.passwordinput'), 'ffgg', 'css')


    })
})