import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

interface TableDataRow {
    // Define interface for table data row
    name: string;
    age: number;
    email: string;
}

interface GenerateExcelFromTableProps {
    tableData: TableDataRow[]; // Use specific type/interface for tableData
    tableName: string;
}

const generateExcelFromTable = async ({
    tableData,
    tableName,
}: GenerateExcelFromTableProps) => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(tableName);

    // Add header row
    worksheet.addRow(["Name", "Age", "Email"]);

    // Add data rows
    tableData.forEach((item) => {
        worksheet.addRow([item.name, item.age, item.email]);
    });

    // Write workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Convert buffer to Blob
    const excelBlob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save Excel file using file-saver library
    saveAs(excelBlob, "table_data.xlsx");
};

export default generateExcelFromTable;
