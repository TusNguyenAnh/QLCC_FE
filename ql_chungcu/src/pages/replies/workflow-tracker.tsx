import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, User } from "lucide-react"
import type {MaintenanceRequest} from "@/pages/replies/reply.tsx";

interface WorkflowTemplate {
    id: string
    name: string
    levels: {
        id: string
        name: string
        description: string
        order: number
    }[]
}

interface WorkflowTrackerProps {
    requests: MaintenanceRequest[]
    workflows: WorkflowTemplate[]
}

const statusLabels = {
    submitted: "Đã gửi",
    level1_review: "Xét duyệt cấp 1",
    level2_review: "Xét duyệt cấp 2",
    level3_review: "Xét duyệt cấp 3",
    approved: "Đã phê duyệt",
    in_progress: "Đang xử lý",
    completed: "Hoàn thành",
    rejected: "Từ chối",
}

const defaultWorkflows: WorkflowTemplate[] = [
    {
        id: "wf-1",
        name: "Quy trình tiêu chuẩn",
        levels: [
            { id: "level-1", name: "Ban quản trị tòa nhà", description: "Xét duyệt sơ bộ", order: 1 },
            { id: "level-2", name: "Ban quản trị cụm tòa", description: "Xét duyệt chi phí", order: 2 },
            { id: "level-3", name: "Ban quản trị khu chung cư", description: "Phê duyệt cuối", order: 3 },
        ],
    },
    {
        id: "wf-2",
        name: "Quy trình khẩn cấp",
        levels: [
            { id: "level-1", name: "Ban quản trị tòa nhà", description: "Xét duyệt nhanh", order: 1 },
            { id: "level-3", name: "Ban quản trị khu chung cư", description: "Phê duyệt khẩn cấp", order: 2 },
        ],
    },
]

export function WorkflowTracker({ requests, workflows = defaultWorkflows }: WorkflowTrackerProps) {
    const getStatusIcon = (status: string, isActive: boolean, isPassed: boolean) => {
        if (status === "rejected") {
            return <XCircle className="h-5 w-5 text-red-500" />
        }
        if (isPassed) {
            return <CheckCircle className="h-5 w-5 text-green-500" />
        }
        if (isActive) {
            return <Clock className="h-5 w-5 text-accent animate-pulse" />
        }
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getWorkflowForRequest = (request: MaintenanceRequest) => {
        // Logic chọn workflow dựa trên priority và category
        if (request.priority === "urgent" || request.priority === "high") {
            return workflows.find((w) => w.id === "wf-2") || workflows[0]
        }
        return workflows.find((w) => w.id === "wf-1") || workflows[0]
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Theo dõi quy trình xét duyệt</h2>
                <Badge variant="secondary">{requests.length} yêu cầu</Badge>
            </div>

            <div className="grid gap-6">
                {requests.map((request) => {
                    const workflow = getWorkflowForRequest(request)
                    const totalSteps = workflow.levels.length + 2 // +2 cho "Gửi yêu cầu" và "Hoàn thành"

                    return (
                        <Card key={request.id} className="overflow-hidden">
                            <CardHeader className="bg-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{request.title}</CardTitle>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {request.submittedBy} - {request.apartment}
                                            </div>
                                            <span>•</span>
                                            <span>{formatDate(request.submittedAt)}</span>
                                            <span>•</span>
                                            <Badge variant="outline" className="text-xs">
                                                {workflow.name}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={
                                            request.status === "completed"
                                                ? "default"
                                                : request.status === "rejected"
                                                    ? "destructive"
                                                    : "secondary"
                                        }
                                    >
                                        {statusLabels[request.status]}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        {Array.from({ length: totalSteps }, (_, index) => {
                                            const isSubmitted = index === 0
                                            const isCompleted = index === totalSteps - 1
                                            const isReviewLevel = !isSubmitted && !isCompleted
                                            const levelIndex = index - 1
                                            const workflowLevel = workflow.levels[levelIndex]

                                            let isActive = false
                                            let isPassed = false

                                            if (isSubmitted) {
                                                isActive = request.status === "submitted"
                                                isPassed = request.status !== "submitted"
                                            } else if (isCompleted) {
                                                isActive = request.status === "approved" || request.status === "in_progress"
                                                isPassed = request.status === "completed"
                                            } else if (isReviewLevel && workflowLevel) {
                                                const currentLevelOrder = workflowLevel.order
                                                isActive = request.currentLevel === currentLevelOrder && request.status.includes("review")
                                                isPassed = request.currentLevel > currentLevelOrder
                                            }

                                            return (
                                                <div key={index} className="flex flex-col items-center relative">
                                                    {/* Step Icon */}
                                                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background relative z-10">
                                                        {getStatusIcon(request.status, isActive, isPassed)}
                                                    </div>

                                                    {/* Step Label */}
                                                    <div className="mt-2 text-center max-w-24">
                                                        <p className="text-sm font-medium">
                                                            {isSubmitted
                                                                ? "Gửi yêu cầu"
                                                                : isCompleted
                                                                    ? "Hoàn thành"
                                                                    : `Cấp ${workflowLevel?.order || index}`}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {isSubmitted
                                                                ? "Cư dân"
                                                                : isCompleted
                                                                    ? "Kỹ thuật"
                                                                    : workflowLevel?.name || "Chưa xác định"}
                                                        </p>
                                                    </div>

                                                    {/* Connection Line */}
                                                    {index < totalSteps - 1 && (
                                                        <div
                                                            className={`absolute top-6 left-12 w-full h-0.5 ${isPassed ? "bg-green-500" : "bg-muted"}`}
                                                            style={{ width: "calc(100% - 48px)" }}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Current Status Details */}
                                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    Trạng thái hiện tại: {statusLabels[request.status]}
                                                </p>
                                                {request.status.includes("review") && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Đang chờ xét duyệt từ{" "}
                                                        {workflow.levels.find((l) => l.order === request.currentLevel)?.name || "Chưa xác định"}
                                                    </p>
                                                )}
                                                {request.status === "rejected" && request.rejectionReason && (
                                                    <p className="text-sm text-red-600 mt-1">Lý do: {request.rejectionReason}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">ID: {request.id}</p>
                                                {request.estimatedCost && (
                                                    <p className="text-sm font-medium">
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(request.estimatedCost)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
