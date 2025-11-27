export type User = {
    id: string;
    username: string;
    res_id: string;
    role_id: string;
    status: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: {
        id: string;
        role_name: string;
        status: number;
    };
}

export type Member = {
    id: string,
    org_id: string,
    apt_id: string,
    res_id: string,
    fullname : string,
    email : string,
    phone_number :string,
    birthday : string,
    relationship:string,
    gender : string,
    cccd : string
    status?: string

}