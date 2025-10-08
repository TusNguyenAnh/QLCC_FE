import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestList } from "./request-list"
import { RequestDetails } from "./request-details"
import { WorkflowTracker } from "./workflow-tracker"
import { StatsCards } from "./stats-cards."
import { useState } from "react"


export interface MaintenanceRequest {
    id: string
    title: string
    description: string
    category: "plumbing" | "electrical" | "hvac" | "general" | "security"
    priority: "low" | "medium" | "high" | "urgent"
    status:
        | "submitted"
        | "level1_review"
        | "level2_review"
        | "level3_review"
        | "approved"
        | "in_progress"
        | "completed"
        | "rejected"
    submittedBy: string
    apartment: string
    submittedAt: string
    currentLevel: number
    assignedTo?: string
    estimatedCost?: number
    completedAt?: string
    rejectionReason?: string
    attachments?: string[]
}

interface WorkflowTemplate {
    id: string
    name: string
    description: string
    category: string[]
    priority: string[]
    levels: {
        id: string
        name: string
        description: string
        assignedUsers: string[]
        requiredApprovals: number
        canSkip: boolean
        order: number
    }[]
    isActive: boolean
}

const mockRequests: MaintenanceRequest[] = [
    {
        id: "REQ-001",
        title: "Rò rỉ nước tại phòng tắm",
        description: "Vòi sen bị rò rỉ nước liên tục, gây ngập úng trong phòng tắm",
        category: "plumbing",
        priority: "high",
        status: "level2_review",
        submittedBy: "Nguyễn Văn A",
        apartment: "A-1205",
        submittedAt: "2024-01-15T08:30:00Z",
        currentLevel: 2,
    },
    {
        id: "REQ-002",
        title: "Thang máy kêu tiếng ồn",
        description: "Thang máy số 2 phát ra tiếng ồn lạ khi hoạt động",
        category: "general",
        priority: "medium",
        status: "level1_review",
        submittedBy: "Trần Thị B",
        apartment: "B-0803",
        submittedAt: "2024-01-14T14:20:00Z",
        currentLevel: 1,
    },
    {
        id: "REQ-003",
        title: "Hệ thống điện bị chập",
        description: "Cầu dao tự động ngắt liên tục, nghi ngờ có chập điện",
        category: "electrical",
        priority: "urgent",
        status: "approved",
        submittedBy: "Lê Văn C",
        apartment: "C-1501",
        submittedAt: "2024-01-13T16:45:00Z",
        currentLevel: 3,
        assignedTo: "Đội kỹ thuật điện",
    },
]

const mockWorkflows: WorkflowTemplate[] = [
    {
        id: "wf-1",
        name: "Quy trình tiêu chuẩn",
        description: "Quy trình xét duyệt cho các yêu cầu thông thường",
        category: ["general", "plumbing", "hvac"],
        priority: ["low", "medium"],
        levels: [
            {
                id: "level-1",
                name: "Ban quản trị tòa nhà",
                description: "Xét duyệt sơ bộ và đánh giá tính khả thi",
                assignedUsers: ["1", "2"],
                requiredApprovals: 1,
                canSkip: false,
                order: 1,
            },
            {
                id: "level-2",
                name: "Ban quản trị cụm tòa",
                description: "Xét duyệt chi phí và phương án thực hiện",
                assignedUsers: ["3"],
                requiredApprovals: 1,
                canSkip: false,
                order: 2,
            },
            {
                id: "level-3",
                name: "Ban quản trị khu chung cư",
                description: "Phê duyệt cuối cùng và phân bổ ngân sách",
                assignedUsers: ["4"],
                requiredApprovals: 1,
                canSkip: false,
                order: 3,
            },
        ],
        isActive: true,
    },
    {
        id: "wf-2",
        name: "Quy trình khẩn cấp",
        description: "Quy trình rút gọn cho các yêu cầu khẩn cấp",
        category: ["electrical", "security"],
        priority: ["urgent", "high"],
        levels: [
            {
                id: "level-1",
                name: "Ban quản trị tòa nhà",
                description: "Xét duyệt nhanh và báo cáo",
                assignedUsers: ["1", "2"],
                requiredApprovals: 1,
                canSkip: false,
                order: 1,
            },
            {
                id: "level-3",
                name: "Ban quản trị khu chung cư",
                description: "Phê duyệt khẩn cấp",
                assignedUsers: ["4"],
                requiredApprovals: 1,
                canSkip: false,
                order: 2,
            },
        ],
        isActive: true,
    },
]

function Reply() {
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
    const [userLevel] = useState(2) // Cấp độ của người dùng hiện tại
    const [currentView, setCurrentView] = useState<"maintenance" | "workflow-management">("maintenance")
    const [workflows] = useState<WorkflowTemplate[]>(mockWorkflows)

    const getWorkflowForRequest = (request: MaintenanceRequest) => {
        if (request.priority === "urgent" || request.priority === "high") {
            return workflows.find((w) => w.id === "wf-2") || workflows[0]
        }
        return workflows.find((w) => w.id === "wf-1") || workflows[0]
    }

    return (
        <>
            <div className="flex-1 overflow-hidden">
                <Tabs defaultValue="dashboard" className="h-full flex flex-col">
                    <TabsList className="mx-6 mt-4 w-fit">
                        <TabsTrigger value="dashboard">Tổng quan</TabsTrigger>
                        <TabsTrigger value="requests">Danh sách yêu cầu</TabsTrigger>
                        <TabsTrigger value="workflow">Theo dõi quy trình</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="flex-1 p-6 space-y-6">
                        <StatsCards requests={mockRequests} userLevel={userLevel} />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Yêu cầu cần xét duyệt</CardTitle>
                                    <CardDescription>Các yêu cầu đang chờ phê duyệt ở cấp của bạn</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RequestList
                                        requests={mockRequests.filter(
                                            (r) => r.currentLevel === userLevel && r.status.includes("review"),
                                        )}
                                        onSelectRequest={setSelectedRequest}
                                        compact={true}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Yêu cầu ưu tiên cao</CardTitle>
                                    <CardDescription>Các yêu cầu cần được xử lý khẩn cấp</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RequestList
                                        requests={mockRequests.filter((r) => r.priority === "urgent" || r.priority === "high")}
                                        onSelectRequest={setSelectedRequest}
                                        compact={true}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="requests" className="flex-1 overflow-hidden">
                        <div className="h-full flex">
                            <div className="w-1/2 border-r border-border">
                                <div className="p-6">
                                    <RequestList requests={mockRequests} onSelectRequest={setSelectedRequest} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                {selectedRequest ? (
                                    <RequestDetails
                                        request={selectedRequest}
                                        userLevel={userLevel}
                                        workflow={getWorkflowForRequest(selectedRequest)}
                                        onUpdate={(updatedRequest) => {
                                            console.log("Updated request:", updatedRequest)
                                        }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-muted-foreground">
                                        Chọn một yêu cầu để xem chi tiết
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="workflow" className="flex-1 p-6">
                        <WorkflowTracker requests={mockRequests} workflows={workflows} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Reply;
