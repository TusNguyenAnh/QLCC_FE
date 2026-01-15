import { useState, useEffect } from "react";
import { getAdjustmentsByReference } from "@/apis/adjustmentAPI.ts";
import type { Adjustment } from "@/types/Adjustment.ts";
import type { Ledger } from "@/types/Ledger.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge.tsx";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/common.ts";
import { toast } from "sonner";

interface AdjustmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ledger: Ledger | null;
}

export default function AdjustmentDialog({
  open,
  onOpenChange,
  ledger,
}: AdjustmentDialogProps) {
  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch adjustments when dialog opens and ledger changes
  useEffect(() => {
    if (open && ledger) {
      fetchAdjustments(ledger.id);
    }
  }, [open, ledger]);

  const fetchAdjustments = async (referenceId: string) => {
    try {
      setLoading(true);
      const response = await getAdjustmentsByReference(referenceId);
      setAdjustments(response.data);
    } catch (error) {
      console.error("Error fetching adjustments:", error);
      toast.error("Không thể tải danh sách adjustments");
      setAdjustments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Chi tiết Adjustments - {ledger?.voucher_number}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {ledger ? (
            <>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Số chứng từ</p>
                  <p className="font-semibold">{ledger.voucher_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày giao dịch</p>
                  <p className="font-semibold">
                    {new Date(ledger.transaction_date).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số tiền gốc</p>
                  <p className="font-semibold">
                    {formatCurrency(ledger.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số tiền thực</p>
                  <p className="font-semibold">
                    {formatCurrency(ledger.final_amount)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Mô tả</p>
                  <p className="font-semibold">{ledger.description}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Danh sách Adjustments</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">
                          STT
                        </th>
                        <th className="px-3 py-2 text-left font-semibold">
                          Loại điều chỉnh
                        </th>
                        <th className="px-3 py-2 text-right font-semibold">
                          Số tiền
                        </th>
                        <th className="px-3 py-2 text-left font-semibold">
                          Lý do
                        </th>
                        <th className="px-3 py-2 text-left font-semibold">
                          Ngày tạo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="px-3 py-8 text-center">
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                              <span>Đang tải...</span>
                            </div>
                          </td>
                        </tr>
                      ) : adjustments.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-3 py-8 text-center text-gray-500"
                          >
                            Chưa có dữ liệu adjustments
                          </td>
                        </tr>
                      ) : (
                        adjustments.map((adjustment, index) => (
                          <tr key={adjustment.id}>
                            <td className="px-3 py-2 text-sm">{index + 1}</td>
                            <td className="px-3 py-2 text-sm">
                              <Badge
                                className={
                                  parseFloat(adjustment.amount) >= 0
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }
                              >
                                {parseFloat(adjustment.amount) >= 0
                                  ? "Tăng"
                                  : "Giảm"}
                              </Badge>
                            </td>
                            <td
                              className={`px-3 py-2 text-sm text-right font-semibold ${
                                parseFloat(adjustment.amount) >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {parseFloat(adjustment.amount) >= 0 ? "+" : ""}
                              {formatCurrency(adjustment.amount)}
                            </td>
                            <td className="px-3 py-2 text-sm">
                              {adjustment.reason}
                            </td>
                            <td className="px-3 py-2 text-sm">
                              {new Date(adjustment.created_at).toLocaleString(
                                "vi-VN"
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Không có dữ liệu
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
