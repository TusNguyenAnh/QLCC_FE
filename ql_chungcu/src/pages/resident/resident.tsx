import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RotateCw, Upload, ChevronDown, Filter } from "lucide-react";
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
import { DataTable } from "@/layouts/tables/data-table.tsx";
import { columnLabelsRes } from "@/utils/column-label.ts";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import {
  createAptResUseFileAPI,
  createResUseFileAPI,
  getResByFilterAPI,
} from "@/apis/resAPI.ts";
import type { Resident } from "@/types/Resident.ts";
import { ColumnsRes } from "@/layouts/columns/column-tb-res.tsx";
import { RESIDENT_TEMPLATE, RESIDENT_VALIDATION_RULES } from "@/utils/excel";
import { ExcelImportDialog } from "@/layouts/excel/ExcelImportDialog.tsx";
import {
  APT_RES_TEMPLATE,
  APT_RES_VALIDATION_RULES,
} from "@/layouts/excel/templates/apt_res-template.ts";
import FilterResForm, {
  type FilterResFormSchema,
} from "@/pages/resident/filter-form-res.tsx";
import { createUserAPI } from "@/apis/userAPI.ts";

export function Resident() {
  const [resident, setResident] = useState<[]>([]);
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

  const cusItem = {
    creatAcc: {
      show: true,
      onClick: (rows: any) => {
        handleCreateUser(rows); // rows: Resident[]
      },
    },
  };

  // Handlers để đóng dialog an toàn - đảm bảo cleanup state
  const handleCloseResidentDialog = (open: boolean) => {
    setImportResidentDialogOpen(open);
  };

  const handleCloseAptResDialog = (open: boolean) => {
    setImportResidentApartmentDialogOpen(open);
  };

  const getResByFilter = async (filterRes: FilterResFormSchema) => {
    try {
      const data = await getResByFilterAPI(filterRes);
      setResident(data);
    } catch (err) {
      console.log(err);
    }
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
      console.log(err);
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
      console.log(err);
    }
  };

  const handleCreateUser = async (listRes: Resident[]) => {
    try {
      await createUserAPI(listRes);
      toast.success("Cấp tài khoản cư dân thành công!");
    } catch (err) {
      console.log(err);
    } finally {
      setRowSelection({});
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-2 md:flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2 bg-green-800 hover:bg-green-900">
              <Upload className="h-4 w-4" />
              Nhập Excel
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                // Delay để DropdownMenu cleanup trước khi Dialog mở
                setTimeout(() => setImportResidentDialogOpen(true), 0);
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Nhập thông tin cư dân
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Delay để DropdownMenu cleanup trước khi Dialog mở
                setTimeout(() => setImportResidentApartmentDialogOpen(true), 0);
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Nhập cư dân - căn hộ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Collapsible open={showFilter} onOpenChange={setShowFilter}>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 md:flex-row">
          <CollapsibleTrigger asChild>
            <Button
              variant={showFilter ? "default" : "outline"}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
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
          <div className="p-4 border border-gray-300 rounded-xl bg-gray-50 animate-in slide-in-from-top-2 duration-300">
            <FilterResForm onSubmit={getResByFilter} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="p-4 mt-4 border border-gray-300 rounded-xl">
        <DataTable
          columns={ColumnsRes({ cusItem })}
          data={resident}
          handleDelete={undefined}
          columnLabels={columnLabelsRes}
          keyword={debouncedKeyword}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          cusItem={cusItem}
        />
      </div>

      {/* Import Dialog - Nhập thông tin cư dân */}
      <ExcelImportDialog
        open={importResidentDialogOpen}
        onOpenChange={handleCloseResidentDialog}
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
        onOpenChange={handleCloseAptResDialog}
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
