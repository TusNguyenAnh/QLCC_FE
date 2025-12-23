import * as XLSX from "xlsx";
import type {ExcelTemplate, ParseResult, ValidationError} from "../../types/Excel.ts";

/**
 * Validate cấu trúc file Excel
 */
export const validateExcelStructure = (
  file: File,
  template: ExcelTemplate
): Promise<{ valid: boolean; errors: string[] }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const errors: string[] = [];

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });

        // 1. Kiểm tra sheet name
        if (!wb.SheetNames.includes(template.sheetName)) {
          errors.push(`Không tìm thấy sheet "${template.sheetName}"`);
          return resolve({ valid: false, errors });
        }

        const ws = wb.Sheets[template.sheetName];

        // 2. Kiểm tra metadata (nếu có)
        const metadata = ws["!metadata"];
        if (metadata) {
          if (metadata.templateKey !== template.templateKey) {
            errors.push("File không đúng template của hệ thống");
          }

          if (metadata.version !== template.version) {
            errors.push(
              `Phiên bản template không khớp (Mong đợi: ${template.version}, Nhận được: ${metadata.version})`
            );
          }
        }

        // 3. Kiểm tra header
        const headerRowIndex = template.headerRow - 1;
        for (let i = 0; i < template.headers.length; i++) {
          const cellRef = XLSX.utils.encode_cell({ r: headerRowIndex, c: i });
          const cellValue = ws[cellRef]?.v;
          const expectedLabel = template.headers[i].label;

          if (cellValue !== expectedLabel) {
            errors.push(
              `Cột ${i + 1}: Mong đợi "${expectedLabel}", nhận được "${
                cellValue || "(trống)"
              }"`
            );
          }
        }

        resolve({ valid: errors.length === 0, errors });
      } catch (error) {
        errors.push("Lỗi đọc file: " + (error as Error).message);
        resolve({ valid: false, errors });
      }
    };

    reader.onerror = () => {
      errors.push("Không thể đọc file");
      resolve({ valid: false, errors });
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Parse dữ liệu từ Excel
 */
export const parseExcelFile = <T = any>(
  file: File,
  template: ExcelTemplate
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array", raw: false });
        const ws = wb.Sheets[template.sheetName];

        // Parse từ dòng sau header
        const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
        // template.headerRow là dòng header (VD: 4 = dòng 4 trong Excel = index 3)
        // startRow = 4 nghĩa là bắt đầu từ dòng 5 trong Excel (index 4)
        const startRow = template.headerRow; // Dòng đầu tiên có dữ liệu

        const result: T[] = [];

        for (let row = startRow; row <= range.e.r; row++) {
          const rowData: any = {};
          let isEmpty = true;

          for (let col = 0; col < template.headers.length; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            const cell = ws[cellRef];
            const value = cell ? cell.v : null;

            // neu 1 cot co gia tri thi khong phai dong trong
            if (value !== null && value !== undefined && value !== "") {
              isEmpty = false;
            }

            rowData[template.headers[col].key] = value;
          }

          // Skip empty rows
          if (!isEmpty) {
            result.push(rowData);
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Không thể đọc file"));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Read Excel file as JSON
 */
export const readExcelAsJSON = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Không thể đọc file"));
    reader.readAsArrayBuffer(file);
  });
};
