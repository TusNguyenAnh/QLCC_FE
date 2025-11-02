import {Button} from "@/components/ui/button"

import {Loader2, RotateCw} from 'lucide-react'
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
import {columnLabelsRes} from "@/utils/column-label.ts";
import type {fillItemBd} from "@/types/Building.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import type {Resident} from "@/types/Resident.ts";
import {ColumnsRes} from "@/layouts/columns/column-tb-res.tsx";
import {findByBuildingId, findByOrgId, updateResInOrg} from "@/apis/resAPI.ts";
import {toast} from "sonner";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Input} from "@/components/ui/input.tsx";
import {useDebounce} from "use-debounce";

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
    const [tabValue, setTabValue] = useState("resident") // mặc định tab đầu tiên
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword] = useDebounce(keyword, 500);

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
            if (tabValue === "resident") {
                // call api them thanh vien
                await updateResInOrg(Object.keys(data), orgId);
            } else {
                // call api xoa thanh vien
                await updateResInOrg(Object.keys(data), 'null');
            }
            toast.success(tabValue === "resident" ? "Thêm mới thành công!" : "Loại bỏ thành viên thành công!")
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setRowSelection({});
            setLoading(false);
        }
    }

    return (
        <>
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
                                {tabValue === "resident" ? "Thêm mới thành viên" : "Loại bỏ thành viên"}
                            </SheetTitle>
                            <SheetDescription>
                                {tabValue === "resident"
                                    ? "Thêm thành viên mới vào ban quản trị. Nhấn nút lưu để hoàn thành việc thêm mới."
                                    : "Loại bỏ thành viên khỏi ban quản trị. Nhấn nút lưu để hoàn thành việc cập nhật"}
                            </SheetDescription>
                        </SheetHeader>
                        <Tabs value={tabValue} onValueChange={setTabValue}>
                            <div className="m-4 flex flex-wrap items-center justify-between md:flex-row">
                                <TabsList>
                                    <TabsTrigger value="resident">Cư dân</TabsTrigger>
                                    <TabsTrigger value="member">Thành viên</TabsTrigger>
                                </TabsList>
                                <div className="flex items-center justify-end flex-1 gap-2">
                                    <Label>Thu gọn</Label>
                                    <Input type="text" placeholder="Nhập từ khóa tìm kiếm" value={keyword}
                                           onChange={e => setKeyword(e.target.value)} className="w-1/4"/>
                                    <RotateCw className="hover: cursor-pointer" onClick={() => setKeyword("")}/>
                                </div>
                            </div>
                            <TabsContent value="resident" className="p-4 mx-4 border border-gray-300 rounded-xl">
                                <DataTable<Resident, any> columns={ColumnsRes({handleUpdate, handleDelete})}
                                                          data={resident}
                                                          handleDelete={handleDelete}
                                                          columnLabels={columnLabelsRes}
                                                          keyword={debouncedKeyword}
                                                          rowSelection={rowSelection}
                                                          setRowSelection={setRowSelection}
                                />
                            </TabsContent>
                            <TabsContent value="member">
                                <div className="p-4 mx-4 border border-gray-300 rounded-xl">
                                    <DataTable<Resident, any> columns={ColumnsRes({handleUpdate, handleDelete})}
                                                              data={member}
                                                              handleDelete={handleDelete}
                                                              columnLabels={columnLabelsRes}
                                                              keyword={debouncedKeyword}
                                                              rowSelection={rowSelection}
                                                              setRowSelection={setRowSelection}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>


                        <SheetFooter className="mt-4 ">
                            <Button type="button"
                                    onClick={() => submitCreateOrDeleteMember(rowSelection, orgIdManage)}> Lưu
                                thay đổi</Button>
                            <SheetClose asChild>
                                <Button type="button" variant="outline" onClick={() => {
                                }}>Hủy</Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
