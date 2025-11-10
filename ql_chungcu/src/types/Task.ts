export type Task = {
    "id": string,
    "complex_id": string,
    "tasktype_id": string,
    "current_step_id": string,
    "current_org_id": string,
    "user_id": string,
    "task_name": string,
    "description": string,
    "status": string,
    "created_at": string,
    "updated_at": string,
    "type_name": string,
    "priority_name": string,
    "username": string,
    "phone_number":string,
    "apt_number": string,
    "level": number,
    'building_name': string,
}

export type TaskWorkflow = {
    "id": string,
    "task_id": string,
    // "user_id": null,
    "org_id": string,
    "step_order": number,
    "action": string,
    "comment": string,
    "org_name": string,
    "level": number,
    "workflow_name": string
}

export type ActionSummary = {
    "action": string,
    "total_tasks": number,
}

export type TaskReview = {
    "action": string,
    "comment": string,
}