import request from "@/utils/request.ts";
import type {
  AdjustmentListResponse,
  CreateAdjustmentPayload,
} from "@/types/Adjustment.ts";

export const getAdjustmentsByReference = async (
  referenceId: string
): Promise<AdjustmentListResponse> => {
  return request.get(`/adjustments/reference/${referenceId}`);
};

export const createAdjustment = async (
  ledgerId: string,
  payload: CreateAdjustmentPayload
): Promise<{ message: string; data: any }> => {
  return request.post(`/adjustments/create/${ledgerId}`, payload);
};
