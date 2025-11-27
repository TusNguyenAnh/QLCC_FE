import request from "@/utils/request.ts";
import type {AssignPermissionFormSchema} from "@/pages/authorization/role/assign-permission.tsx";

export const getAllPermissionAPI = async () => {
    const res = await request.get(`/permission`);
    return res.data;
}

export const assignPermissionAPI = async (permission: AssignPermissionFormSchema) => {
    const res = await request.post('/permission/assignPermission', permission);
    return res.data;
}
