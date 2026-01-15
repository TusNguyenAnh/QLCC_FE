import request from "@/utils/request.ts";
import type { TaskReview, Task } from "@/types/Task.ts";
import type { FilterReqFormSchema } from "@/pages/replies/request/filter-form-request.tsx";
import type { PaginatedResponse } from "@/types/Pagination.ts";
import type { ExpenseFormSchema } from "@/pages/finance/expense/action-form-expense.tsx";

export const getAllTaskByOrgAPI = async (
  orgId: string,
  taskStatus: number,
  filterTask: FilterReqFormSchema,
  page = 1,
  perPage = 50
): Promise<PaginatedResponse<Task>> => {
  // Trả về toàn bộ response với message, data, meta, links
  return await request.post(
    `/task/findByOrgId/${taskStatus}/${orgId}?page=${page}&perPage=${perPage}`,
    filterTask
  );
};

export const getTaskApprovedAPI = async (
  orgId: string,
  filterTask: FilterReqFormSchema,
  page = 1,
  perPage = 50
): Promise<PaginatedResponse<Task>> => {
  // Trả về toàn bộ response với message, data, meta, links
  return await request.post(
    `/task/filterTaskApproved/${orgId}?page=${page}&perPage=${perPage}`,
    filterTask
  );
};

export const getWfByTaskAPI = async (taskId: string) => {
  const res = await request.get(`/task/findWfByTaskId/${taskId}`);
  return res.data;
};
export const taskActionSummaryAPI = async () => {
  const res = await request.get("/task/taskActionSummary");
  return res.data;
};

export const approveTaskAPI = async (
  taskReview: TaskReview,
  taskId: string
) => {
  const res = await request.post(`/task/approveTask/${taskId}`, taskReview);
  return res.data;
};
export const rejectTaskAPI = async (taskReview: TaskReview, taskId: string) => {
  const res = await request.post(`/task/rejectTask/${taskId}`, taskReview);
  return res.data;
};

export const createTaskAPI = async (formData: FormData | ExpenseFormSchema) => {
  const res = await request.post("/task/create", formData, {
    headers:
      formData instanceof FormData
        ? {
            "Content-Type": "multipart/form-data",
          }
        : undefined,
  });
  return res.data;
};
