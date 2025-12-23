import type {ExcelTemplate, ValidationRule} from "@/types/Excel.ts";

export const RESIDENT_TEMPLATE: ExcelTemplate = {
    fileName: "Mau_Nhap_Cu_Dan.xlsx",
    sheetName: "Danh sách cư dân",
    templateKey: "RESIDENT_IMPORT",
    version: "1.0.0",
    headerRow: 4,
    instructions: [
        "📋 HƯỚNG DẪN NHẬP THÔNG TIN CƯ DÂN",
        "⚠️ LƯU Ý: KHÔNG được thay đổi cấu trúc file này. Chỉ nhập dữ liệu từ dòng thứ 5 trở đi.",
        "✅ Các trường có dấu (*) là BẮT BUỘC. CCCD,Email và SĐT phải là DUY NHẤT nếu nhập.",
    ],
    headers: [
        {key: "stt", label: "STT", required: false, type: "number", width: 8},
        {
            key: "fullname",
            label: "Họ và tên (*)",
            required: true,
            type: "string",
            width: 25,
        },
        {key: "cccd", label: "CCCD (*)", required: true, type: "cccd", width: 15},
        {key: "email", label: "Email (*)", required: true, type: "email", width: 25},
        {
            key: "phone_number",
            label: "Số điện thoại (*)",
            required: true,
            type: "phone",
            width: 15,
        },
        {
            key: "birthday",
            label: "Ngày sinh (*)",
            required: true,
            type: "date",
            width: 15,
        },
        {
            key: "relationship",
            label: "Quan hệ (*)",
            required: true,
            type: "enum",
            enum: ["chủ hộ", "thành viên", "người thuê"],
            width: 15,
        },
        {
            key: "gender",
            label: "Giới tính (*)",
            required: true,
            type: "enum",
            enum: ["Nam", "Nữ", "Khác"],
            width: 12,
        },
    ],
    sampleData: [
        {
            stt: 1,
            fullname: "Nguyễn Văn A",
            cccd: "001122006162",
            email: "nguyenvana@gmail.com",
            phone_number: "0345566771",
            birthday: "08/08/2003",
            relationship: "chủ hộ",
            gender: "Nam",
        },
        {
            stt: 2,
            fullname: "Nguyễn Thị B",
            cccd: "001122006163",
            email: "nguyenthib@gmail.com",
            phone_number: "0345566772",
            birthday: "15/05/2005",
            relationship: "thành viên",
            gender: "Nữ",
        },
    ],
};

export const RESIDENT_VALIDATION_RULES: ValidationRule[] = [
    {
        field: "fullname",
        required: true,
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    {
        field: "cccd",
        required: true,
        type: "cccd",
    },
    {
        field: "email",
        required: true,
        type: "email",
    },
    {
        field: "phone_number",
        required: true,
        type: "phone",
    },
    {
        field: "birthday",
        required: true,
        type: "date",
    },
    {
        field: "relationship",
        required: true,
        type: "enum",
        enum: ["chủ hộ", "thành viên"],
    },
    {
        field: "gender",
        required: true,
        type: "enum",
        enum: ["Nam", "Nữ"],
    },
];

export interface ResidentImportData {
    stt?: number;
    apartment_code: string;
    fullname: string;
    cccd: string;
    email?: string;
    phone_number?: string;
    birthday?: string;
    relationship: string;
    gender: string;
}
