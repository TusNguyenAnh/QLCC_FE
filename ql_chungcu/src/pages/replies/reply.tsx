import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {RequestList} from "./request/request-list.tsx"
import {RequestDetails} from "./request/request-details.tsx"
import {StatsCards} from "./overview/stats-cards..tsx"
import {useContext, useEffect, useState} from "react"
import {TaskType} from "@/pages/replies/task-type/task-type.tsx";
import type {ActionSummary, Task, TaskWorkflow} from "@/types/Task.ts";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {
    approveTaskAPI,
    getAllTaskByOrgAPI, getTaskApprovedAPI,
    getWfByTaskAPI,
    rejectTaskAPI,
    taskActionSummaryAPI
} from "@/apis/taskAPI.ts";
import {AuthContext} from "@/context/AuthContext.tsx";
import {toast} from "sonner";
import FilterReqForm, {type FilterReqFormSchema} from "@/pages/replies/request/filter-form-request.tsx";

function Reply() {
    const [selectedRequest, setSelectedRequest] = useState<Task | null>(null)
    const [listTask, setListTask] = useState<Task[] | []>([])
    const [listTaskApproved, setListTaskApproved] = useState<Task[] | []>([])
    const [lengthTaskPending, setLengthTaskPending] = useState<number>(0)
    const [workflowTask, setWorkflowTask] = useState<TaskWorkflow[] | null>(null)
    const [taskAction, setTaskAction] = useState<ActionSummary[] | null>(null)
    const [loading, setLoading] = useState(false);
    const [openReqDetail, setOpenReqDetail] = useState(false);

    const {orgManage} = useContext(AuthContext);

    const getWorkflowForTask = async ($taskId: string) => {
        try {
            const data = await getWfByTaskAPI($taskId)
            setWorkflowTask(data)
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }


    const getAllTaskByOrg = async (orgId: string, taskStatus: number, filterTask: FilterReqFormSchema) => {
        setLoading(true);
        try {
            const data = await getAllTaskByOrgAPI(orgId, taskStatus, filterTask)
            if (taskStatus === 2) {
                setLengthTaskPending(data.length)
            }
            setListTask(data);
            setSelectedRequest(null)
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setTimeout(() => {
                setLoading(false); // tắt sau 2 giây
            }, 200)
        }
    }

    const getTaskApproved = async (orgId: string, filterTask: FilterReqFormSchema) => {
        setLoading(true);
        try {
            const data = await getTaskApprovedAPI(orgId, filterTask)
            setListTaskApproved(data);
            setSelectedRequest(null)
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setTimeout(() => {
                setLoading(false); // tắt sau 2 giây
            }, 200)
        }
    }


    const taskActionSummary = async () => {
        try {
            const data = await taskActionSummaryAPI()
            setTaskAction(data);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }

    const onSelectTask = (task: Task) => {
        setSelectedRequest(task);
        getWorkflowForTask(task.id);
        setOpenReqDetail(true);
    }


    const submitApproveOrReject = async (action: string, comment: string, taskId: string) => {
        setLoading(true);
        const data = {
            'action': action,
            'comment': comment,
        }
        try {
            if (action === "APPROVED") {
                await approveTaskAPI(data, taskId);
            } else {
                await rejectTaskAPI(data, taskId);
            }
            getAllTaskByOrg(orgManage, 2, {})
            setSelectedRequest(null)
            toast.success(action == "APPROVED" ? "Phê duyệt thành công!" : "Đã từ chối xét duyệt yêu cầu!")
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        taskActionSummary();
        getAllTaskByOrg(orgManage, 2, {})
    }, [])

    return (
        <>
            <div className="flex-1 overflow-hidden">
                <Tabs defaultValue="overview" className="h-full flex flex-col">
                    <TabsList className="mx-6 mt-4 w-fit">
                        <TabsTrigger value="overview" onClick={taskActionSummary}>
                            Tổng quan
                        </TabsTrigger>
                        <TabsTrigger value="requests" onClick={() => getAllTaskByOrg(orgManage, 2, {})}>
                            Yêu cầu cần xét duyệt
                        </TabsTrigger>
                        <TabsTrigger value="reject" onClick={() => getAllTaskByOrg(orgManage, 3, {})}>
                            Yêu cầu bị từ chối
                        </TabsTrigger>

                        <TabsTrigger value="approved">
                            Yêu cầu đã xét duyệt
                        </TabsTrigger>

                        <TabsTrigger value="task_type">Danh sách loại yêu cầu</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="flex-1 p-6 space-y-6">
                        <StatsCards taskAction={taskAction} pendingReviewTotal={lengthTaskPending}/>
                    </TabsContent>

                    <TabsContent value="requests" className="flex-1 p-6">
                        <FilterReqForm onSubmitPdAndRj={getAllTaskByOrg} orgId={orgManage} type={"pd"}/>
                        <RequestList requests={listTask} onSelectRequest={onSelectTask} loading={loading}
                                     type={"pd"}
                        />
                        {selectedRequest ? (
                            <RequestDetails
                                request={selectedRequest}
                                workflow={workflowTask}
                                onSubmit={submitApproveOrReject}
                                open={openReqDetail}
                                setOpen={setOpenReqDetail}/>
                        ) : null}
                    </TabsContent>

                    <TabsContent value="reject" className="flex-1 p-6">
                        <FilterReqForm onSubmitPdAndRj={getAllTaskByOrg} orgId={orgManage} type={"rj"}/>
                        <RequestList requests={listTask} onSelectRequest={onSelectTask} loading={loading}
                                     type={"rj"}
                        />
                        {selectedRequest ? (
                            <RequestDetails
                                request={selectedRequest}
                                workflow={workflowTask}
                                onSubmit={submitApproveOrReject}
                                open={openReqDetail}
                                setOpen={setOpenReqDetail}/>
                        ) : null}
                    </TabsContent>

                    <TabsContent value="approved" className="flex-1 p-6">
                        <FilterReqForm onSubmit={getTaskApproved} orgId={orgManage} type={"apd"}/>
                        <RequestList requests={listTaskApproved} onSelectRequest={onSelectTask}
                                     loading={loading} type={"apd"}/>

                        {selectedRequest ? (
                            <RequestDetails
                                open={openReqDetail}
                                setOpen={setOpenReqDetail}
                                request={selectedRequest}
                                workflow={workflowTask}
                                onSubmit={submitApproveOrReject}
                            />
                        ) : null}
                    </TabsContent>

                    <TabsContent value="task_type" className="flex-1 p-6">
                        <TaskType/>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Reply;
