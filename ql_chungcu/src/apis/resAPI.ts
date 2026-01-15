import request from "@/utils/request.ts";
import type {BdFormSchema} from "@/pages/building/action-form-bd.tsx";

import type {FilterResFormSchema} from "@/pages/resident/filter-form-res.tsx";

export const getResByFilterAPI = async (filterRes: FilterResFormSchema) => {
    // Trả về toàn bộ response với message, data, meta, links
    const res = await request.post(`/resident/getByFilter`, filterRes);

    return res.data;
};

export const findByOrgId = async (orgId: string) => {
    const res = await request.get(`/resident/findByOrgId/${orgId}`);
    return res.data;
};

export const findByBuildingIdAPI = async (buildingId: string[],orgId:string) => {
    const res = await request.post("/resident/findByBuildingId", {
        building_id: buildingId,
        org_id: orgId,
    });
    return res.data;
};

export const addResInOrgAPI = async (userId: string[], org_id: string) => {
    const res = await request.post(`/resident/addResInOrg/${org_id}`, {
        user_id: userId,
    });
    return res.data;
};

export const removeResInOrgAPI = async (userId: string[], org_id: string) => {
    const res = await request.post(`/resident/removeResInOrg/${org_id}`, {
        user_id: userId,
    });
    return res.data;
};


export const updatePositionAPI = async (userId: string, orgId: string, position: string) => {
    const res = await request.post(`/resident/updatePosition`, {
        userId: userId,
        orgId: orgId,
        position: position,
    });
    return res.data;
};

export const createResUseFileAPI = async (formData: FormData) => {
    const res = await request.post("/resident/import-excel", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const createAptResUseFileAPI = async (formData: FormData) => {
    const res = await request.post("/resident/import-excelAptRes", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const updateBdAPI = async (updateBd: BdFormSchema, bdId: string) => {
    const res = await request.post(`/bd/update/${bdId}`, updateBd);
    return res.data;
};

export const updateResPositionAPI = async (
    residentId: string,
    position: string
) => {
    const res = await request.post(`/resident/updatePosition/${residentId}`, {
        position,
    });
    return res.data;
};
