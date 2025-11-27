import request from "@/utils/request.ts";

export const findByOrgId = async (orgId: string) => {
    const res = await request.get(`/user/findByOrgId/${orgId}`);
    return res.data;
}