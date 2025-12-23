// Generator
export {
  generateExcelTemplate,
  downloadExcel,
  exportDataToExcel,
} from "./excel-generator";

// Parser
export {
  validateExcelStructure,
  parseExcelFile,
  readExcelAsJSON,
} from "./excel-parser";

// Validator
export { validateExcelData, validateDuplicates } from "./excel-validator";

// Types
export type {
  ExcelTemplate,
  ExcelHeader,
  ValidationRule,
  ValidationError,
  ParseResult,
  ImportResult,
} from "../../types/Excel.ts";

// Templates
export {
  RESIDENT_TEMPLATE,
  RESIDENT_VALIDATION_RULES,
  type ResidentImportData,
} from "@/layouts/excel/templates/resident-template";
