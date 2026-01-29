import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Schema cho form tạo adjustment
const adjustmentFormSchema = z.object({
  amount: z.string().min(1, "Số tiền là bắt buộc"),
  reason: z.string().min(1, "Lý do điều chỉnh là bắt buộc"),
});

export type AdjustmentFormSchema = z.infer<typeof adjustmentFormSchema>;

interface ActionFormAdjustmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AdjustmentFormSchema) => void;
  loading?: boolean;
  ledgerInfo?: {
    voucher_number?: string;
    amount?: string;
    description?: string;
  } | null;
}

export default function ActionFormAdjustment({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
  ledgerInfo,
}: ActionFormAdjustmentProps) {
  const form = useForm<AdjustmentFormSchema>({
    resolver: zodResolver(adjustmentFormSchema),
    defaultValues: {
      amount: "",
      reason: "",
    },
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const handleSubmit = (data: AdjustmentFormSchema) => {
    // Loại bỏ dấu chấm trong amount trước khi submit
    const cleanedData = {
      ...data,
      amount: data.amount.replace(/\./g, ""),
    };
    onSubmit(cleanedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo điều chỉnh mới</DialogTitle>
        </DialogHeader>

        {/* Ledger Info */}
        {ledgerInfo && (
          <div className="bg-gray-50 p-3 rounded-lg space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Số chứng từ:</span>
              <span className="font-medium">{ledgerInfo.voucher_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số tiền gốc:</span>
              <span className="font-medium text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(parseFloat(ledgerInfo.amount || "0"))}
              </span>
            </div>
            {ledgerInfo.description && (
              <div className="flex justify-between">
                <span className="text-gray-600">Mô tả:</span>
                <span className="font-medium truncate max-w-[200px]">
                  {ledgerInfo.description}
                </span>
              </div>
            )}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số tiền điều chỉnh <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nhập số tiền (+ hoặc -)"
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\./g, "");
                        field.onChange(value);
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.replace(/\./g, "");
                        const numValue = parseInt(value) || 0;
                        field.onChange(numValue.toLocaleString("vi-VN"));
                      }}
                      disabled={loading}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Số dương (+) để tăng, số âm (-) để giảm. VD: -24.000 hoặc
                    50.000
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason Field */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lý do điều chỉnh <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập lý do điều chỉnh..."
                      rows={3}
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tạo điều chỉnh
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
