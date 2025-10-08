import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Textarea} from "@/components/ui/textarea"
import {Switch} from "@/components/ui/switch"
import {Plus, Edit, Trash2, Users, Settings, ArrowDown, ArrowUp} from "lucide-react"

interface ApprovalLevel {
    id: string
    name: string
    description: string
    assignedUsers: string[]
    requiredApprovals: number
    canSkip: boolean
    order: number
}

interface WorkflowTemplate {
    id: string
    name: string
    description: string
    category: string[]
    priority: string[]
    levels: ApprovalLevel[]
    isActive: boolean
}

const mockUsers = [
    {id: "1", name: "Nguyễn Văn A", role: "Trưởng tòa A"},
    {id: "2", name: "Trần Thị B", role: "Trưởng tòa B"},
    {id: "3", name: "Lê Văn C", role: "Phó ban quản trị"},
    {id: "4", name: "Phạm Thị D", role: "Chủ tịch ban quản trị"},
]


const mockWorkflows: WorkflowTemplate[] = [
    {
        id: "wf-1",
        name: "Quy trình tiêu chuẩn",
        description: "Quy trình xét duyệt cho các yêu cầu thông thường",
        category: ["general", "plumbing", "electrical"],
        priority: ["low", "medium"],
        levels: [
            {
                id: "level-1",
                name: "Ban quản trị tòa nhà",
                description: "Xét duyệt sơ bộ và đánh giá tính khả thi",
                assignedUsers: ["1"],
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
                assignedUsers: ["1"],
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

function BusinessProcess() {
    const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(mockWorkflows)
    const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowTemplate | null>(null)

    const handleCreateWorkflow = () => {
        const newWorkflow: WorkflowTemplate = {
            id: `wf-${Date.now()}`,
            name: "Quy trình mới",
            description: "",
            category: [],
            priority: [],
            levels: [],
            isActive: false,
        }
        setEditingWorkflow(newWorkflow)
        setIsEditDialogOpen(true)
    }

    const handleEditWorkflow = (workflow: WorkflowTemplate) => {
        setEditingWorkflow({...workflow})
        setIsEditDialogOpen(true)
    }

    const handleSaveWorkflow = () => {
        if (!editingWorkflow) return

        if (workflows.find((w) => w.id === editingWorkflow.id)) {
            setWorkflows(workflows.map((w) => (w.id === editingWorkflow.id ? editingWorkflow : w)))
        } else {
            setWorkflows([...workflows, editingWorkflow])
        }

        setIsEditDialogOpen(false)
        setEditingWorkflow(null)
    }

    const handleDeleteWorkflow = (workflowId: string) => {
        setWorkflows(workflows.filter((w) => w.id !== workflowId))
        if (selectedWorkflow?.id === workflowId) {
            setSelectedWorkflow(null)
        }
    }

    const addApprovalLevel = () => {
        if (!editingWorkflow) return

        const newLevel: ApprovalLevel = {
            id: `level-${Date.now()}`,
            name: "",
            description: "",
            assignedUsers: [],
            requiredApprovals: 1,
            canSkip: false,
            order: editingWorkflow.levels.length + 1,
        }

        setEditingWorkflow({
            ...editingWorkflow,
            levels: [...editingWorkflow.levels, newLevel],
        })
    }

    const updateApprovalLevel = (levelId: string, updates: Partial<ApprovalLevel>) => {
        if (!editingWorkflow) return

        setEditingWorkflow({
            ...editingWorkflow,
            levels: editingWorkflow.levels.map((level) => (level.id === levelId ? {...level, ...updates} : level)),
        })
    }

    const removeApprovalLevel = (levelId: string) => {
        if (!editingWorkflow) return

        setEditingWorkflow({
            ...editingWorkflow,
            levels: editingWorkflow.levels.filter((level) => level.id !== levelId),
        })
    }

    const moveLevel = (levelId: string, direction: "up" | "down") => {
        if (!editingWorkflow) return

        const levels = [...editingWorkflow.levels]
        const index = levels.findIndex((l) => l.id === levelId)

        if (direction === "up" && index > 0) {
            ;[levels[index], levels[index - 1]] = [levels[index - 1], levels[index]]
        } else if (direction === "down" && index < levels.length - 1) {
            ;[levels[index], levels[index + 1]] = [levels[index + 1], levels[index]]
        }

        // Cập nhật lại order
        levels.forEach((level, idx) => {
            level.order = idx + 1
        })

        setEditingWorkflow({
            ...editingWorkflow,
            levels,
        })
    }


    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-end">
                    <Button onClick={handleCreateWorkflow} className="gap-2">
                        <Plus className="h-4 w-4"/>
                        Tạo quy trình mới
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Danh sách quy trình */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Danh sách quy trình</CardTitle>
                                <CardDescription>Chọn quy trình để xem chi tiết</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {workflows.map((workflow) => (
                                    <div
                                        key={workflow.id}
                                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                            selectedWorkflow?.id === workflow.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:bg-muted/50"
                                        }`}
                                        onClick={() => setSelectedWorkflow(workflow)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-foreground">{workflow.name}</h4>
                                            <Badge variant={workflow.isActive ? "default" : "secondary"}>
                                                {workflow.isActive ? "Đang dùng" : "Tạm dừng"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{workflow.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{workflow.levels.length} cấp</span>
                                            <span>•</span>
                                            <span>{workflow.category.length} loại</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chi tiết quy trình */}
                    <div className="lg:col-span-2">
                        {selectedWorkflow ? (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {selectedWorkflow.name}
                                                <Badge variant={selectedWorkflow.isActive ? "default" : "secondary"}>
                                                    {selectedWorkflow.isActive ? "Đang dùng" : "Tạm dừng"}
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription>{selectedWorkflow.description}</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm"
                                                    onClick={() => handleEditWorkflow(selectedWorkflow)}>
                                                <Edit className="h-4 w-4"/>
                                            </Button>
                                            <Button variant="outline" size="sm"
                                                    onClick={() => handleDeleteWorkflow(selectedWorkflow.id)}>
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="levels">
                                        <TabsList>
                                            <TabsTrigger value="levels">Cấp xét duyệt</TabsTrigger>
                                            <TabsTrigger value="conditions">Điều kiện áp dụng</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="levels" className="space-y-4">
                                            {selectedWorkflow.levels.map((level, index) => (
                                                <div key={level.id}
                                                     className="flex items-start gap-4 p-4 border rounded-lg">
                                                    <div className="flex flex-col items-center">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                                            {index + 1}
                                                        </div>
                                                        {index < selectedWorkflow.levels.length - 1 && (
                                                            <ArrowDown className="h-4 w-4 text-muted-foreground mt-2"/>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-foreground">{level.name}</h4>
                                                        <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                                                        <div className="flex items-center gap-4 text-sm">
                                                            <div className="flex items-center gap-1">
                                                                <Users className="h-4 w-4"/>
                                                                <span>{level.assignedUsers.length} người</span>
                                                            </div>
                                                            <div>Cần {level.requiredApprovals} phê duyệt</div>
                                                            {level.canSkip &&
                                                                <Badge variant="outline">Có thể bỏ qua</Badge>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </TabsContent>

                                        <TabsContent value="conditions" className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Loại yêu cầu áp dụng</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedWorkflow.category.map((cat) => (
                                                        <Badge key={cat} variant="secondary">
                                                            {cat}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Mức độ ưu tiên áp dụng</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedWorkflow.priority.map((pri) => (
                                                        <Badge key={pri} variant="secondary">
                                                            {pri}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                                        <p className="text-muted-foreground">Chọn một quy trình để xem chi tiết</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Dialog chỉnh sửa quy trình */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingWorkflow?.id.startsWith("wf-") && workflows.find((w) => w.id === editingWorkflow.id)
                                    ? "Chỉnh sửa quy trình"
                                    : "Tạo quy trình mới"}
                            </DialogTitle>
                            <DialogDescription>Cấu hình các cấp xét duyệt và điều kiện áp dụng</DialogDescription>
                        </DialogHeader>

                        {editingWorkflow && (
                            <div className="space-y-6">
                                {/* Thông tin cơ bản */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Tên quy trình</Label>
                                        <Input
                                            id="name"
                                            value={editingWorkflow.name}
                                            onChange={(e) =>
                                                setEditingWorkflow({
                                                    ...editingWorkflow,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="active"
                                            checked={editingWorkflow.isActive}
                                            onCheckedChange={(checked) =>
                                                setEditingWorkflow({
                                                    ...editingWorkflow,
                                                    isActive: checked,
                                                })
                                            }
                                        />
                                        <Label htmlFor="active">Kích hoạt quy trình</Label>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">Mô tả</Label>
                                    <Textarea
                                        id="description"
                                        value={editingWorkflow.description}
                                        onChange={(e) =>
                                            setEditingWorkflow({
                                                ...editingWorkflow,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Cấp xét duyệt */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium">Cấp xét duyệt</h4>
                                        <Button onClick={addApprovalLevel} size="sm" variant="outline">
                                            <Plus className="h-4 w-4 mr-2"/>
                                            Thêm cấp
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {editingWorkflow.levels.map((level, index) => (
                                            <div key={level.id} className="p-4 border rounded-lg">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h5 className="font-medium">Cấp {index + 1}</h5>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => moveLevel(level.id, "up")}
                                                            disabled={index === 0}
                                                        >
                                                            <ArrowUp className="h-4 w-4"/>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => moveLevel(level.id, "down")}
                                                            disabled={index === editingWorkflow.levels.length - 1}
                                                        >
                                                            <ArrowDown className="h-4 w-4"/>
                                                        </Button>
                                                        <Button size="sm" variant="outline"
                                                                onClick={() => removeApprovalLevel(level.id)}>
                                                            <Trash2 className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>Tên cấp</Label>
                                                        <Input
                                                            value={level.name}
                                                            onChange={(e) => updateApprovalLevel(level.id, {name: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Số phê duyệt cần thiết</Label>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={level.requiredApprovals}
                                                            onChange={(e) =>
                                                                updateApprovalLevel(level.id, {
                                                                    requiredApprovals: Number.parseInt(e.target.value) || 1,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Label>Mô tả</Label>
                                                    <Textarea
                                                        value={level.description}
                                                        onChange={(e) => updateApprovalLevel(level.id, {description: e.target.value})}
                                                    />
                                                </div>

                                                <div className="mt-4">
                                                    <Label>Người phụ trách</Label>
                                                    <Select
                                                        value={level.assignedUsers[0] || ""}
                                                        onValueChange={(value) =>
                                                            updateApprovalLevel(level.id, {
                                                                assignedUsers: [value],
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn người phụ trách"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {mockUsers.map((user) => (
                                                                <SelectItem key={user.id} value={user.id}>
                                                                    {user.name} - {user.role}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="mt-4 flex items-center space-x-2">
                                                    <Switch
                                                        id={`skip-${level.id}`}
                                                        checked={level.canSkip}
                                                        onCheckedChange={(checked) => updateApprovalLevel(level.id, {canSkip: checked})}
                                                    />
                                                    <Label htmlFor={`skip-${level.id}`}>Có thể bỏ qua cấp này</Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                        Hủy
                                    </Button>
                                    <Button onClick={handleSaveWorkflow}>Lưu quy trình</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default BusinessProcess;
