import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Input} from "@/components/ui/input.tsx";
import {RotateCw} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import AptForm, {type AptFormSchema} from "@/pages/apartment/action-form-apt.tsx";
import type {bdItemCheckbox, Building} from "@/types/Building.ts";
import {getAllBdAPI} from "@/apis/bdAPI.ts";
import {createAptAPI, getApartmentByBuilding, updateAptAPI} from "@/apis/aptAPI.ts";
import {DataTable} from "@/layouts/tables/data-table.tsx";
import {ColumnsApt} from "@/layouts/columns/column-tb-apt.tsx";
import type {fillItemApt} from "@/types/Apartment.ts";
import {columnLabelsApt} from "@/utils/column-label.ts";

function Apartment() {
    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");

    const [apt, setApt] = useState([]);
    const [aptUpdate, setAptUpdate] = useState({});
    const [action, setAction] = useState("CREATE");
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500); // ⏱️ Chờ 500ms sau mỗi lần gõ
    const [rowSelection, setRowSelection] = useState({});


    //Lay tat ca cac phong ban
    useEffect(() => {
        getAllBuilding()
    }, [])

    //Lay tat ca cac phong ban tru phong ban hien tai va con cua no de fill vao form action
    const getAllBuilding = async () => {
        try {
            const data = await getAllBdAPI()

            const items = data.map(function (item: bdItemCheckbox) {
                return ({
                    value: item.id,
                    label: item.building_name,
                });
            });
            setBuildings(items);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    const handleSelectApt = async (value: string) => {
        try {
            setSelectedBuilding(value);
            const data = await getApartmentByBuilding(value)
            setApt(data);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    // xu ly khi nhan nut them moi
    const handleCreate = () => {
        setAptUpdate({})
        getAllBuilding() // lay tat ca building de fill vao form
        setAction("CREATE")
        setOpenDialog(true)
    }

    // xu ly khi nhan nut sua
    const handleUpdate = (aptUpdate: fillItemApt): void => { // nhan tham so la thong tin hang can update
        setAptUpdate(aptUpdate)
        getAllBuilding()
        setAction("UPDATE")
        setOpenDialog(true)
    }

    const handleDelete = async (listApt: string[]): void => { // nhan tham so la thong tin hang can update
        console.log(selectedBuilding)
        // await deleteOrgAPI(listOrg)
        // const orgs = await getAllOrgAPI();
        // setOrg(orgs);
        // setRowSelection({})
    }

    //submit form
    const submitCreateOrUpdate = async (data: AptFormSchema, aptId: string) => {
        setLoading(true);
        try {
            if (action === "CREATE") {
                await createAptAPI(data);
            } else {
                await updateAptAPI(data, aptId);
                const apts = await getApartmentByBuilding(selectedBuilding);
                setApt(apts);
            }
            toast.success(action == "CREATE" ? "Thêm mới thành công!" : "Cập nhật thông tin thành công!")
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-end gap-2 md:flex-row">
                <Button className="hover: cursor-pointer" onClick={handleCreate}>Thêm mới</Button>

                <AptForm open={openDialog}
                         setOpen={setOpenDialog}
                         loading={loading}
                         action={action}
                         formData={aptUpdate}
                         items={buildings}
                         onSubmit={submitCreateOrUpdate}>
                </AptForm>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between  md:flex-row">
                <div>
                    <Select onValueChange={handleSelectApt}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tòa nhà"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tòa nhà</SelectLabel>
                                {buildings.map((bd: any) => (
                                    <SelectItem key={bd.value} value={bd.value}>
                                        {bd.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center grow justify-end gap-2">
                    <Label>Thu gọn</Label>
                    <Input type="text" placeholder="Nhập từ khóa tìm kiếm" value={keyword}
                           onChange={e => setKeyword(e.target.value)} className="w-1/5"/>
                    <RotateCw className="hover: cursor-pointer" onClick={() => setKeyword("")}/>
                </div>
            </div>

            <div className="p-4 mt-4 border border-gray-300 rounded-xl">
                <DataTable columns={ColumnsApt({handleUpdate, handleDelete})} columnLabels={columnLabelsApt} data={apt}
                           keyword={debouncedKeyword} rowSelection={rowSelection} setRowSelection={setRowSelection}
                           handleDelete={handleDelete}/>
            </div>
        </>
    )
}

export default Apartment;
