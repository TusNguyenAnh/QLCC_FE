import request from "@/utils/request.ts";
import type {LoginFormSchema} from "@/pages/authentication/login.tsx";

export const login = async (account: LoginFormSchema) => {
    const res = await request.post('/auth/login', account);
    return res.data;
}

export const logoutUser = async () => {
    const res = await request.post('/auth/logout');
    return res;
}

export const getProfile = async () => {
    const res = await request.get("/auth/profile");
    return res;
}