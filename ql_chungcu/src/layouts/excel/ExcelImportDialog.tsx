import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    XCircle,
    Loader2,
    Download,
} from "lucide-react";
import {useExcelImport} from "@/hooks/useExcelImport.ts";
import {
    type ExcelTemplate,
    type ValidationRule,
    generateExcelTemplate,
    downloadExcel,
} from "@/utils/excel";
import {ExcelErrorTable} from "./ExcelErrorTable.tsx";

interface ExcelImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    template: ExcelTemplate;
    validationRules: ValidationRule[];
    duplicateFields?: string[];
    onImport: (file: File) => Promise<void>;
    title?: string;
    description?: string;
}

export function ExcelImportDialog<T>({
                                         open,
                                         onOpenChange,
                                         template,
                                         validationRules,
                                         duplicateFields,
                                         onImport,
                                         title = "Nhập dữ liệu từ Excel",
                                         description,
                                     }: ExcelImportDialogProps) {
    const [importing, setImporting] = useState(false);

    const {file, data, errors, isValidating, isValid, handleFileSelect, reset} =
        useExcelImport<T>({
            template,
            validationRules,
            duplicateFields,
        });

    const handleDownloadTemplate = () => {
        const blob = generateExcelTemplate(template);
        downloadExcel(blob, template.fileName);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleImportClick = async () => {
        if (!isValid || data.length === 0 || !file) return;

        setImporting(true);
        try {
            await onImport(file);
            reset();
            onOpenChange(false);
        } catch (error) {
            console.error("Import error:", error);
        } finally {
            setImporting(false);
        }
    };

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[95vw] sm:max-h-[90vh] overflow-y-auto w-fit"
                           aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <p className="text-sm text-gray-600 mt-2">{description}</p>
                    )}
                </DialogHeader>

                <div className="space-y-4">
                    {/* Download Template */}
                    <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex items-start gap-3">
                            <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-0.5"/>
                            <div className="flex-1">
                                <h4 className="font-medium text-blue-900">
                                    Bước 1: Tải file mẫu
                                </h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    Tải file Excel mẫu để nhập dữ liệu. File đã có hướng dẫn chi
                                    tiết.
                                </p>
                                <Button
                                    onClick={handleDownloadTemplate}
                                    variant="outline"
                                    className="mt-3 gap-2"
                                    size="sm"
                                >
                                    <Download className="h-4 w-4"/>
                                    Tải file mẫu
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Upload File */}
                    <div className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Upload className="h-5 w-5 text-gray-600 mt-0.5"/>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                    Bước 2: Chọn file đã nhập
                                </h4>
                                <p className="text-sm text-gray-600 mt-1 mb-3">
                                    Chọn file Excel đã nhập dữ liệu để kiểm tra và import.
                                </p>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    disabled={isValidating}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Validating */}
                    {isValidating && (
                        <Alert className="bg-blue-50 border-blue-200">
                            <Loader2 className="h-4 w-4 text-blue-600 animate-spin"/>
                            <AlertDescription className="text-blue-800">
                                Đang kiểm tra file...
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Success */}
                    {!isValidating && isValid && data.length > 0 && (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600"/>
                            <AlertDescription className="text-green-800">
                                <strong>File hợp lệ!</strong> Tìm thấy {data.length} dòng dữ
                                liệu. Bạn có thể tiến hành nhập dữ liệu vào hệ thống.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Errors */}
                    {!isValidating && errors.length > 0 && (
                        <Alert className="bg-red-50 border-red-200">
                            <XCircle className="h-4 w-4 text-red-600"/>
                            <AlertDescription className="text-red-800">
                                <p className="font-semibold mb-2">
                                    Phát hiện {errors.length} lỗi trong file:
                                </p>
                                <ExcelErrorTable errors={errors} maxRows={10}/>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={importing}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleImportClick}
                        disabled={!isValid || importing || data.length === 0}
                        className="gap-2"
                    >
                        {importing && <Loader2 className="h-4 w-4 animate-spin"/>}
                        {importing ? "Đang nhập..." : `Nhập ${data.length} dòng`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
