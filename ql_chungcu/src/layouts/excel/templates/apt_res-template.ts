import type {ExcelTemplate, ValidationRule} from "@/types/Excel.ts";

export const APT_RES_TEMPLATE: ExcelTemplate = {
    fileName: "Mau_Nhap_Cudan_Canho.xlsx",
    sheetName: "Danh sách cư dân - căn hộ",
    templateKey: "APT_RES_IMPORT",
    version: "1.0.0",
    headerRow: 4,
    instructions: [
        "📋 HƯỚNG DẪN NHẬP THÔNG TIN CƯ DÂN - CĂN HỘ",
        "⚠️ LƯU Ý: KHÔNG được thay đổi cấu trúc file này. Định dạng dữ liệu nhập là text, chỉ nhập dữ liệu từ dòng thứ 5 trở đi.",
        "✅ Các trường có dấu (*) là BẮT BUỘC",
    ],
    headers: [
        {key: "stt", label: "STT", required: false, type: "number", width: 8},
        {
            key: "building_name",
            label: "Tòa nhà (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {
            key: "apartment_code",
            label: "Số căn hộ (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {key: "cccd", label: "CCCD (*)", required: true, type: "cccd", width: 15},
    ],
    sampleData: [
        {
            stt: 1,
            building_name: "Tòa A",
            apartment_code: "101",
            cccd: "001122006162",
        },
        {
            stt: 2,
            building_name: "Tòa A",
            apartment_code: "102",
            cccd: "001122006163",
        },
    ],
};

export const APT_RES_VALIDATION_RULES: ValidationRule[] = [
    {
        field: "building_name",
        required: true,
        type: "string",
        minLength: 1,
        maxLength: 50,
    },
    {
        field: "apartment_code",
        required: true,
        type: "string",
        minLength: 1,
        maxLength: 20,
    },
    {
        field: "cccd",
        required: true,
        type: "cccd",
    },
];