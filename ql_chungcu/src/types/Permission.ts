export type psModule = {
    module_name: string;
    permission: psItem[];
}

export type psItem = {
    id: string;
    name?: string;
    module?: string,
    description: string,
    total_roles?: number
}

