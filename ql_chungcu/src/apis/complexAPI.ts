import request from "@/utils/request.ts";

export const createComplexAPI = async (formData: FormData) => {
    const res = await request.post("/complex/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};

export const findComplexByIdAPI = async (complexId: string) => {
    const res = await request.get(`/complex/findById/${complexId}`);
    return res.data;
}

export const filterComplexAPI = async (
    status: string,
    page = 1,
    perPage = 50
) => {
    // Trả về toàn bộ response với message, data, meta, links
    const res = await request.post(
        `/complex/filterComplex/${status}?page=${page}&perPage=${perPage}`);

    return res.data;
};
