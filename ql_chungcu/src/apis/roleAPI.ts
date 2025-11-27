import request from "@/utils/request.ts";
import type {RoleFormSchema} from "@/pages/authorization/role/action-form-role.tsx";
import type {AssignPermissionFormSchema} from "@/pages/authorization/role/assign-permission.tsx";
import type {AssignRoleFormSchema} from "@/pages/authorization/user/assign-role.tsx";

export const getAllRoleAPI = async (complexId: string) => {
    const res = await request.get(`/role/findByComplexId/${complexId}`);
    return res.data;
}

export const createRoleAPI = async (newRole: RoleFormSchema) => {
    const res = await request.post('/role/create', newRole);
    return res.data;
}

export const getRoleByUserAPI = async (userId: string) => {
    const res = await request.get(`/role/getRoleByUserId/${userId}`);
    return res.data;
}

export const assignRoleAPI = async (role: AssignRoleFormSchema) => {
    const res = await request.post('/role/assignRole', role);
    return res.data;
}
