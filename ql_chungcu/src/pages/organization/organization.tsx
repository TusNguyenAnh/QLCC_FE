import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";
import {RotateCw} from "lucide-react";

import {DataTableSecond} from "@/layouts/tables/data-table-second.tsx";
import type {fillItemOrg, orgWithoutChild} from "@/types/Organization.ts";
import OrgForm, {type OrgFormSchema} from "./action-form-org.tsx";
import {createOrgAPI, deleteOrgAPI, getAllOrgAPI, getAllOrgWithoutChildAPI, updateOrgAPI} from "@/apis/orgAPI.ts";
import {toast} from "sonner";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {ColumnsOrg} from "@/layouts/columns/column-tb-org.tsx";
import {columnLabelsOrg} from "@/utils/column-label.ts";
import AddMemberOrg from "@/pages/organization/add-member-org.tsx";
import type {bdItemCheckbox} from "@/types/Building.ts";
import {getAllBdAPI} from "@/apis/bdAPI.ts";

function Organization() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogMember, setOpenDialogMemeber] = useState(false);

    const [loading, setLoading] = useState(false);
    const [org, setOrg] = useState([]);
    const [orgUpdate, setOrgUpdate] = useState({});
    const [listOrgWithoutChild, setListOrgWithoutChild] = useState([]);
    const [listBuilding, setListBuilding] = useState([]);
    const [action, setAction] = useState("CREATE");
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500); // ⏱️ Chờ 500ms sau mỗi lần gõ
    const [rowSelection, setRowSelection] = useState({});


    //Lay tat ca cac phong ban
    useEffect(() => {
        getAllOrgAPI().then(data => {
            setOrg(data);
        })
        getAllBuilding()
    }, [])

    //Lay tat ca cac phong ban tru phong ban hien tai va con cua no de fill vao form action
    const getAllOrgWithoutChild = async (orgId: string) => {
        try {
            const data = await getAllOrgWithoutChildAPI(orgId)

            const items = data.map(function (item: orgWithoutChild) {
                return ({
                    value: item.id,
                    label: item.org_name,
                });
            });
            setListOrgWithoutChild(items);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    const getAllBuilding = async () => {
        try {
            const data = await getAllBdAPI()

            const items = data.map(function (item: bdItemCheckbox) {
                return ({
                    id: item.id,
                    building_name: item.building_name,
                });
            });
            setListBuilding(items);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    // xu ly khi nhan nut them moi
    const handleCreate = () => {
        setOrgUpdate({})
        getAllOrgWithoutChild('00000000-0000-0000-0000-000000000000')
        getAllBuilding()
        setAction("CREATE")
        setOpenDialog(true)
    }

    // xu ly khi nhan nut sua
    const handleUpdate = (orgUpdate: fillItemOrg): void => { // nhan tham so la thong tin hang can update
        setOrgUpdate(orgUpdate)
        getAllOrgWithoutChild(orgUpdate.id)
        getAllBuilding()
        setAction("UPDATE")
        setOpenDialog(true)
    }

    const handleDelete = async (listOrg: string[]): void => { // nhan tham so la thong tin hang can update
        // setOrgUpdate(orgUpdate)
        // getAllOrgWithoutChild(orgUpdate.id)
        // setAction("UPDATE")
        // setOpenDialog(true)
        await deleteOrgAPI(listOrg)
        const orgs = await getAllOrgAPI();
        setOrg(orgs);
        setRowSelection({})
    }

    const handleAddMember = (listOrg: string[]): void => {
        console.log(listOrg);
        setOpenDialogMemeber(true);
    }

    //submit form
    const submitCreateOrUpdate = async (data: OrgFormSchema, orgId: string) => {
        setLoading(true);
        try {
            if (action === "CREATE") {
                await createOrgAPI(data);
            } else {
                await updateOrgAPI(data, orgId);
            }
            const orgs = await getAllOrgAPI();
            setOrg(orgs);
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

                <OrgForm open={openDialog}
                         setOpen={setOpenDialog}
                         loading={loading}
                         action={action}
                         formData={orgUpdate}
                         itemsOrg={listOrgWithoutChild}
                         itemsBd={listBuilding}
                         onSubmit={submitCreateOrUpdate}>
                </OrgForm>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2 md:flex-row">
                <Label>Thu gọn</Label>
                <Input type="text" placeholder="Nhập từ khóa tìm kiếm" value={keyword}
                       onChange={e => setKeyword(e.target.value)} className="w-1/6"/>
                <RotateCw className="hover: cursor-pointer" onClick={() => setKeyword("")}/>
            </div>

            <div className="p-4 mt-4 border border-gray-300 rounded-xl">
                <DataTableSecond columns={ColumnsOrg({itemsBd: listBuilding, handleUpdate, handleDelete, handleAddMember})} data={org}
                                 handleDelete={handleDelete}
                                 keyword={debouncedKeyword}
                                 rowSelection={rowSelection}
                                 setRowSelection={setRowSelection}
                                 columnLabels={columnLabelsOrg}
                />
                <AddMemberOrg
                    open={openDialogMember}
                    setOpen={setOpenDialogMemeber}
                    loading={loading}
                    action={action}
                >

                </AddMemberOrg>
            </div>
        </>
    )
}

export default Organization;

