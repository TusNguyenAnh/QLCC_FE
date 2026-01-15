export type Adjustment = {
  id: string;
  amount: string;
  reason: string;
  created_at: string;
};

export type AdjustmentListResponse = {
  message: string;
  data: Adjustment[];
};

export type CreateAdjustmentPayload = {
  amount: number;
  reason: string;
};
