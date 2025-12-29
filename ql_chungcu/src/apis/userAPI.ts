import request from "@/utils/request.ts";
import type {Resident} from "@/types/Resident.ts";
import type {FilterResUserFormSchema} from "@/pages/authorization/user/res/filter-form-user-res.tsx";

export const findByOrgIdAPI = async (orgId: string,type:number) => {
    const res = await request.get(`/user/findByOrgId/${orgId}/${type}`);
    return res.data;
}

export const createUserAPI = async (listRes: Resident[]) => {
    const res = await request.post('/user/create', {listRes: listRes});
    return res.data;
}

export const getUserByFilterAPI = async (
    filterUser: FilterResUserFormSchema,
) => {
    const res = await request.post(
        `/user/findByBdId`,
        filterUser
    );

    return res.data;
};