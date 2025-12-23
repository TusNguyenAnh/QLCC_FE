import {Button} from "@/components/ui/button.tsx";
import {type BdFormSchema} from "@/pages/building/action-form-bd.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RotateCw, Upload, ChevronDown, Filter} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import {DataTable} from "@/layouts/tables/data-table.tsx";
import type {fillItemBd} from "@/types/Building.ts";
import {columnLabelsRes} from "@/utils/column-label.ts";
import {useContext, useState} from "react";
import {useDebounce} from "use-debounce";
import {
    createBdAPI,
    deleteBdAPI,
    getAllBdAPI,
    updateBdAPI,
} from "@/apis/bdAPI.ts";
import {toast} from "sonner";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {
    createAptResUseFileAPI,
    createResUseFileAPI,
    getResByFilterAPI,
} from "@/apis/resAPI.ts";
import type {Resident} from "@/types/Resident.ts";
import {ColumnsRes} from "@/layouts/columns/column-tb-res.tsx";
import {AuthContext} from "@/context/AuthContext.tsx";
import {
    downloadExcel,
    exportDataToExcel,
    generateExcelTemplate,
    RESIDENT_TEMPLATE,
    RESIDENT_VALIDATION_RULES,
} from "@/utils/excel";
import {ExcelImportDialog} from "@/layouts/excel/ExcelImportDialog.tsx";
import {
    APT_RES_TEMPLATE,
    APT_RES_VALIDATION_RULES,
} from "@/layouts/excel/templates/apt_res-template.ts";
import FilterResForm, {type FilterResFormSchema} from "@/pages/resident/filter-form-res.tsx";

