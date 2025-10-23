import request from "@/utils/request.ts";

export const getAllTaskTypeAPI = async (complexId:string) => {
    const res = await request.get(`/tt/${complexId}`);
    return res.data;
}