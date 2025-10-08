import request from "@/utils/request.ts";
import type {AptFormSchema} from "@/pages/apartment/action-form-apt.tsx";

export const getApartmentByBuilding = async (bdId: string) => {
    const res = await request.get(`/apt/findByBuilding/${bdId}`);
    return res.data;
}

export const createAptAPI = async (newApt: AptFormSchema) => {
    const res = await request.post('/apt/create', newApt);
    return res.data;
}

export const updateAptAPI = async (updateApt: AptFormSchema, aptId: string) => {
    const res = await request.post(`/apt/update/${aptId}`, updateApt);
    return res.data;
}

export const deleteBdAPI = async (listBd:string[]) => {
    const res = await request.post('/bd/delete', {listBd: listBd});
    return res;
}