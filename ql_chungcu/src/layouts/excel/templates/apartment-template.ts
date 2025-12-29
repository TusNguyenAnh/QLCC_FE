import type {ExcelTemplate, ValidationRule} from "@/types/Excel.ts";

export const APARTMENT_TEMPLATE: ExcelTemplate = {
    fileName: "Mau_Nhap_Can_Ho.xlsx",
    sheetName: "Danh sách căn hộ",
    templateKey: "APT_IMPORT",
    version: "1.0.0",
    headerRow: 4,
    instructions: [
        "📋 HƯỚNG DẪN NHẬP THÔNG TIN CĂN HỘ",
        "⚠️ LƯU Ý: KHÔNG được thay đổi cấu trúc file này. Định dạng dữ liệu nhập là text, chỉ nhập dữ liệu từ dòng thứ 5 trở đi.",
        "✅ Các trường có dấu (*) là BẮT BUỘC. Số căn hộ trong tòa nhà phải là DUY NHẤT.",
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
            key: "apt_number",
            label: "Số căn hộ (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {
            key: "floor",
            label: "Tầng (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {
            key: "apt_area",
            label: "Diện tích (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {
            key: "apt_type",
            label: "Loại căn hộ (*)",
            required: true,
            type: "string",
            width: 15,
        },
        {
            key: "description",
            label: "Mô tả (*)",
            required: true,
            type: "string",
            width: 15,
        },
    ],
    sampleData: [
        {
            stt: 1,
            building_name: "Tòa A1",
            apt_number: "1103",
            apt_area: "53",
            apt_type: "1 phòng ngủ, 1 vệ sinh, 1 phòng khách",
            description: "nhà hướng bac",
            floor: 11
        },
        {
            stt: 2,
            building_name: "Tòa A1",
            apt_number: "1106",
            apt_area: "56",
            apt_type: "1 phòng ngủ, 1 vệ sinh, 1 phòng khách",
            description: "nhà hướng bac",
            floor: 11
        },
    ],
};

export const APARTMENT_VALIDATION_RULES: ValidationRule[] = [
    {
        field: "building_name",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    {
        field: "apt_number",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    {
        field: "apt_area",
        required: true,
        type: "string",
        minLength: 1,
        maxLength: 100,
    },
    {
        field: "apt_type",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    {
        field: "description",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    {
        field: "floor",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
];

