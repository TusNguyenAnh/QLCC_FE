import {Button} from "@/components/ui/button.tsx";
import OrgForm from "@/pages/organization/action-form-org.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Input} from "@/components/ui/input.tsx";
import {RotateCw} from "lucide-react";
import {columnLabelsTt} from "@/utils/column-label.ts";
import {DataTable} from "@/layouts/tables/data-table.tsx";
import {useContext, useEffect, useState} from "react";
import {useDebounce} from "use-debounce";

import {getAllTaskTypeAPI} from "@/apis/taskTypeAPI.ts";
import {AuthContext} from "@/context/AuthContext.tsx";
import {ColumnsTt} from "@/layouts/columns/column-tb-tt.tsx";
import type {fillItemTt} from "@/types/TaskType.ts";

export function TaskType() {
    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [taskType, setTaskType] = useState([]);
    const [taskTypeUpdate, setTaskTypeUpdate] = useState({});


    const [action, setAction] = useState("CREATE");
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500); // ⏱️ Chờ 500ms sau mỗi lần gõ
    const [rowSelection, setRowSelection] = useState({});
    const {complex} = useContext(AuthContext);

    const handleCreate = () => {
        // setOrgUpdate({})
        // getAllOrgWithoutChild('00000000-0000-0000-0000-000000000000')
        // getAllBuilding()
        setAction("CREATE")
        setOpenDialog(true)
    }

    const handleUpdate = (taskTypeUpdate: fillItemTt): void => { // nhan tham so la thong tin hang can update
        setAction("UPDATE")
        setOpenDialog(true)
    }

    const handleDelete = async (listTt: string[]): void => { // nhan tham so la thong tin hang can update
    }


    useEffect(() => {
        getAllTaskTypeAPI(complex).then(data => {
            setTaskType(data);
        })
    }, [])




    return(
        <>
            <div className="flex flex-wrap items-center justify-end gap-2 md:flex-row">
                <Button className="hover: cursor-pointer" onClick={handleCreate}>Thêm mới</Button>

                {/*<OrgForm open={openDialog}*/}
                {/*         setOpen={setOpenDialog}*/}
                {/*         loading={loading}*/}
                {/*         action={action}*/}
                {/*         formData={orgUpdate}*/}
                {/*         itemsOrg={listOrgWithoutChild}*/}
                {/*         itemsBd={listBuilding}*/}
                {/*         onSubmit={submitCreateOrUpdate}>*/}
                {/*</OrgForm>*/}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2 md:flex-row">
                <Label>Thu gọn</Label>
                <Input type="text" placeholder="Nhập từ khóa tìm kiếm" value={keyword}
                       onChange={e => setKeyword(e.target.value)} className="w-1/6"/>
                <RotateCw className="hover: cursor-pointer" onClick={() => setKeyword("")}/>
            </div>

            <div className="p-4 mt-4 border border-gray-300 rounded-xl">
                <DataTable columns={ColumnsTt({ handleUpdate, handleDelete})} data={taskType}
                                 handleDelete={handleDelete}
                                 keyword={debouncedKeyword}
                                 rowSelection={rowSelection}
                                 setRowSelection={setRowSelection}
                                 columnLabels={columnLabelsTt}
                />
            </div>
        </>
    )
}