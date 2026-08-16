export type Apt = {
    id: string;
    apt_number: string;
    apt_area: number;
    status?: string;
    building_id: string;
    apt_type: string;
    description: string;
    floor: number;
}

export type fillItemApt = {
    id: string;
    apt_number: string;
    gross_area: number;
    coefficient: number;
    description: string;
    building_id: string;
    apt_type: string;
    floor: number;
}

