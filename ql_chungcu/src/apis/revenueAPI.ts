import request from "@/utils/request.ts";
import type {
  RevenueListResponse,
  RevenueFilters,
  GenerateMonthlyRevenueRequest,
  GenerateMonthlyRevenueResponse,
} from "@/types/Revenue.ts";

export const getRevenues = async (
  filters?: RevenueFilters
): Promise<RevenueListResponse> => {
  return request.post("/revenues/getRevenue", filters || {});
};

export const generateMonthlyRevenue = async (
  data: GenerateMonthlyRevenueRequest
): Promise<GenerateMonthlyRevenueResponse> => {
  return request.post("/revenues/generate-monthly", data);
};

export const createRevenueAPI = async (newRevenue) => {
    const res = await request.post('/revenues', newRevenue);
    return res.data;
}