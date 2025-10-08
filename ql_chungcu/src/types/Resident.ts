export type Resident = {
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

export type fillItemBd = {
    id: string,
    complex_id: string,
    building_name: string,
    address: string,
}

export type bdItemCheckbox = {
    id: string;
    building_name: string;
}
