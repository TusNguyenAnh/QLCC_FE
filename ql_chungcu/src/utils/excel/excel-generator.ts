import * as XLSX from "xlsx";
import type {ExcelTemplate} from "../../types/Excel.ts";

/**
 * Tạo file Excel từ template
 */
export const generateExcelTemplate = (template: ExcelTemplate): Blob => {
  const wb = XLSX.utils.book_new();
  const wsData: any[][] = [];

  // 1. Thêm hướng dẫn (3 dòng đầu)
  template.instructions.forEach((instruction) => {
    wsData.push([instruction]);
  });

  // 3. Header row (dòng thứ 4)
  const headerLabels = template.headers.map((h) => h.label);
  wsData.push(headerLabels);

  // 4. Sample data (nếu có)
  if (template.sampleData && template.sampleData.length > 0) {
    template.sampleData.forEach((row) => {
      const rowData = template.headers.map((header) => row[header.key] || "");
      wsData.push(rowData);
    });
  }

  // 5. Tạo worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // 6. Merge cells cho hướng dẫn
  if (!ws["!merges"]) ws["!merges"] = [];
  const colCount = template.headers.length;

  for (let i = 0; i < template.instructions.length; i++) {
    ws["!merges"].push({
      s: { r: i, c: 0 },
      e: { r: i, c: colCount - 1 },
    });
  }

  // 7. Style cho hướng dẫn
  for (let i = 0; i < template.instructions.length; i++) {
    const cellRef = XLSX.utils.encode_cell({ r: i, c: 0 });
    if (ws[cellRef]) {
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FF0000" }, italic: true, sz: 11 },
        alignment: { horizontal: "left", vertical: "center", wrapText: true },
        fill: { fgColor: { rgb: "FFF3CD" } },
      };
    }
  }

  // 8. Style cho header
  const headerRowIndex = template.headerRow - 1;
  for (let i = 0; i < template.headers.length; i++) {
    const cellRef = XLSX.utils.encode_cell({ r: headerRowIndex, c: i });
    if (ws[cellRef]) {
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
        fill: { fgColor: { rgb: "4472C4" } },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    }
  }

  // 9. Set column widths
  ws["!cols"] = template.headers.map((header, index) => ({
    wch: header.width || template.columnWidths?.[index] || 20,
  }));

  // 10. Set row heights
  ws["!rows"] = template.instructions.map(() => ({ hpt: 30 }));

  // 11. Add metadata để validate
  if (!ws["!metadata"]) {
    ws["!metadata"] = {};
  }
  ws["!metadata"] = {
    templateKey: template.templateKey,
    version: template.version,
    createdAt: new Date().toISOString(),
    headerRow: template.headerRow,
    headers: template.headers.map((h) => h.label),
  };

  // 12. Append sheet
  XLSX.utils.book_append_sheet(wb, ws, template.sheetName);

  // 13. Generate blob
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  return new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};

/**
 * Download file Excel
 */
export const downloadExcel = (blob: Blob, fileName: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Export dữ liệu thành Excel
 */
export const exportDataToExcel = <T extends Record<string, any>>(
  data: T[],
  template: ExcelTemplate,
  fileName: string
): void => {
  const wb = XLSX.utils.book_new();

  // Tạo worksheet từ dữ liệu
  const wsData = [
    template.headers.map((h) => h.label),
    ...data.map((row) =>
      template.headers.map((header) => row[header.key] || "")
    ),
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Style header
  for (let i = 0; i < template.headers.length; i++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
    if (ws[cellRef]) {
      ws[cellRef].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4472C4" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }
  }

  // Set column widths
  ws["!cols"] = template.headers.map((h) => ({ wch: h.width || 20 }));

  XLSX.utils.book_append_sheet(wb, ws, template.sheetName);

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  downloadExcel(blob, fileName);
};
