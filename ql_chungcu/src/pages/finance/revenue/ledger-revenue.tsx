import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
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
import type { Revenue } from "@/types/Revenue.ts";

// Định nghĩa schema Zod
const schema = z.object({
  payment_method: z.string().min(1, "Vui lòng chọn phương thức thanh toán"),
  transaction_date: z.string().min(1, "Vui lòng chọn ngày giao dịch"),
  amount: z.string().min(1, "Vui lòng nhập số tiền"),
  description: z.string().optional(),
  // Bank info
  bank_transaction_id: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account: z.string().optional(),
  // Person info
  payer_name: z.string().min(1, "Vui lòng nhập tên người nộp"),
  receiver_name: z.string().min(1, "Vui lòng nhập tên người nhận"),
  contact_info: z.string().min(1, "Vui lòng nhập thông tin liên hệ"),
});

export type LedgerFormSchema = z.infer<typeof schema>;

type ComponentProps = {
  revenue: Revenue | null;
  buildings: any[];
  onSubmit: (data: LedgerFormSchema) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
};

export default function LedgerRevenue({
  open,
  setOpen,
  loading,
  revenue,
  buildings,
  onSubmit,
}: ComponentProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LedgerFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      payment_method: "cash",
      transaction_date: new Date().toISOString().split("T")[0],
      amount: "",
      description: "",
      bank_transaction_id: "",
      bank_name: "",
      bank_account: "",
      payer_name: "",
      receiver_name: "",
      contact_info: "",
    },
  });

  const paymentMethod = watch("payment_method");

  useEffect(() => {
    if (revenue) {
      reset({
        payment_method: "cash",
        transaction_date: new Date().toISOString().split("T")[0],
        amount: revenue.remaining.toString(),
        description: "",
        bank_transaction_id: "",
        bank_name: "",
        bank_account: "",
        payer_name: "",
        receiver_name: "",
        contact_info: "",
      });
    }
  }, [revenue, reset]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-[500px] flex flex-col">
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-1" />
            Đang xử lý...
          </div>
        )}

        <form
          className="flex flex-col flex-1 relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SheetHeader>
            <SheetTitle>Tạo ledger khoản thu</SheetTitle>
            <SheetDescription>
              Nhập thông tin ledger cho khoản thu {revenue?.description}
            </SheetDescription>
          </SheetHeader>

          <div className="grid auto-rows-min px-4 h-[75vh] overflow-y-auto">
            <div className="grid gap-4 py-4">
              {/* Payment Method and Amount - 1 row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Payment Method */}
                <div className="grid gap-2">
                  <Label htmlFor="payment_method">Phương thức *</Label>
                  <Select
                    onValueChange={(value) => setValue("payment_method", value)}
                    defaultValue="cash"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Tiền mặt</SelectItem>
                      <SelectItem value="bank_transfer">
                        Chuyển khoản
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_method && (
                    <p className="text-sm text-red-500">
                      {errors.payment_method.message}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="grid gap-2">
                  <Label htmlFor="amount">Số tiền *</Label>
                  <Input
                    id="amount"
                    type="number"
                    className="w-full"
                    {...register("amount")}
                    placeholder="VD: 1000000"
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Bank Info - Only show when payment_method = bank_transfer */}
              {paymentMethod === "bank_transfer" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="bank_name">Tên ngân hàng *</Label>
                    <Input
                      id="bank_name"
                      {...register("bank_name")}
                      placeholder="VD: Vietcombank"
                    />
                    {errors.bank_name && (
                      <p className="text-sm text-red-500">
                        {errors.bank_name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bank_account">Số tài khoản *</Label>
                    <Input
                      id="bank_account"
                      {...register("bank_account")}
                      placeholder="VD: 0123456789"
                    />
                    {errors.bank_account && (
                      <p className="text-sm text-red-500">
                        {errors.bank_account.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bank_transaction_id">Mã giao dịch</Label>
                    <Input
                      id="bank_transaction_id"
                      {...register("bank_transaction_id")}
                      placeholder="VD: FT12345678"
                    />
                  </div>
                </>
              )}

              {/* Transaction Date */}
              <div className="grid gap-2">
                <Label htmlFor="transaction_date">Ngày giao dịch *</Label>
                <Input
                  id="transaction_date"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("transaction_date")}
                />
                {errors.transaction_date && (
                  <p className="text-sm text-red-500">
                    {errors.transaction_date.message}
                  </p>
                )}
              </div>

              {/* Payer Name */}
              <div className="grid gap-2">
                <Label htmlFor="payer_name">Tên người nộp *</Label>
                <Input
                  id="payer_name"
                  {...register("payer_name")}
                  placeholder="VD: Nguyễn Văn A"
                />
                {errors.payer_name && (
                  <p className="text-sm text-red-500">
                    {errors.payer_name.message}
                  </p>
                )}
              </div>

              {/* Receiver Name */}
              <div className="grid gap-2">
                <Label htmlFor="receiver_name">Tên người nhận *</Label>
                <Input
                  id="receiver_name"
                  {...register("receiver_name")}
                  placeholder="VD: Trần Văn B"
                />
                {errors.receiver_name && (
                  <p className="text-sm text-red-500">
                    {errors.receiver_name.message}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid gap-2">
                <Label htmlFor="contact_info">Thông tin liên hệ *</Label>
                <Input
                  id="contact_info"
                  {...register("contact_info")}
                  placeholder="VD: 0900100600"
                />
                {errors.contact_info && (
                  <p className="text-sm text-red-500">
                    {errors.contact_info.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Nhập mô tả (tùy chọn)"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="px-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                "Tạo Ledger"
              )}
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
