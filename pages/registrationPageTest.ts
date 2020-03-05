import { FilePath } from './../utils/filePath';
import { browser } from "protractor";
import { PropertiesFileReader } from "../utils/PropertiesReader";
import { log4jsConfig } from './../log4js-configurations/log4jsConfig';

var testDataProperty = new PropertiesFileReader(FilePath.registrationTestData);
export class RegistrationPage {

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
}