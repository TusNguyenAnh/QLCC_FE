import request from "@/utils/request.ts";

export const getAllPriorityAPI = async () => {
    const res = await request.get("/priority");
    return res.data;
}