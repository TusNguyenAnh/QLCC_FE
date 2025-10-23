import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {RequestList} from "./request/request-list.tsx"
import {RequestDetails} from "./request/request-details.tsx"
import {StatsCards} from "./overview/stats-cards..tsx"
import {useContext, useEffect, useState} from "react"
import {TaskType} from "@/pages/replies/task-type.tsx";
import type {ActionSummary, Task, TaskWorkflow} from "@/types/Task.ts";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {
    approveTaskAPI,
    getAllTaskByOrgAPI,
    getWfByTaskAPI,
    rejectTaskAPI,
    taskActionSummaryAPI
} from "@/apis/taskAPI.ts";
import {AuthContext} from "@/context/AuthContext.tsx";
import {toast} from "sonner";

function Reply() {
    const [selectedRequest, setSelectedRequest] = useState<Task | null>(null)
    const [listTask, setListTask] = useState<Task[] | []>([])
    const [lengthTaskPending, setLengthTaskPending] = useState<number>(0)

    const [workflowTask, setWorkflowTask] = useState<TaskWorkflow[] | null>(null)
    const [taskAction, setTaskAction] = useState<ActionSummary[] | null>(null)
    const [loading, setLoading] = useState(false);
    const {orgManage} = useContext(AuthContext);

    const getWorkflowForTask = async ($taskId: string) => {
        try {
            const data = await getWfByTaskAPI($taskId)
            setWorkflowTask(data)
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }


    const getAllTaskByOrg = async (orgId: string, taskStatus: number) => {
        setLoading(true);
        try {
            const data = await getAllTaskByOrgAPI(orgId, taskStatus)
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
            getAllTaskByOrg(orgManage, 2)
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
    }, [])

    return (
        <>
            <div className="flex-1 overflow-hidden">
                <Tabs defaultValue="overview" className="h-full flex flex-col">
                    <TabsList className="mx-6 mt-4 w-fit">
                        <TabsTrigger value="overview" onClick={taskActionSummary}>
                            Tổng quan
                        </TabsTrigger>
                        <TabsTrigger value="requests" onClick={() => getAllTaskByOrg(orgManage, 2)}>
                            Yêu cầu cần xét duyệt
                        </TabsTrigger>
                        <TabsTrigger value="reject" onClick={() => getAllTaskByOrg(orgManage, 3)}>
                            Yêu cầu bị từ chối
                        </TabsTrigger>
                        <TabsTrigger value="task_type">Danh sách loại yêu cầu</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="flex-1 p-6 space-y-6">
                        <StatsCards taskAction={taskAction} pendingReviewTotal={lengthTaskPending}/>
                    </TabsContent>

                    <TabsContent value="requests" className="flex-1 overflow-hidden">
                        <div className="h-full flex">
                            <div className="w-1/2 border-r border-border">
                                <div className="p-6">
                                    <RequestList requests={listTask} onSelectRequest={onSelectTask} loading={loading}/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                {selectedRequest ? (
                                    <RequestDetails
                                        request={selectedRequest}
                                        workflow={workflowTask}
                                        onSubmit={submitApproveOrReject}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-muted-foreground">
                                        Chọn một yêu cầu để xem chi tiết
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reject" className="flex-1 p-6">
                        <div className="h-full flex">
                            <div className="w-1/2 border-r border-border">
                                <div className="p-6">
                                    <RequestList requests={listTask} onSelectRequest={onSelectTask} loading={loading}/>
                                </div>
                            </div>
                            <div className="w-1/2">
                                {selectedRequest ? (
                                    <RequestDetails
                                        request={selectedRequest}
                                        workflow={workflowTask}
                                        onSubmit={submitApproveOrReject}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-muted-foreground">
                                        Chọn một yêu cầu để xem chi tiết
                                    </div>
                                )}
                            </div>
                        </div>
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
