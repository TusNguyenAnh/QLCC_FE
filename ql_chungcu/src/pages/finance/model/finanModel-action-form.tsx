import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2, Calculator, Info } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox.tsx";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { fillItemFinancialModel } from "@/types/FinancialModel.ts";

// Schema cho từng khoản mục trong mô hình tài chính
const financialItemSchema = z.object({
  item_name: z.string().min(1, "Tên khoản mục không được để trống"),
  item_code: z.string().min(1, "Mã khoản mục không được để trống"),
  item_type: z.enum(["revenue", "expense"], {
    required_error: "Vui lòng chọn loại khoản mục",
  }),
  calculation_method: z.enum(["fixed", "area_based", "percentage", "custom"], {
    required_error: "Vui lòng chọn phương thức tính",
  }),
  base_amount: z.number().min(0, "Số tiền phải lớn hơn hoặc bằng 0"),
  unit: z.string().optional(),
  apply_to: z.enum(["all", "specific"]).default("all"),
  is_mandatory: z.boolean().default(true),
  description: z.string().optional(),
  formula: z.string().optional(),
  priority: z.number().min(1).default(1),
});

// Schema chính cho form mô hình tài chính
const schema = z.object({
  model_name: z.string().min(1, "Tên mô hình không được để trống"),
  model_code: z.string().min(1, "Mã mô hình không được để trống"),
  description: z.string().optional(),
  building_id: z.string().optional(),
  model_type: z.enum(["revenue", "expense", "mixed"], {
    required_error: "Vui lòng chọn loại mô hình",
  }),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
  items: z.array(financialItemSchema).min(1, "Phải có ít nhất 1 khoản mục"),
});

export type FinancialModelFormSchema = z.infer<typeof schema>;

