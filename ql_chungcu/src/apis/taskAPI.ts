import request from "@/utils/request.ts";
import type {TaskReview} from "@/types/Task.ts";
import type {FilterReqFormSchema} from "@/pages/replies/request/filter-form-request.tsx";

export const getAllTaskByOrgAPI = async (orgId: string, taskStatus: number,filterTask: FilterReqFormSchema) => {
    const res = await request.post(`/task/findByOrgId/${taskStatus}/${orgId}`,filterTask);
    return res.data;
}

export const getTaskApprovedAPI = async (orgId: string, filterTask: FilterReqFormSchema) => {
    const res = await request.post(`/task/filterTaskApproved/${orgId}`, filterTask);
    return res.data;
}


export const getWfByTaskAPI = async (taskId: string) => {
    const res = await request.get(`/task/findWfByTaskId/${taskId}`);
    return res.data;
}
export const taskActionSummaryAPI = async () => {
    const res = await request.get("/task/taskActionSummary");
    return res.data;
}

export const approveTaskAPI = async (taskReview: TaskReview, taskId: string) => {
    const res = await request.post(`/task/approveTask/${taskId}`, taskReview);
    return res.data;
}
export const rejectTaskAPI = async (taskReview: TaskReview, taskId: string) => {
    const res = await request.post(`/task/rejectTask/${taskId}`, taskReview);
    return res.data;
}

