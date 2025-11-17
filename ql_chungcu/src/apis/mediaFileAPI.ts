import request from "@/utils/request.ts";

export const getMediaFileAPI = async (ownerId:string) => {
    const res = await request.get(`/media/${ownerId}`);
    return res.data;
}