import request from "@/utils/request.ts";
import type {OrgFormSchema} from "@/pages/organization/action-form-org.tsx";

export const getAllOrgAPI = async () => {
    const res = await request.get('/org');
    return res.data;
}

export const getAllOrgWithoutChildAPI = async (orgId: string) => {
    const res = await request.get(`/org/getAllWithoutChild/${orgId}`);
    return res.data;
}

export const createOrgAPI = async (newOrg: OrgFormSchema) => {
    const res = await request.post('/org/create', newOrg);
    return res.data;
}

export const updateOrgAPI = async (updateOrg: OrgFormSchema, orgId: string) => {
    const res = await request.post(`/org/update/${orgId}`, updateOrg);
    return res.data;
}

export const deleteOrgAPI = async (listOrg:string[]) => {
    const res = await request.post('/org/delete', {listOrg: listOrg});
    return res;
}