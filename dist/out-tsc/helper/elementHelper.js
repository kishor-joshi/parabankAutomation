"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsConfig_1 = require("../log4js-configurations/log4jsConfig");
class ElementHelper {
    getTextData(presentElement) {
        //   var textData: string;
        return presentElement.getText().then(function (text) {
            console.log(text);
            log4jsConfig_1.log4jsConfig.log().debug("Element's text is: " + text);
            return text;
        });
    }
    clickOnElement(locator, locatorType) {
        if (locatorType == 'css') {
            protractor_1.element(protractor_1.by.css(locator)).click();
            log4jsConfig_1.log4jsConfig.log().debug('clicked on element', locator);
        }
        else if (locatorType == 'id') {
            protractor_1.element(protractor_1.by.id(locator)).click();
            log4jsConfig_1.log4jsConfig.log().debug('clicked on element', locator);
        }
    }
    sendData(locator, text, locatorType) {
        var presentElement = this.getElement(locator, locatorType);
        log4jsConfig_1.log4jsConfig.log().debug("send text is: " + text);
        presentElement.clear().then(function () {
            presentElement.sendKeys(text);
        });
    }
    getElement(locator, locatorType) {
        if (locatorType == 'css') {
            protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(protractor_1.element(protractor_1.by.css(locator)))).then();
            return protractor_1.element(protractor_1.by.css(locator));
        }
        else if (locatorType == 'xpath') {
            protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(protractor_1.element(protractor_1.by.xpath(locator)))).then();
            return protractor_1.element(protractor_1.by.xpath(locator));
        }
        else {
            return protractor_1.element(protractor_1.by.id(locator));
        }
    }
    isElementExist(locator, locatorType) {
        if (locatorType == 'id') {
            return protractor_1.element(protractor_1.by.id(locator)).isPresent();
        }
        else {
            return protractor_1.element(protractor_1.by.css(locator)).isPresent();
        }
    }
}
exports.ElementHelper = ElementHelper;
