export type TaskType = {
    id: string;
    complex_id: string;
    type_name: string;
    description: string;
    workflow_id: string;
    priority: {
        id: string;
        priority_name: string;
    };
    status?: number;
}

export type fillItemTt = {
    id: string;
    type_name: string;
    workflow_id: string;
    description: string;
    status?: number;
    complex_id: string;
    priority: {
        id: string;
        priority_name: string;
    };
}
