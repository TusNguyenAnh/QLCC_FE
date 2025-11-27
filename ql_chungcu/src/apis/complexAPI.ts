import request from "@/utils/request.ts";

export const createComplexAPI = async (formData: FormData) => {
    const res = await request.post("/complex/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};