import {Button} from "@/components/ui/button"

import {Loader2} from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet.tsx";
import {DataTable} from "@/layouts/tables/data-table.tsx";
import {useEffect, useState} from "react";
import {columnLabelsOrg, columnLabelsRes} from "@/utils/column-label.ts";
import type {fillItemBd} from "@/types/Building.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import type {Resident} from "@/types/Resident.ts";
import {ColumnsRes} from "@/layouts/columns/column-tb-res.tsx";
import {findByBuildingId, findByOrgId, getAllResAPI} from "@/apis/resAPI.ts";
import type {OrgFormSchema} from "@/pages/organization/action-form-org.tsx";
import {createOrgAPI, getAllOrgAPI, updateOrgAPI} from "@/apis/orgAPI.ts";
import {toast} from "sonner";
import {handleAxiosStatusCode} from "@/utils/request.ts";

type ComponentProps = {
    action: string
    buildingIdManage: string[]
    orgIdManage: any;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}


export default function AddMemberOrg({open, setOpen, action, buildingIdManage, orgIdManage}: ComponentProps) {
    const [resident, setResident] = useState([]);
    const [member, setMember] = useState([]);

    const [rowSelection, setRowSelection] = useState({});
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState("account") // mặc định tab đầu tiên

    useEffect(() => {
        findByOrgId(orgIdManage).then(data => {
            setMember(data);
        })
    }, [orgIdManage, tabValue])

    useEffect(() => {
        findByBuildingId(buildingIdManage).then(data => {
            setResident(data);
        })
    }, [buildingIdManage, tabValue])


    const handleUpdate = (orgUpdate: fillItemBd): void => { // nhan tham so la thong tin hang can update
    }

    const handleDelete = async (listOrg: string[]): void => { // nhan tham so la thong tin hang can update
    }

    const submitCreateOrDeleteMember = async (data: any, orgId: string) => {
        setLoading(true);
        try {
            if (tabValue === "account") {
                // call api them thanh vien
                console.log(Object.keys(data));
                console.log(orgId);

            } else {
                // call api xoa thanh vien
                console.log(Object.keys(data));
                console.log(orgId);
            }
            toast.success(tabValue === "account" ? "Thêm mới thành công!" : "Loại bỏ thành viên thành công!")
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setRowSelection({});
            setLoading(false);
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="sm:max-w-9/12 flex flex-col">
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                    </div>
                )}

                <div className="flex flex-col flex-1">
                    <SheetHeader className="border-solid border-b border-gray-300">
                        <SheetTitle>
                            {tabValue === "account" ? "Thêm mới thành viên" : "Loại bỏ thành viên"}
                        </SheetTitle>
                        <SheetDescription>
                            {tabValue === "account"
                                ? "Thêm thành viên mới vào ban quản trị. Nhấn nút lưu để hoàn thành việc thêm mới."
                                : "Loại bỏ thành viên khỏi ban quản trị. Nhấn nút lưu để hoàn thành việc cập nhật"}
                        </SheetDescription>
                    </SheetHeader>
                    <Tabs value={tabValue} onValueChange={setTabValue}>
                        <TabsList className="m-4">
                            <TabsTrigger value="account">Cư dân</TabsTrigger>
                            <TabsTrigger value="password">Thành viên</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="p-4 mx-4 border border-gray-300 rounded-xl">
                            <DataTable<Resident, any> columns={ColumnsRes({handleUpdate, handleDelete})}
                                                      data={resident}
                                                      handleDelete={handleDelete}
                                                      columnLabels={columnLabelsRes}
                                                      keyword={""}
                                                      rowSelection={rowSelection}
                                                      setRowSelection={setRowSelection}
                            />
                        </TabsContent>
                        <TabsContent value="password">
                            <div className="p-4 mx-4 border border-gray-300 rounded-xl">
                                <DataTable<Resident, any> columns={ColumnsRes({handleUpdate, handleDelete})}
                                                          data={member}
                                                          handleDelete={handleDelete}
                                                          columnLabels={columnLabelsRes}
                                                          keyword={""}
                                                          rowSelection={rowSelection}
                                                          setRowSelection={setRowSelection}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>


                    <SheetFooter className="mt-4 ">
                        <Button type="button" onClick={() => submitCreateOrDeleteMember(rowSelection, orgIdManage)}> Lưu
                            thay đổi</Button>
                        <SheetClose asChild>
                            <Button type="button" variant="outline" onClick={() => {
                            }}>Hủy</Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>

        </Sheet>
    )
}
