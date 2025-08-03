export type Building = {
    id: string,
    complex_id: string,
    building_name: string,
    address: string,
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
