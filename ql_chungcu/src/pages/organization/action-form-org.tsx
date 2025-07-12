import {useEffect} from 'react'
import {useForm, Controller} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Combobox} from "@/components/ui/combobox.tsx";
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

import type {fillItemOrg} from "@/types/Organization.ts";

// Định nghĩa schema Zod
const schema = z.object({
    org_code: z.string().min(1, "Mã đơn vị không được để trống"),
    org_name: z.string().min(1, "Tên đơn vị không được để trống"),
    description: z.string().optional(),
    parent_org_id: z.string().optional(),
})

export type OrgFormSchema = z.infer<typeof schema>

type ComponentProps = {
    action: string
    formData: fillItemOrg // bạn có thể định nghĩa rõ ràng kiểu dữ liệu nếu muốn
    items: any[]
    onSubmit: (data: OrgFormSchema, orgId: string) => void
    open?: boolean;
    setOpen?: (open: boolean) => void;
    loading?: boolean;
}

export default function OrgForm({open, setOpen, loading, action, formData, items, onSubmit}: ComponentProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<OrgFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            org_code: formData?.org_code || "",
            org_name: formData?.org_name || "",
            description: formData?.description || "",
            parent_org_id: formData?.parent_org_id || "",
        },
    })

    useEffect(() => {
        if (formData) {
            reset({
                org_code: formData.org_code || "",
                org_name: formData.org_name || "",
                description: formData.description || "",
                parent_org_id: formData.parent_org_id || "",
            })
        }
    }, [formData, reset])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="sm:max-w-[425px] flex flex-col">
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                    </div>
                )}

                <form className="flex flex-col flex-1"
                      onSubmit={handleSubmit((data) => {
                          // Gửi ngược data + id lên cha
                          onSubmit(data, formData?.id)
                      })}>
                    <SheetHeader>
                        <SheetTitle>
                            {action === "CREATE" ? "Thêm mới đơn vị" : "Cập nhật thông tin đơn vị"}
                        </SheetTitle>
                        <SheetDescription>
                            {action === "CREATE"
                                ? "Nhập thông tin đơn vị mới. Nhấn nút lưu để hoàn thành việc thêm mới."
                                : "Cập nhật thông tin đơn vị. Nhấn nút lưu để hoàn thành việc cập nhật"}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="grid auto-rows-min px-4 h-[75vh] overflow-y-auto">
                        <div className="grid gap-4">
                            {/* Mã đơn vị */}
                            <div className="grid gap-3">
                                <Label htmlFor="org_code">Mã đơn vị</Label>
                                <Input id="org_code" {...register("org_code")} />
                                {errors.org_code &&
                                    <p className="text-sm text-red-500">{errors.org_code.message}</p>}
                            </div>

                            {/* Tên đơn vị */}
                            <div className="grid gap-3">
                                <Label htmlFor="org_name">Tên đơn vị</Label>
                                <Input id="org_name" {...register("org_name")} />
                                {errors.org_name &&
                                    <p className="text-sm text-red-500">{errors.org_name.message}</p>}
                            </div>

                            {/* Mô tả */}
                            <div className="grid gap-3">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input id="description" {...register("description")} />
                            </div>

                            {/* Combobox - Đơn vị cha */}
                            <div className="grid gap-3">
                                <Label htmlFor="parent_org_id">Thuộc</Label>
                                <Controller
                                    control={control}
                                    name="parent_org_id"
                                    render={({field}) => (
                                        <Combobox
                                            items={items}
                                            onChange={(value) => field.onChange(value)}
                                            itemUpdate={action === "UPDATE" ? formData.parent_org_id : ""}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="mt-4">
                        <Button type="submit">Lưu thay đổi</Button>
                        <SheetClose asChild>
                            <Button type="button" variant="outline" onClick={() => {
                            }}>Hủy</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>

        </Sheet>
    )
}
