import request from "@/utils/request.ts";
import type {BdFormSchema} from "@/pages/building/action-form-bd.tsx";

export const getAllResAPI = async () => {
    const res = await request.get('/resident');
    return res.data;
}

export const findByOrgId = async (orgId: string) => {
    const res = await request.get(`/resident/findByOrgId/${orgId}`);
    return res.data;
}

export const findByBuildingId = async (buildingId: string[]) => {
    const res = await request.post('/resident/findByBuildingId',  { building_id: buildingId});
    return res.data;
}

export const updateResInOrg = async (resId: string[],org_id:string) => {
    const res = await request.post(`/resident/updateResInOrg/${org_id}`,  { res_id: resId});
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