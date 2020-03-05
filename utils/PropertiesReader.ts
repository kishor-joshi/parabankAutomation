// import PropertiesReader = require('properties-reader');
var PropertiesReader = require('properties-reader');

/**
 *  To read the property from the properties file.
 */
export class PropertiesFileReader {
    properties: any;

    constructor(filePath: string) {
        this.properties = PropertiesReader(filePath)
    }

    readPropertiesFileData(keyValue: string): string {
        var propertyValue = this.properties.get(keyValue);
        return propertyValue.toString();
    }
}