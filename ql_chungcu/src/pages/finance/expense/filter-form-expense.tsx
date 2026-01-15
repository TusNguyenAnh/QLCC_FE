import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {X} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {getAllBdAPI} from "@/apis/bdAPI.ts";
import {AuthContext} from "@/context/AuthContext.tsx";

const filterSchema = z.object({
    category: z.string().optional(),
    status: z.string().optional(),
    proposed_from: z.string().optional(),
    proposed_to: z.string().optional(),
    approved: z.string().optional(),
    building_id: z.string().optional(),
});

export type FilterExpenseSchema = z.infer<typeof filterSchema>;

interface FilterExpenseFormProps {
    onSubmit: (filters: FilterExpenseSchema) => void;
    onReset?: () => void;
    buildings?: any[];
}

export function FilterExpenseForm({
                                      onSubmit,
                                      onReset,
                                      buildings = [],
                                  }: FilterExpenseFormProps) {
    const form = useForm<FilterExpenseSchema>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            category: "all",
            status: "all",
            proposed_from: "",
            proposed_to: "",
            approved: "all",
            building_id: "all",
        },
    });

    const handleReset = () => {
        form.reset({
            category: "all",
            status: "all",
            proposed_from: "",
            proposed_to: "",
            approved: "all",
            building_id: "all",
        });
        if (onReset) {
            onReset();
        }
    };

    const selectedCategory = form.watch("category");
    const selectedStatus = form.watch("status");
    const selectedApproved = form.watch("approved");
    const selectedBuildingId = form.watch("building_id");
    const proposedFrom = form.watch("proposed_from");
    const proposedTo = form.watch("proposed_to");

    const hasActiveFilters =
        (selectedCategory && selectedCategory !== "all") ||
        (selectedStatus && selectedStatus !== "all") ||
        (selectedApproved && selectedApproved !== "all") ||
        (selectedBuildingId && selectedBuildingId !== "all") ||
        proposedFrom ||
        proposedTo;

    const {financeModel} = useContext(AuthContext);

    return (
        <Card className="mb-2 border-slate-200 bg-white shadow-sm">
            <CardContent className="p-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-end gap-1.5">
                            {/* Building Select */}
                            {financeModel == 'decentralized'
                            &&
                                (<FormField
                                control={form.control}
                                name="building_id"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Tòa nhà
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl className='w-full'>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue placeholder="Chọn tòa nhà"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="all">Tất cả</SelectItem>
                                                {buildings.map((building) => (
                                                    <SelectItem
                                                        key={building.id}
                                                        value={String(building.id)}
                                                    >
                                                        {building.building_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />)}

                            {/* Category Select */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Danh mục
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl className='w-full'>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue placeholder="Chọn danh mục"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="all">Tất cả</SelectItem>
                                                <SelectItem value="service">Dịch vụ</SelectItem>
                                                <SelectItem value="maintenance">Bảo trì</SelectItem>
                                                <SelectItem value="utilities">Tiện ích</SelectItem>
                                                <SelectItem value="other">Khác</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Status Select */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Trạng thái
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl className='w-full'>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue placeholder="Chọn trạng thái"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="all">Tất cả</SelectItem>
                                                <SelectItem value="paid">Đã thanh toán</SelectItem>
                                                <SelectItem value="partial">
                                                    Thanh toán một phần
                                                </SelectItem>
                                                <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Approved Select */}
                            <FormField
                                control={form.control}
                                name="approved"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Phê duyệt
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl className='w-full'>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue placeholder="Chọn"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="all">Tất cả</SelectItem>
                                                <SelectItem value="1">Đã phê duyệt</SelectItem>
                                                <SelectItem value="0">Chưa phê duyệt</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            {/* Proposed From Date */}
                            <FormField
                                control={form.control}
                                name="proposed_from"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Từ ngày
                                        </FormLabel>
                                        <FormControl className='w-full'>
                                            <Input type="date" className="h-8 text-xs" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Proposed To Date */}
                            <FormField
                                control={form.control}
                                name="proposed_to"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-[12px] font-medium text-gray-700">
                                            Đến ngày
                                        </FormLabel>
                                        <FormControl className='w-full'>
                                            <Input type="date" className="h-8 text-xs" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Action Buttons */}
                            <div className="flex gap-1.5 ml-auto">
                                {hasActiveFilters && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleReset}
                                        className="h-8 px-2 text-xs"
                                    >
                                        <X className="mr-1 h-3 w-3"/>
                                        Xóa
                                    </Button>
                                )}
                                <Button type="submit" size="sm" className="h-8 px-3 text-xs">
                                    Áp dụng
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
