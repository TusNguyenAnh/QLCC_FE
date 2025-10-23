"use client"

import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Clock, User, MapPin, AlertTriangle, Loader2} from "lucide-react"
import type {Task} from "@/types/Task.ts";
import {formatDate, PRIORITY_COLORS, STATUS} from "@/utils/reply-constant.ts";

interface RequestListProps {
    requests: Task[] | null
    onSelectRequest: (request: Task) => void
    compact?: boolean
    loading?: boolean
}

export function RequestList({requests, onSelectRequest, compact = false, loading}: RequestListProps) {
    if (requests?.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">Không có yêu cầu nào</div>
    }

    return (
        <>
            {loading ? (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                    </div>
                ) :
                <div className="space-y-3">
                    {requests?.map((request) => (
                        <Card
                            key={request.id}
                            className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent"
                            onClick={() => onSelectRequest(request)}
                        >
                            <CardHeader className={compact ? "pb-2" : "pb-3"}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-card-foreground text-sm">{request.task_name}</h3>
                                            {request.priority_name === "URGENT" &&
                                                <AlertTriangle className="h-4 w-4 text-red-500"/>}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3"/>
                                                {request.username}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3"/>
                                                {request.building_name}-{request.apt_number}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3"/>
                                                {formatDate(request.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <Badge variant="outline" className={PRIORITY_COLORS[request.priority_name]}>
                                            {request.priority_name}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                            {request.status == STATUS["R"] ? "Từ chối xét duyệt" : `Xét duyệt cấp ${request.level}`}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            {!compact && (
                                <CardContent className="pt-0">
                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{request.description}</p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-xs">
                                            {request.type_name}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">ID: {request.id}</span>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>}
        </>
    )
}
