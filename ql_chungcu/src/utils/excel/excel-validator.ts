import type {ValidationRule, ValidationError} from "../../types/Excel.ts";

/**
 * Validate single value
 */
const validateValue = (
    value: any,
    rule: ValidationRule,
    row: any
): string | null => {
    // Required check
    if (rule.required && (!value || value.toString().trim() === "")) {
        return `Trường "${rule.field}" là bắt buộc`;
    }

    // Skip if empty and not required
    if (!value || value === "") return null;

    const stringValue = value.toString().trim();

    // Type validation
    switch (rule.type) {
        case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
                return "Email không đúng định dạng";
            }
            break;

        case "phone": {
            const phoneClean = stringValue.replace(/[\s-]/g, "");
            if (!/^0\d{9,10}$/.test(phoneClean)) {
                return "Số điện thoại phải có 10-11 số, bắt đầu bằng 0";
            }
            break;
        }

        case "cccd": {
            const cccdClean = stringValue.replace(/\s/g, "");
            if (!/^\d{12}$/.test(cccdClean)) {
                return "CCCD phải có 12 chữ số";
            }
            break;
        }

        case "date": {
            const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!datePattern.test(stringValue)) {
                return "Ngày phải có định dạng DD/MM/YYYY";
            }
            // Validate date is valid
            const parts = stringValue.split("/");
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]);
            const year = parseInt(parts[2]);
            const date = new Date(year, month - 1, day);
            if (
                date.getDate() !== day ||
                date.getMonth() !== month - 1 ||
                date.getFullYear() !== year
            ) {
                return "Ngày không hợp lệ";
            }
            break;
        }

        case "number":
            if (isNaN(Number(stringValue))) {
                return "Giá trị phải là số";
            }
            break;
    }

    // Length validation
    if (rule.minLength && stringValue.length < rule.minLength) {
        return `Độ dài tối thiểu ${rule.minLength} ký tự`;
    }

    if (rule.maxLength && stringValue.length > rule.maxLength) {
        return `Độ dài tối đa ${rule.maxLength} ký tự`;
    }

    // Enum validation
    if (rule.enum && !rule.enum.includes(stringValue)) {
        return `Giá trị phải là một trong: ${rule.enum.join(", ")}`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(stringValue)) {
        return "Giá trị không đúng định dạng";
    }

    // Custom validation
    if (rule.custom) {
        return rule.custom(value, row);
    }

    return null;
};

/**
 * Validate dữ liệu Excel
 */
export const validateExcelData = (
    data: any[],
    rules: ValidationRule[],
    startRow: number = 5
): { valid: boolean; errors: ValidationError[] } => {
    const errors: ValidationError[] = [];

    data.forEach((row, index) => {
        const rowNumber = index + startRow; // Dòng thực tế trong Excel dùng để báo lỗi

        rules.forEach((rule) => {
            const value = row[rule.field];
            const error = validateValue(value, rule, row); // Kiểm tra giá trị theo quy tắc của từng object

            if (error) {
                errors.push({
                    row: rowNumber,
                    field: rule.field,
                    value: value,
                    error: error,
                });
            }
        });
    });

    return {valid: errors.length === 0, errors};
};

/**
 * Validate duplicate values
 */
export const validateDuplicates = (
    data: any[],
    field: string,
    startRow: number = 5
): ValidationError[] => {
    const errors: ValidationError[] = [];
    const seen = new Map<string, number>();

    data.forEach((row, index) => {
        const value = row[field];
        if (!value) return;

        const stringValue = value.toString().trim();
        if (seen.has(stringValue)) {
            errors.push({
                row: index + startRow,
                field: field,
                value: value,
                error: `Giá trị trùng lặp với dòng ${seen.get(stringValue)}`,
            });
        } else {
            seen.set(stringValue, index + startRow);
        }
    });

    return errors;
};
