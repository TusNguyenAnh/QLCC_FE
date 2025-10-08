"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { User, MapPin, Clock, DollarSign, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import type {MaintenanceRequest} from "@/pages/replies/reply.tsx";

interface WorkflowTemplate {
    id: string
    name: string
    description: string
    levels: {
        id: string
        name: string
        description: string
        order: number
    }[]
}

interface RequestDetailsProps {
    request: MaintenanceRequest
    userLevel: number
    workflow?: WorkflowTemplate
    onUpdate: (request: MaintenanceRequest) => void
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

const categoryLabels = {
    plumbing: "Hệ thống nước",
    electrical: "Hệ thống điện",
    hvac: "Điều hòa/Thông gió",
    general: "Bảo trì chung",
    security: "An ninh",
}

const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    urgent: "bg-red-100 text-red-800 border-red-200",
}

export function RequestDetails({ request, userLevel, workflow, onUpdate }: RequestDetailsProps) {
    const [comment, setComment] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const canApprove = request.currentLevel === userLevel && request.status.includes("review")
    const canReject = request.currentLevel === userLevel && request.status.includes("review")

    const handleApprove = async () => {
        setIsProcessing(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const currentLevelIndex = workflow?.levels.findIndex((l) => l.order === request.currentLevel) ?? -1
        const nextLevelIndex = currentLevelIndex + 1
        const nextLevel = workflow?.levels[nextLevelIndex]

        const nextStatus = nextLevel ? (`level${nextLevel.order}_review` as any) : "approved"
        const nextCurrentLevel = nextLevel ? nextLevel.order : (workflow?.levels.length ?? 3)

        const updatedRequest = {
            ...request,
            status: nextStatus,
            currentLevel: nextCurrentLevel,
        }

        onUpdate(updatedRequest)
        setComment("")
        setIsProcessing(false)
    }

    const handleReject = async () => {
        if (!comment.trim()) {
            alert("Vui lòng nhập lý do từ chối")
            return
        }

        setIsProcessing(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const updatedRequest = {
            ...request,
            status: "rejected" as any,
            rejectionReason: comment,
        }

        onUpdate(updatedRequest)
        setComment("")
        setIsProcessing(false)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    return (
        <div className="h-full overflow-y-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground mb-2">{request.title}</h2>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={priorityColors[request.priority]}>
                            {request.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">{statusLabels[request.status]}</Badge>
                        <Badge variant="outline">{categoryLabels[request.category]}</Badge>
                        {workflow && (
                            <Badge variant="outline" className="text-xs">
                                {workflow.name}
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Mã yêu cầu</p>
                    <p className="font-mono font-semibold">{request.id}</p>
                </div>
            </div>

            {/* Basic Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Người gửi</p>
                                <p className="font-medium">{request.submittedBy}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Căn hộ</p>
                                <p className="font-medium">{request.apartment}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Thời gian gửi</p>
                                <p className="font-medium">{formatDate(request.submittedAt)}</p>
                            </div>
                        </div>
                        {request.estimatedCost && (
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Chi phí ước tính</p>
                                    <p className="font-medium">{formatCurrency(request.estimatedCost)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Mô tả chi tiết</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground leading-relaxed">{request.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Tiến trình xét duyệt</CardTitle>
                    {workflow && <p className="text-sm text-muted-foreground">{workflow.description}</p>}
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        {workflow?.levels.map((level, index) => (
                                <div key={level.id} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            level.order < request.currentLevel
                                                ? "bg-green-500 text-black"
                                                : level.order === request.currentLevel
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        {level.order < request.currentLevel ? <CheckCircle className="h-4 w-4" /> : level.order}
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-sm font-medium">Cấp {level.order}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-20">{level.name}</p>
                                    </div>
                                    {index < workflow.levels.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-4" />}
                                </div>
                            )) ??
                            // Fallback cho trường hợp không có workflow
                            [1, 2, 3].map((level) => (
                                <div key={level} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            level < request.currentLevel
                                                ? "bg-green-500 text-black"
                                                : level === request.currentLevel
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        {level < request.currentLevel ? <CheckCircle className="h-4 w-4" /> : level}
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-sm font-medium">Cấp {level}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {level === 1 ? "Trưởng tòa" : level === 2 ? "Phó ban" : "Chủ tịch"}
                                        </p>
                                    </div>
                                    {level < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-4" />}
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            {(canApprove || canReject) && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Xét duyệt yêu cầu</CardTitle>
                        {workflow && (
                            <p className="text-sm text-muted-foreground">
                                {workflow.levels.find((l) => l.order === request.currentLevel)?.description}
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Nhập ghi chú (bắt buộc khi từ chối)..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                        />
                        <div className="flex gap-2">
                            {canApprove && (
                                <Button
                                    onClick={handleApprove}
                                    disabled={isProcessing}
                                    className="bg-green-600 hover:bg-green-700 text-black"
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {isProcessing ? "Đang xử lý..." : "Phê duyệt"}
                                </Button>
                            )}
                            {canReject && (
                                <Button variant="destructive" onClick={handleReject} disabled={isProcessing || !comment.trim()}>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {isProcessing ? "Đang xử lý..." : "Từ chối"}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Rejection Reason */}
            {request.status === "rejected" && request.rejectionReason && (
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-lg text-destructive">Lý do từ chối</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground">{request.rejectionReason}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