type ComponentProps = {
  action: string;
  formData?: fillItemFinancialModel;
  itemsBd: any[];
  onSubmit: (data: FinancialModelFormSchema, modelId?: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
};

export default function FinancialModelForm({
  open,
  setOpen,
  loading,
  action,
  formData,
  itemsBd,
  onSubmit,
}: ComponentProps) {
  const [selectedModelType, setSelectedModelType] = useState<string>(
    formData?.model_type || "mixed"
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FinancialModelFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      model_name: formData?.model_name || "",
      model_code: formData?.model_code || "",
      description: formData?.description || "",
      building_id: formData?.building_id || "",
      model_type: formData?.model_type || "mixed",
      status: formData?.status || "draft",
      items: formData?.items || [
        {
          item_name: "",
          item_code: "",
          item_type: "revenue",
          calculation_method: "fixed",
          base_amount: 0,
          unit: "VND",
          apply_to: "all",
          is_mandatory: true,
          description: "",
          priority: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchModelType = watch("model_type");

  useEffect(() => {
    if (formData) {
      reset({
        model_name: formData.model_name || "",
        model_code: formData.model_code || "",
        description: formData.description || "",
        building_id: formData.building_id || "",
        model_type: formData.model_type || "mixed",
        status: formData.status || "draft",
        items: formData.items || [
          {
            item_name: "",
            item_code: "",
            item_type: "revenue",
            calculation_method: "fixed",
            base_amount: 0,
            unit: "VND",
            apply_to: "all",
            is_mandatory: true,
            description: "",
            priority: 1,
          },
        ],
      });
      setSelectedModelType(formData.model_type || "mixed");
    }
  }, [formData, reset]);

  useEffect(() => {
    setSelectedModelType(watchModelType);
  }, [watchModelType]);

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "bg-green-100 text-green-800";
      case "expense":
        return "bg-red-100 text-red-800";
      case "mixed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getItemTypeColor = (type: string) => {
    return type === "revenue"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  };

  const getCalculationMethodLabel = (method: string) => {
    const labels = {
      fixed: "Cố định",
      area_based: "Theo diện tích",
      percentage: "Theo phần trăm",
      custom: "Tùy chỉnh",
    };
    return labels[method as keyof typeof labels] || method;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-[800px] flex flex-col p-0">
        {loading && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Đang xử lý...</p>
            </div>
          </div>
        )}

        <form
          className="flex flex-col h-full"
          onSubmit={handleSubmit((data) => {
            onSubmit(data, formData?.id);
          })}
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5 text-blue-600" />
              {action === "CREATE"
                ? "Tạo mô hình tài chính mới"
                : "Cập nhật mô hình tài chính"}
            </SheetTitle>
            <SheetDescription className="text-sm">
              {action === "CREATE"
                ? "Định nghĩa các khoản thu, chi và phương thức tính toán cho mô hình tài chính."
                : "Chỉnh sửa thông tin và các khoản mục của mô hình tài chính."}
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    Thông tin cơ bản
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Thông tin chung về mô hình tài chính
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Model Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="model_name"
                        className="text-sm font-medium"
                      >
                        Tên mô hình <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="model_name"
                        placeholder="VD: Mô hình thu phí dịch vụ"
                        {...register("model_name", {
                          setValueAs: (value) => value?.trim(),
                        })}
                        className={errors.model_name ? "border-red-500" : ""}
                      />
                      {errors.model_name && (
                        <p className="text-xs text-red-500">
                          {errors.model_name.message}
                        </p>
                      )}
                    </div>

                    {/* Model Code */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="model_code"
                        className="text-sm font-medium"
                      >
                        Mã mô hình <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="model_code"
                        placeholder="VD: FM_2024_001"
                        {...register("model_code", {
                          setValueAs: (value) => value?.trim()?.toUpperCase(),
                        })}
                        className={errors.model_code ? "border-red-500" : ""}
                      />
                      {errors.model_code && (
                        <p className="text-xs text-red-500">
                          {errors.model_code.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Model Type */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="model_type"
                        className="text-sm font-medium"
                      >
                        Loại mô hình <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="model_type"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className={
                                errors.model_type ? "border-red-500" : ""
                              }
                            >
                              <SelectValue placeholder="Chọn loại mô hình" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="revenue">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  Mô hình thu
                                </div>
                              </SelectItem>
                              <SelectItem value="expense">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-red-500" />
                                  Mô hình chi
                                </div>
                              </SelectItem>
                              <SelectItem value="mixed">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                                  Mô hình hỗn hợp
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.model_type && (
                        <p className="text-xs text-red-500">
                          {errors.model_type.message}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">
                        Trạng thái
                      </Label>
                      <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">
                                <Badge variant="outline">Bản nháp</Badge>
                              </SelectItem>
                              <SelectItem value="active">
                                <Badge className="bg-green-500">
                                  Đang áp dụng
                                </Badge>
                              </SelectItem>
                              <SelectItem value="inactive">
                                <Badge variant="destructive">
                                  Ngừng áp dụng
                                </Badge>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Building */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="building_id"
                      className="text-sm font-medium"
                    >
                      Áp dụng cho tòa nhà
                    </Label>
                    <Controller
                      control={control}
                      name="building_id"
                      render={({ field }) => (
                        <Combobox
                          items={itemsBd}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          itemUpdate={formData?.building_id || ""}
                        />
                      )}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Mô tả
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về mô hình tài chính..."
                      rows={3}
                      {...register("description", {
                        setValueAs: (value) => value?.trim(),
                      })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Financial Items Section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        Các khoản mục
                        <Badge className={getModelTypeColor(selectedModelType)}>
                          {selectedModelType === "revenue"
                            ? "Thu"
                            : selectedModelType === "expense"
                            ? "Chi"
                            : "Hỗn hợp"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Định nghĩa các khoản thu, chi trong mô hình
                      </CardDescription>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        append({
                          item_name: "",
                          item_code: "",
                          item_type:
                            selectedModelType === "mixed"
                              ? "revenue"
                              : (selectedModelType as "revenue" | "expense"),
                          calculation_method: "fixed",
                          base_amount: 0,
                          unit: "VND",
                          apply_to: "all",
                          is_mandatory: true,
                          description: "",
                          priority: fields.length + 1,
                        })
                      }
                      className="gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Thêm khoản mục
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field, index) => (
                    <Card
                      key={field.id}
                      className={`border-2 ${getItemTypeColor(
                        watch(`items.${index}.item_type`)
                      )}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            Khoản mục #{index + 1}
                            <Badge
                              variant={
                                watch(`items.${index}.item_type`) === "revenue"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {watch(`items.${index}.item_type`) === "revenue"
                                ? "Thu"
                                : "Chi"}
                            </Badge>
                          </CardTitle>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => remove(index)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {/* Item Name */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Tên khoản mục{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              placeholder="VD: Phí quản lý"
                              {...register(`items.${index}.item_name`, {
                                setValueAs: (value) => value?.trim(),
                              })}
                              className={
                                errors.items?.[index]?.item_name
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.items?.[index]?.item_name && (
                              <p className="text-xs text-red-500">
                                {errors.items[index]?.item_name?.message}
                              </p>
                            )}
                          </div>

                          {/* Item Code */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Mã khoản mục{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              placeholder="VD: PHI_QL"
                              {...register(`items.${index}.item_code`, {
                                setValueAs: (value) =>
                                  value?.trim()?.toUpperCase(),
                              })}
                              className={
                                errors.items?.[index]?.item_code
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.items?.[index]?.item_code && (
                              <p className="text-xs text-red-500">
                                {errors.items[index]?.item_code?.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {/* Item Type */}
                          {selectedModelType === "mixed" && (
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">
                                Loại <span className="text-red-500">*</span>
                              </Label>
                              <Controller
                                control={control}
                                name={`items.${index}.item_type`}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="h-9">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="revenue">
                                        Thu
                                      </SelectItem>
                                      <SelectItem value="expense">
                                        Chi
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          )}

                          {/* Calculation Method */}
                          <div
                            className={`space-y-1 ${
                              selectedModelType === "mixed" ? "" : "col-span-1"
                            }`}
                          >
                            <Label className="text-xs font-medium flex items-center gap-1">
                              Phương thức tính
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3 w-3 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-xs">
                                      <strong>Cố định:</strong> Số tiền cố định
                                      <br />
                                      <strong>Theo diện tích:</strong> Tính theo
                                      m²
                                      <br />
                                      <strong>Theo %:</strong> Phần trăm của giá
                                      trị
                                      <br />
                                      <strong>Tùy chỉnh:</strong> Công thức
                                      riêng
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            <Controller
                              control={control}
                              name={`items.${index}.calculation_method`}
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="fixed">
                                      Cố định
                                    </SelectItem>
                                    <SelectItem value="area_based">
                                      Theo diện tích
                                    </SelectItem>
                                    <SelectItem value="percentage">
                                      Theo phần trăm
                                    </SelectItem>
                                    <SelectItem value="custom">
                                      Tùy chỉnh
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>

                          {/* Base Amount */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Giá trị cơ bản
                            </Label>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0"
                              {...register(`items.${index}.base_amount`, {
                                valueAsNumber: true,
                              })}
                              className="h-9"
                            />
                          </div>

                          {/* Unit */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Đơn vị
                            </Label>
                            <Input
                              placeholder="VND, m², %..."
                              {...register(`items.${index}.unit`)}
                              className="h-9"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {/* Priority */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Thứ tự ưu tiên
                            </Label>
                            <Input
                              type="number"
                              min="1"
                              {...register(`items.${index}.priority`, {
                                valueAsNumber: true,
                              })}
                              className="h-9"
                            />
                          </div>

                          {/* Apply To */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Áp dụng cho
                            </Label>
                            <Controller
                              control={control}
                              name={`items.${index}.apply_to`}
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">Tất cả</SelectItem>
                                    <SelectItem value="specific">
                                      Chọn lọc
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>

                          {/* Mandatory */}
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Bắt buộc
                            </Label>
                            <Controller
                              control={control}
                              name={`items.${index}.is_mandatory`}
                              render={({ field }) => (
                                <div className="flex items-center h-9 px-3 border rounded-md">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span className="ml-2 text-xs">
                                    {field.value ? "Có" : "Không"}
                                  </span>
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        {/* Custom Formula */}
                        {watch(`items.${index}.calculation_method`) ===
                          "custom" && (
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">
                              Công thức tính
                            </Label>
                            <Textarea
                              placeholder="VD: (base_amount * area) + additional_fee"
                              rows={2}
                              {...register(`items.${index}.formula`)}
                              className="text-xs font-mono"
                            />
                          </div>
                        )}

                        {/* Description */}
                        <div className="space-y-1">
                          <Label className="text-xs font-medium">
                            Mô tả khoản mục
                          </Label>
                          <Textarea
                            placeholder="Mô tả chi tiết về khoản mục này..."
                            rows={2}
                            {...register(`items.${index}.description`)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {errors.items && (
                    <p className="text-xs text-red-500 text-center">
                      {typeof errors.items === "object" &&
                      "message" in errors.items
                        ? String(errors.items.message)
                        : "Vui lòng kiểm tra lại các khoản mục"}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t bg-gray-50 gap-2">
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="flex-1"
              >
                Hủy
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action === "CREATE" ? "Tạo mô hình" : "Cập nhật"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
