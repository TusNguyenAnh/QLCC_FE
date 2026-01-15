import request from "@/utils/request.ts";
import type { LedgerFilters, LedgerListResponse } from "@/types/Ledger.ts";

export interface CreateLedgerRequest {
  building_id: string;
  fund_type: string;
  payment_method: string;
  transaction_date: string;
  amount: string | number;
  description?: string;
  // Bank info (required when payment_method = bank_transfer)
  bank_transaction_id?: string;
  bank_name?: string;
  bank_account?: string;
  // Person info
  payer_name: string;
  receiver_name: string;
  contact_info: string;
}

export interface CreateLedgerResponse {
  message: string;
  data?: any;
}

export const createLedgerFromRevenue = async (
  revenueId: string,
  data: CreateLedgerRequest
): Promise<CreateLedgerResponse> => {
  return request.post(`/ledgers/storeRevenue/${revenueId}`, data);
};

export const createLedgerFromExpense = async (
    expenseId: string,
    data: CreateLedgerRequest
): Promise<CreateLedgerResponse> => {
    return request.post(`/ledgers/storeExpense/${expenseId}`, data);
};

export const getLedger = async (
  filters: LedgerFilters
): Promise<LedgerListResponse> => {
  const response = await request({
    url: "/ledgers/getLedger",
    method: "POST",
    data: filters,
    params: {
      page: filters.page || 1,
    },
  });
  return response;
};
