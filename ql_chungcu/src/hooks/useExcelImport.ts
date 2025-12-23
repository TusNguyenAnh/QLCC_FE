import { useState, useCallback } from "react";
import {
    type ExcelTemplate,
    type ValidationRule,
    type ValidationError,
  validateExcelStructure,
  parseExcelFile,
  validateExcelData,
  validateDuplicates,
} from "@/utils/excel";

interface UseExcelImportProps {
  template: ExcelTemplate;
  validationRules: ValidationRule[];
  duplicateFields?: string[];
}

interface UseExcelImportReturn<T> {
  file: File | null;
  data: T[];
  errors: ValidationError[];
  isValidating: boolean;
  isValid: boolean;
  handleFileSelect: (file: File) => Promise<void>;
  reset: () => void;
}

export function useExcelImport<T = any>({
  template,
  validationRules,
  duplicateFields = [],
}: UseExcelImportProps): UseExcelImportReturn<T> {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      setFile(selectedFile);
      setIsValidating(true);
      setErrors([]);
      setIsValid(false);
      setData([]);

      try {
        // 1. Validate structure
        const structureValidation = await validateExcelStructure(
          selectedFile,
          template
        );

        if (!structureValidation.valid) {
          setErrors(
            structureValidation.errors.map((error, index) => ({
              row: 0,
              field: "Template",
              value: "",
              error,
            }))
          );
          return;
        }

        // 2. Parse data
        const parsedData = await parseExcelFile<T>(selectedFile, template);
        setData(parsedData);

        if (parsedData.length === 0) {
          setErrors([
            {
              row: 0,
              field: "Data",
              value: "",
              error: "File không có dữ liệu",
            },
          ]);
          return;
        }

        // 3. Validate data
        const dataValidation = validateExcelData(
          parsedData,
          validationRules,
          template.headerRow + 1
        );

        let allErrors = [...dataValidation.errors];

        // 4. Check duplicates
        if (duplicateFields.length > 0) {
          duplicateFields.forEach((field) => {
            const duplicateErrors = validateDuplicates(
              parsedData,
              field,
              template.headerRow + 1
            );
            allErrors = [...allErrors, ...duplicateErrors];
          });
        }

        setErrors(allErrors);
        setIsValid(allErrors.length === 0);
      } catch (error) {
        setErrors([
          {
            row: 0,
            field: "File",
            value: "",
            error: "Lỗi đọc file: " + (error as Error).message,
          },
        ]);
      } finally {
        setIsValidating(false);
      }
    },
    [template, validationRules, duplicateFields]
  );

  const reset = useCallback(() => {
    setFile(null);
    setData([]);
    setErrors([]);
    setIsValid(false);
    setIsValidating(false);
  }, []);

  return {
    file,
    data,
    errors,
    isValidating,
    isValid,
    handleFileSelect,
    reset,
  };
}
