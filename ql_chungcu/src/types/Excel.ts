export interface ExcelTemplate {
  fileName: string;
  sheetName: string;
  templateKey: string;
  version: string;
  headerRow: number;
  instructions: string[];
  headers: ExcelHeader[];
  sampleData?: Record<string, any>[];
  columnWidths?: number[];
}

export interface ExcelHeader {
  key: string;
  label: string;
  required: boolean;
  type?: "string" | "number" | "email" | "phone" | "date" | "cccd" | "enum";
  enum?: string[];
  width?: number;
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: "string" | "number" | "email" | "phone" | "date" | "cccd" | "enum";
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  enum?: string[];
  custom?: (value: any, row: any) => string | null;
}

export interface ValidationError {
  row: number;
  field: string;
  value: any;
  error: string;
}

export interface ParseResult<T> {
  success: boolean;
  data: T[];
  errors: ValidationError[];
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    error: string;
    field?: string;
  }>;
}