export function Resident() {
    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [resident, setResident] = useState<any[]>([]);
    const [resUpdate, setResUpdate] = useState({});
    const [action, setAction] = useState("CREATE");
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500); // ⏱️ Chờ 500ms sau mỗi lần gõ
    const [rowSelection, setRowSelection] = useState({});
    const [showFilter, setShowFilter] = useState(false);

    //excel
    const [importResidentDialogOpen, setImportResidentDialogOpen] =
        useState(false);
    const [
        importResidentApartmentDialogOpen,
        setImportResidentApartmentDialogOpen,
    ] = useState(false);


    const getResByFilter = async (filterRes: FilterResFormSchema) => {
        try {
            const data = await getResByFilterAPI(filterRes);
            setResident(data);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    };

    // Export data xuat ra excel
    const handleExportData = () => {
        // Map dữ liệu hiện tại sang format Excel
        const excelData = resident.map((res, index) => ({
            stt: index + 1,
            apartment_code: res.apartment_code || "",
            fullname: res.fullname || "",
            cccd: res.cccd || "",
            email: res.email || "",
            phone_number: res.phone_number || "",
            birthday: res.birthday ? formatDateToExcel(res.birthday) : "",
            relationship: res.relationship || "",
            gender: res.gender === "1" ? "Nam" : res.gender === "0" ? "Nữ" : "Khác",
        }));

        exportDataToExcel(excelData, RESIDENT_TEMPLATE, "Danh_Sach_Cu_Dan.xlsx");
    };

    // Import handler - GỬI FILE lên Backend
    const handleImportResident = async (file: File) => {
        try {
            // Tạo FormData để gửi file
            const formData = new FormData();
            formData.append("files", file);

            // Call API - GỬI FILE
            await createResUseFileAPI(formData);
            toast.success("Nhập dữ liệu cư dân thành công!");
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    };

    const handleImportAptRes = async (file: File) => {
        try {
            // Tạo FormData để gửi file
            const formData = new FormData();
            formData.append("files", file);

            // Call API - GỬI FILE
            await createAptResUseFileAPI(formData);
            toast.success("Nhập dữ liệu cư dân - căn hộ thành công!");
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    };

    // Helper: Convert YYYY-MM-DD -> DD/MM/YYYY
    const formatDateToExcel = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    // xu ly khi nhan nut them moi
    const handleCreate = () => {
        setBdUpdate({complex_id: "1"}); // complex_id se lay trong localstorage hoac co the lay tu api
        setAction("CREATE");
        setOpenDialog(true);
    };

    // xu ly khi nhan nut sua
    const handleUpdate = (bdUpdate: fillItemBd): void => {
        // nhan tham so la thong tin hang can update
        setBdUpdate(bdUpdate);
        setAction("UPDATE");
        setOpenDialog(true);
    };

    const handleDelete = async (listBd: string[]): void => {
        // nhan tham so la thong tin hang can update
        // setOrgUpdate(orgUpdate)
        // getAllOrgWithoutChild(orgUpdate.id)
        // setAction("UPDATE")
        // setOpenDialog(true)
        // console.log(listBd);
        await deleteBdAPI(listBd);
        const buildings = await getAllBdAPI();
        setBuilding(buildings);
        setRowSelection({});
    };

    //submit form
    const submitCreateOrUpdate = async (data: BdFormSchema, bdId: string) => {
        setLoading(true);
        try {
            if (action === "CREATE") {
                await createBdAPI(data);
            } else {
                await updateBdAPI(data, bdId);
            }
            const buildings = await getAllBdAPI();
            setBuilding(buildings);
            toast.success(
                action == "CREATE"
                    ? "Thêm mới thành công!"
                    : "Cập nhật thông tin thành công!"
            );
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-end gap-2 md:flex-row">
                <Button className="hover: cursor-pointer" onClick={handleCreate}>
                    Thêm mới
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-2 bg-green-800 hover:bg-green-900">
                            <Upload className="h-4 w-4"/>
                            Nhập Excel
                            <ChevronDown className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setImportResidentDialogOpen(true)}>
                            <Upload className="mr-2 h-4 w-4"/>
                            Nhập thông tin cư dân
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setImportResidentApartmentDialogOpen(true)}
                        >
                            <Upload className="mr-2 h-4 w-4"/>
                            Nhập cư dân - căn hộ
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/*<BdForm open={openDialog}*/}
                {/*        setOpen={setOpenDialog}*/}
                {/*        loading={loading}*/}
                {/*        action={action}*/}
                {/*        formData={bdUpdate}*/}
                {/*        onSubmit={submitCreateOrUpdate}>*/}
                {/*</BdForm>*/}
            </div>

            <Collapsible open={showFilter} onOpenChange={setShowFilter}>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 md:flex-row">
                    <CollapsibleTrigger asChild>
                        <Button
                            variant={showFilter ? "default" : "outline"}
                            className="gap-2"
                        >
                            <Filter className="h-4 w-4"/>
                            Bộ lọc
                        </Button>
                    </CollapsibleTrigger>
                    <div className="flex items-center gap-2 ml-auto">
                        <Input
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-64"
                        />
                        <RotateCw
                            className="h-5 w-5 hover:cursor-pointer"
                            onClick={() => setKeyword("")}
                        />
                    </div>
                </div>

                <CollapsibleContent className="mt-4">
                    <div
                        className="p-4 border border-gray-300 rounded-xl bg-gray-50 animate-in slide-in-from-top-2 duration-300">
                        <FilterResForm onSubmit={getResByFilter}/>
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <div className="p-4 mt-4 border border-gray-300 rounded-xl">
                <DataTable<Resident, any>
                    columns={ColumnsRes({handleUpdate, handleDelete})}
                    data={resident}
                    handleDelete={handleDelete}
                    columnLabels={columnLabelsRes}
                    keyword={debouncedKeyword}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>

            {/* Import Dialog - Nhập thông tin cư dân */}
            <ExcelImportDialog
                open={importResidentDialogOpen}
                onOpenChange={setImportResidentDialogOpen}
                template={RESIDENT_TEMPLATE}
                validationRules={RESIDENT_VALIDATION_RULES}
                duplicateFields={["cccd", "email", "phone_number"]}
                onImport={handleImportResident}
                title="Nhập danh sách cư dân"
                description="Tải file mẫu, điền thông tin và tải lên để nhập dữ liệu hàng loạt"
            />

            {/* Import Dialog - Nhập cư dân - căn hộ */}
            <ExcelImportDialog
                open={importResidentApartmentDialogOpen}
                onOpenChange={setImportResidentApartmentDialogOpen}
                template={APT_RES_TEMPLATE}
                validationRules={APT_RES_VALIDATION_RULES}
                duplicateFields={[]}
                onImport={handleImportAptRes}
                title="Nhập danh sách cư dân - căn hộ"
                description="Tải file mẫu để nhập thông tin cư dân kèm căn hộ"
            />
        </>
    );
}
