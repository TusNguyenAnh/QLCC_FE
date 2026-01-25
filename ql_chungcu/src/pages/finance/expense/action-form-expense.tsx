import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Loader2} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet.tsx";
import {Combobox} from "@/components/ui/combobox.tsx";

// Định nghĩa schema Zod
const schema = z.object({
    task_name: z.string().min(1, "Tên khoản chi không được để trống"),
    description: z.string().optional(),
    category: z.string().optional(),
    tasktype_id: z.string().optional(),
    building_id: z.array(z.string()).optional(),
    original_amount: z.number().optional(),
    vendor: z.string().optional(),
    files: z.any().optional(),
    expense_type: z.number().optional(),

});

export type ExpenseFormSchema = z.infer<typeof schema>;

type ComponentProps = {
    // formData: fillItemBd // bạn có thể định nghĩa rõ ràng kiểu dữ liệu nếu muốn
    onSubmit: (data: ExpenseFormSchema) => void;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    loading?: boolean;
    itemsBd: any[];
    itemsTt: any[];
    itemsCategory: any[];
};

export default function ExpenseForm({
                                        open,
                                        setOpen,
                                        loading,
                                        onSubmit,
                                        itemsTt,
                                        itemsBd,
                                        itemsCategory,
                                    }: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<ExpenseFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            task_name: "",
            description: "",
            tasktype_id: "",
            building_id: [],
            category: "",
            original_amount: 1,
            vendor: "",
            files: undefined,
        },
    });

    useEffect(() => {
        reset({
            task_name: "",
            description: "",
            tasktype_id: "",
            building_id: [],
            category: "",
            original_amount: 1,
            vendor: "",
            files: undefined,
        });
    }, [reset]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="sm:max-w-[425px] flex flex-col">
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>
                        Loading...
                    </div>
                )}

                <form
                    className="flex flex-col flex-1 relative"
                    onSubmit={handleSubmit((data) => {
                        // Gửi ngược data + id lên cha
                        const allIds = itemsBd
                            .filter((item) => item.value !== "ALL")
                            .map((item) => item.value);

                        if (data.building_id?.includes("ALL")) {
                            data.building_id = allIds;
                            // xu ly tao khoan chi toan khu
                            data.expense_type = 0;
                        } else {
                            // xu ly tao khoan chi noi bo toa
                            data.expense_type = 1;
                        }
                        onSubmit(data);
                    })}
                >
                    <SheetHeader>
                        <SheetTitle>Thêm mới đề xuất khoản chi</SheetTitle>
                        <SheetDescription>
                            Nhập thông tin đề xuất khoản chi mới. Nhấn nút lưu để hoàn thành
                            việc thêm mới.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="grid auto-rows-min px-4 h-[70vh] overflow-y-auto">
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="task_name">Tên đề xuất</Label>
                                <Input
                                    id="task_name"
                                    {...register("task_name", {
                                        setValueAs: (value) => value?.trim(),
                                    })}
                                />
                                {errors.task_name && (
                                    <p className="text-sm text-red-500">
                                        {errors.task_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input
                                    id="description"
                                    {...register("description", {
                                        setValueAs: (value) => value?.trim(),
                                    })}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="category">Danh mục</Label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({field}) => (
                                        <Combobox
                                            items={itemsCategory}
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            itemUpdate={""}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="vendor">Nhà cung cấp</Label>
                                <Input
                                    id="vendor"
                                    {...register("vendor", {
                                        setValueAs: (value) => value?.trim(),
                                    })}
                                />
                                {errors.vendor && (
                                    <p className="text-sm text-red-500">
                                        {errors.vendor.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="original_amount">Số tiền</Label>
                                <Input
                                    id="original_amount"
                                    {...register("original_amount", {valueAsNumber: true})}
                                    type="number"
                                    min="1"
                                    step="0.01"
                                />

                                {errors.original_amount && (
                                    <p className="text-sm text-red-500">
                                        {errors.original_amount.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="building_id">Tòa nhà</Label>
                                <Controller
                                    control={control}
                                    name="building_id"
                                    render={({field}) => (
                                        <Combobox
                                            items={itemsBd}
                                            onChange={(value) => {
                                                field.onChange([value]);
                                            }}
                                            itemUpdate={""}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="tasktype_id">Loại đề xuất</Label>
                                <Controller
                                    control={control}
                                    name="tasktype_id"
                                    render={({field}) => (
                                        <Combobox
                                            items={itemsTt}
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            itemUpdate={""}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="files">Tệp đính kèm</Label>
                                <Input
                                    id="files"
                                    type="file"
                                    multiple
                                    {...register("files")}
                                    className="cursor-pointer"
                                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                />
                                {errors.files && (
                                    <p className="text-sm text-red-500">
                                        {errors.files.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="mt-4 absolute bottom-1 w-full">
                        <Button type="submit">Lưu thay đổi</Button>
                        <SheetClose asChild>
                            <Button type="button" variant="outline" onClick={() => {
                            }}>
                                Hủy
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
