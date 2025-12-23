import {useContext, useEffect} from 'react'
import {useForm, Controller, useFieldArray} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Combobox} from "@/components/ui/combobox.tsx";
import {Loader2, Plus, Trash2} from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet.tsx";
import type {fillItemWf} from "@/types/Workflow.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {AuthContext} from "@/context/AuthContext.tsx";


// Định nghĩa schema Zod
const schema = z.object({
    workflow_name: z.string().min(1, "Tên quy trình không được để trống"),
    description: z.string().optional(),
    status: z.number().optional(),
    workflow_step: z.array(
        z.object({
            org_level: z.number().optional(),
            step_order: z.number().optional(),
            description: z.string().optional(),
            status: z.number().optional()
        })
    ).optional()
})

export type WorkflowFormSchema = z.infer<typeof schema>

type ComponentProps = {
    action: string
    formData: fillItemWf // bạn có thể định nghĩa rõ ràng kiểu dữ liệu nếu muốn
    itemsOrg: any[]
    onSubmit: (data: WorkflowFormSchema, wfId: string) => void
    open?: boolean;
    setOpen?: (open: boolean) => void;
    loading?: boolean;
}

export default function WorkflowForm({
                                         open,
                                         setOpen,
                                         loading,
                                         action,
                                         formData,
                                         itemsOrg,
                                         onSubmit
                                     }: ComponentProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        getValues,
        formState: {errors},
    } = useForm<WorkflowFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            workflow_name: formData?.workflow_name || "",
            description: formData?.description || "",
            status: formData?.status || 0,
            workflow_step: formData?.workflow_step?.length
                ? formData.workflow_step.map(step => ({
                    org_level: step.org_level || 1,
                    step_order: step.step_order || 1,
                    description: step.description || "",
                    status: step.status || 0,
                }))
                : [
                    {
                        org_level: 1,
                        step_order: 1,
                        description: "",
                        status: 0,
                    },
                ]
        },
    })

    const {complex} = useContext(AuthContext);

    useEffect(() => {
        if (formData) {
            reset({
                workflow_name: formData?.workflow_name || "",
                description: formData?.description || "",
                status: formData?.status || 0,
                workflow_step: formData?.workflow_step?.length
                    ? formData.workflow_step.map(step => ({
                        org_id: step.org_level || "",
                        step_order: step.step_order || 1,
                        description: step.description || "",
                        status: step.status || 0,
                    }))
                    : [
                        {
                            org_id: "",
                            step_order: 1,
                            description: "",
                            status: 0,
                        },
                    ],
            })
        }
    }, [formData, reset])

    const {fields, append, remove, replace} = useFieldArray({
        control,
        name: "workflow_step"
    });


    const onAdd = () => {
        append({org_level: 1, step_order: fields.length + 1, description: "", status: 0});
        console.log(itemsOrg);
    }

    const onRemove = (index: number) => {
        remove(index);
        // reset step_order sau remove:
        console.log(getValues("workflow_step"))
        const newArr = (getValues("workflow_step") ?? []).map((s, i) => ({...s, step_order: i + 1}));
        console.log(newArr);
        replace(newArr);
    }


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="sm:max-w-[625px] flex flex-col">
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                    </div>
                )}

                <form className="flex flex-col flex-1 relative"
                      onSubmit={handleSubmit((data) => {
                          // Gửi ngược data + id lên cha
                          const payload = {
                              ...data,
                              complex_id: complex
                          };

                          onSubmit(payload, formData?.id)
                      })}>
                    <SheetHeader>
                        <SheetTitle>
                            {action === "CREATE" ? "Tạo quy trình mới" : "Chỉnh sửa quy trình"}
                        </SheetTitle>
                        <SheetDescription>
                            Cấu hình các cấp xét duyệt và điều kiện áp dụng.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="grid auto-rows-min px-4 h-[75vh] overflow-y-auto">
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <div className="flex justify-between">
                                    <Label htmlFor="workflow_name">Tên quy trình</Label>
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({field}) => (
                                                <Switch
                                                    id="status"
                                                    checked={field.value == 0} // convert 0/1 sang boolean
                                                    onCheckedChange={(checked) => field.onChange(checked ? 0 : 1)} // convert boolean -> 1/0
                                                />
                                            )}
                                        />
                                        <Label htmlFor="status">Kích hoạt quy trình</Label>
                                    </div>
                                </div>
                                <Input
                                    id="workflow_name" {...register("workflow_name", {
                                    setValueAs: (value) => value?.trim()})}
                                />
                                {errors.workflow_name &&
                                    <p className="text-sm text-red-500">{errors.workflow_name.message}</p>}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input id="description" {...register("description", {
                                    setValueAs: (value) => value?.trim()})} />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Bước xét duyệt</Label>
                                <Button size="sm" variant="outline" onClick={onAdd} type="button">
                                    <Plus className="h-4 w-4"/>
                                    Thêm bước
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="font-medium">Bước {index + 1}</h5>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline"
                                                    onClick={() => onRemove(index)}>
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="mb-2">Cấp ban xét duyệt</Label>
                                            <Controller
                                                control={control}
                                                name={`workflow_step.${index}.org_level`}
                                                render={({field}) => (
                                                    <Combobox
                                                        items={itemsOrg}
                                                        onChange={(value) => field.onChange(value)}
                                                        // itemUpdate={action === "UPDATE" ? formData.building_id : ""}
                                                    />
                                                )}
                                            />

                                        </div>
                                        <div>
                                            <Label className="mb-2">Mô tả</Label>
                                            <Textarea
                                                {...register(`workflow_step.${index}.description`, {
                                                    setValueAs: (value) => value?.trim()})}
                                                defaultValue={field.description}
                                                placeholder="Mô tả"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <SheetFooter className="mt-4 absolute bottom-1 w-full">
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
