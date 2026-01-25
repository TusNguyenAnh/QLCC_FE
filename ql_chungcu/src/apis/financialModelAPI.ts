import request from "@/utils/request.ts";

export const createFinanceModelAPI = async (config: any) => {
  const res = await request.post("/financial/create", config);
  return res.data;
};