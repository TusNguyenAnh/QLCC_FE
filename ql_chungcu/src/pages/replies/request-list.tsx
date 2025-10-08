"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin, AlertTriangle } from "lucide-react"
import type {MaintenanceRequest} from "@/pages/replies/reply.tsx";

interface RequestListProps {
    requests: MaintenanceRequest[]
    onSelectRequest: (request: MaintenanceRequest) => void
    compact?: boolean
}

const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    urgent: "bg-red-100 text-red-800 border-red-200",
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

export function RequestList({ requests, onSelectRequest, compact = false }: RequestListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (requests.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">Không có yêu cầu nào</div>
    }

    return (
        <div className="space-y-3">
            {requests.map((request) => (
                <Card
                    key={request.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent"
                    onClick={() => onSelectRequest(request)}
                >
                    <CardHeader className={compact ? "pb-2" : "pb-3"}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-card-foreground text-sm">{request.title}</h3>
                                    {request.priority === "urgent" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {request.submittedBy}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {request.apartment}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatDate(request.submittedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <Badge variant="outline" className={priorityColors[request.priority]}>
                                    {request.priority.toUpperCase()}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    {statusLabels[request.status]}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    {!compact && (
                        <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{request.description}</p>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                    {categoryLabels[request.category]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">ID: {request.id}</span>
                            </div>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    )
}
