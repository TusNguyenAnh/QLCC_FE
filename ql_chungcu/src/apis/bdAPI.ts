import request from "@/utils/request.ts";
import type {BdFormSchema} from "@/pages/building/action-form-bd.tsx";

export const getAllBdAPI = async () => {
    const res = await request.get('/bd');
    return res.data;
}

export const createBdAPI = async (newBd: BdFormSchema) => {
    const res = await request.post('/bd/create', newBd);
    return res.data;
}

export const updateBdAPI = async (updateBd: BdFormSchema, bdId: string) => {
    const res = await request.post(`/bd/update/${bdId}`, updateBd);
    return res.data;
}

export const deleteBdAPI = async (listBd:string[]) => {
    const res = await request.post('/bd/delete', {listBd: listBd});
    return res;
}