import {useEffect} from 'react'
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
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
import type {fillItemBd} from "@/types/Building.ts";


// Định nghĩa schema Zod
const schema = z.object({
    building_name: z.string().min(1, "Tên tòa nhà không được để trống"),
    address: z.string().optional(),
    complex_id: z.string().optional(),
})

export type BdFormSchema = z.infer<typeof schema>

type ComponentProps = {
    action: string
    formData: fillItemBd // bạn có thể định nghĩa rõ ràng kiểu dữ liệu nếu muốn
    onSubmit: (data: BdFormSchema, bdId: string) => void
    open?: boolean;
    setOpen?: (open: boolean) => void;
    loading?: boolean;
}

export default function BdForm({open, setOpen, loading, action, formData, onSubmit}: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<BdFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            building_name: formData?.building_name || "",
            address: formData?.address || "",
        },
    })

    useEffect(() => {
        if (formData) {
            reset({
                building_name: formData?.building_name || "",
                address: formData?.address || "",
                complex_id: formData?.complex_id || "",
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
                            {action === "CREATE" ? "Thêm mới tòa nhà" : "Cập nhật thông tin tòa nhà"}
                        </SheetTitle>
                        <SheetDescription>
                            {action === "CREATE"
                                ? "Nhập thông tin tòa nhà mới. Nhấn nút lưu để hoàn thành việc thêm mới."
                                : "Cập nhật thông tin tòa nhà. Nhấn nút lưu để hoàn thành việc cập nhật"}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="grid auto-rows-min px-4 h-[75vh] overflow-y-auto">
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="building_name">Tên tòa nhà</Label>
                                <Input id="building_name" {...register("building_name")} />
                                {errors.building_name &&
                                    <p className="text-sm text-red-500">{errors.building_name.message}</p>}

                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="address">Địa chỉ</Label>
                                <Input id="address" {...register("address")} />
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
