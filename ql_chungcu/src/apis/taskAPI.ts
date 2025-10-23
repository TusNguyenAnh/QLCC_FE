import request from "@/utils/request.ts";
import type {TaskReview} from "@/types/Task.ts";

export const getAllTaskByOrgAPI = async (orgId: string, taskStatus: number) => {
    const res = await request.get(`/task/findByOrgId/${taskStatus}/${orgId}`);
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

