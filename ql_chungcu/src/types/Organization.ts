export type Org = {
    id: string;
    org_code: string;
    org_name: string;
    description: string;
    parent_org_id: string;
    status?: string;
    child?: Org[];
    building: string[];
}

export type fillItemOrg = {
    id: string;
    org_code: string;
    org_name: string;
    description: string;
    parent_org_id: string;
    building: string[];
}

export type orgWithoutChild = {
    id: string;
    org_name: string;
}
