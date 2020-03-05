"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filePath_1 = require("./../utils/filePath");
const protractor_1 = require("protractor");
const PropertiesReader_1 = require("../utils/PropertiesReader");
const log4jsConfig_1 = require("./../log4js-configurations/log4jsConfig");
var testDataProperty = new PropertiesReader_1.PropertiesFileReader(filePath_1.FilePath.registrationTestData);
class RegistrationPage {
    static launchApplication() {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.driver.manage().window().maximize();
        protractor_1.browser.get(testDataProperty.readPropertiesFileData('base_url'));
        log4jsConfig_1.log4jsConfig.log().debug('navigated to url');
    }
}
exports.RegistrationPage = RegistrationPage;
