import request from "@/utils/request.ts";

export const createComplexAPI = async (formData: FormData) => {
    const res = await request.post("/complex/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};

export const findByIdAPI = async (complexId: string) => {
    const res = await request.get(`/complex/findById/${complexId}`);
    return res.data;
}
