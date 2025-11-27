import type {Resident} from "./Resident";

export interface User {
    id: string;
    username: string;
    complex_id: string;
    res_id: string;
    status: number;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string;
    deleted_at: string | null;
    resident: Resident | null;
}

export interface ProfileResponse {
    user: User;
    permissions: string[];
}

export interface LoginResponse {
    message: string;
    access_token: string;
    refresh_token: string;
}
