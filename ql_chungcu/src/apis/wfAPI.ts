import request from "@/utils/request.ts";
import type {WorkflowFormSchema} from "@/pages/business/action-form-workflow.tsx";

export const getAllWfAPI = async (complexId:string) => {
    const res = await request.get(`/wf/${complexId}`);
    return res.data;
}

export const createWfAPI = async (newWf: WorkflowFormSchema) => {
    const res = await request.post('/wf/create', newWf);
    return res.data;
}

