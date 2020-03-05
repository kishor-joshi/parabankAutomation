"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
class ExcelReader {
    constructor(filepath) {
        this.filepath = filepath;
    }
    readExcelData(rowNumber, columnName, sheetName) {
        var workbook = new exceljs_1.Workbook();
        let columnNumber;
        return workbook.xlsx.readFile(this.filepath).then(function () {
            let sheet = workbook.getWorksheet(sheetName);
            let totalRows = sheet.rowCount;
            console.log("No.of Rows in ExcelSheet : " + totalRows);
            let firstRowObject = sheet.getRow(1);
            var totalColumnCount = firstRowObject.actualCellCount;
            for (let index = 1; index <= totalColumnCount; index++) {
                let cellObject = firstRowObject.getCell(index);
                if (cellObject.toString() == columnName) {
                    columnNumber = index;
                    console.log(columnNumber);
                    break;
                }
            }
            let rowObject = sheet.getRow(rowNumber);
            let cellObject = rowObject.getCell(columnNumber);
            console.log(cellObject.toString());
            return cellObject.toString();
        });
    }
}
exports.ExcelReader = ExcelReader;
