"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import PropertiesReader = require('properties-reader');
var PropertiesReader = require('properties-reader');
/**
 *  To read the property from the properties file.
 */
class PropertiesFileReader {
    constructor(filePath) {
        this.properties = PropertiesReader(filePath);
    }
    readPropertiesFileData(keyValue) {
        var propertyValue = this.properties.get(keyValue);
        return propertyValue.toString();
    }
}
exports.PropertiesFileReader = PropertiesFileReader;
