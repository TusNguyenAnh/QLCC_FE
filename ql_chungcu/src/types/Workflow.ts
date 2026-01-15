import type {fillItemTt} from "@/types/TaskType.ts";

export type Workflow = {
    id: string;
    workflow_name: string;
    description: string;
    status?: number;
    complex_id: string;
    workflow_step: WorkflowStep;
}


export type WorkflowStep = {
    id: string;
    org_level: number;
    step_order: number;
    description: string;
    status?: number;
    workflow_id: string;
    position: {
        id: string;
        role_name: string;
    }[];
}

export type fillItemWf = {
    id: string;
    workflow_name: string;
    description: string;
    status?: number;
    complex_id: string;
    workflow_step: WorkflowStep[];
}

export type listWorkflow = {
    id: string;
    complex_id: string;
    workflow_name: string;
    status?: number;
    description: string;
    workflow_step: WorkflowStep[];
    task_type: fillItemTt[];
}
