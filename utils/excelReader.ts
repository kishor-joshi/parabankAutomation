import { Workbook, Row, Cell, Worksheet } from 'exceljs'

export class ExcelReader {
    filepath: string;


    constructor(filepath: string) {
        this.filepath = filepath;
    }
    public readExcelData(rowNumber: number, columnName: string, sheetName: string) {

        var workbook = new Workbook();
        let columnNumber: number;
        return workbook.xlsx.readFile(this.filepath).then(function () {
            let sheet: Worksheet = workbook.getWorksheet(sheetName);
            let totalRows: number = sheet.rowCount

            console.log("No.of Rows in ExcelSheet : " + totalRows)
            let firstRowObject: Row = sheet.getRow(1);
            var totalColumnCount: number = firstRowObject.actualCellCount
            for (let index = 1; index <= totalColumnCount; index++) {
                let cellObject: Cell = firstRowObject.getCell(index);
                if (cellObject.toString() == columnName) {
                    columnNumber = index;
                    console.log(columnNumber)
                    break;
                }
            }
            let rowObject: Row = sheet.getRow(rowNumber);
            let cellObject: Cell = rowObject.getCell(columnNumber);
            console.log(cellObject.toString());
            return cellObject.toString();
        });
    }
}