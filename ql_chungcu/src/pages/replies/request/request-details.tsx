"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {useState} from "react"
import {User, MapPin, Clock, CheckCircle, XCircle} from "lucide-react"
import type {Task, TaskWorkflow} from "@/types/Task.ts";
import {formatDate, PRIORITY_COLORS, STATUS} from "@/utils/reply-constant.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"

interface RequestDetailsProps {
    request: Task
    workflow?: TaskWorkflow[] | null
    onSubmit: (action: string, comment: string, taskId: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

export function RequestDetails({request, workflow, onSubmit, open, setOpen}: RequestDetailsProps) {
    const [comment, setComment] = useState("")

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[80vw] h-[90vh]">
                <div className="h-full overflow-y-auto m-3 p-3 space-y-6">
                    {/* Header */}
                    <DialogHeader>
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-2">{request.task_name}</h2>
                            <p className="text-sm text-muted-foreground">Mã yêu cầu: {request.id}</p>
                        </div>
                    </DialogHeader>
                    <DialogDescription></DialogDescription>
                    <DialogTitle>
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={PRIORITY_COLORS[request.priority_name]}>
                                    {request.priority_name}
                                </Badge>
                                {request.status == STATUS["P"] ?
                                    <Badge variant="secondary">
                                        Xét duyệt cấp {request.level}
                                    </Badge> : null
                                }
                                <Badge variant="outline">{request.type_name}</Badge>
                                {workflow && (
                                    <Badge variant="outline" className="text-xs">
                                        {workflow[1].workflow_name}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </DialogTitle>


                    {/* Basic Info */}
                    <Card className="gap-0">
                        <CardHeader>
                            <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Người gửi</p>
                                        <p className="font-medium">{request.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Căn hộ</p>
                                        <p className="font-medium">{request.building_name}-{request.apt_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Thời gian gửi</p>
                                        <p className="font-medium">{formatDate(request.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card className="gap-0">
                        <CardHeader>
                            <CardTitle className="text-lg">Mô tả chi tiết</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground leading-relaxed">{request.description}</p>
                        </CardContent>
                    </Card>

                    {/*workflow*/}
                    <Card className="gap-0">
                        <CardHeader>
                            <CardTitle className="text-lg">Tiến trình xét duyệt</CardTitle>
                            {workflow &&
                                <p className="text-sm text-muted-foreground">{workflow.find(item => item.level == request.level)?.workflow_name}</p>}
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <>
                                    <div className={`flex items-center w-full h-[16vh] justify-between`}>
                                        <div>
                                            <div
                                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background relative`}>
                                                <CheckCircle className="h-5 w-5 text-green-500"/>

                                                <div className="mt-4 text-center absolute top-10">
                                                    <div className="text-sm font-medium truncate">
                                                        Gửi yêu cầu
                                                    </div>
                                                    <div
                                                        className="text-xs text-muted-foreground">
                                                        Cư dân
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex-1 w-full h-0.5 bg-green-500`}
                                        />
                                    </div>

                                    {workflow?.map((level, index) => (
                                        <div
                                            key={level.id}
                                            className={`flex items-center w-full h-[18vh] justify-between`}>
                                            <div>
                                                <div
                                                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background relative`}>
                                                    {level.action == STATUS["P"] && level.level == request.level ?
                                                        <Clock className="h-5 w-5 text-blue-500 animate-pulse"/> :
                                                        level.action == STATUS["R"] ?
                                                            <XCircle className="h-5 w-5 text-red-500"/> :
                                                            level.action == STATUS["A"] ?
                                                                <CheckCircle className="h-5 w-5 text-green-500"/> :
                                                                <div
                                                                    className="w-5 h-5 rounded-full border-2 border-muted-foreground"/>
                                                    }

                                                    <div className="mt-4 text-center absolute top-10">
                                                        <div className="text-sm font-medium truncate">
                                                            {level.level == -1 ? "Gửi yêu cầu" : `Cấp ${level.level}`}
                                                        </div>
                                                        <div
                                                            className="text-xs text-muted-foreground truncate">
                                                            {level.org_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {index <= workflow?.length - 1 && (<div
                                                className={`flex-1 w-full h-0.5 ${level.action == STATUS["A"] ? "bg-green-500" : "bg-muted"}`}
                                            />)}
                                        </div>
                                    ))}

                                    <div
                                        className={`flex items-center w-full h-[16vh] justify-between flex-1`}>
                                        <div>
                                            <div
                                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background relative`}>
                                                {workflow && workflow[workflow.length - 1].action == STATUS["A"] ?
                                                    <CheckCircle className="h-5 w-5 text-green-500"/> :
                                                    <div
                                                        className="w-5 h-5 rounded-full border-2 border-muted-foreground"/>
                                                }

                                                <div className="mt-4 text-center absolute top-10">
                                                    <div className="text-sm font-medium truncate">
                                                        Hoàn thành
                                                    </div>
                                                    <div
                                                        className="text-xs text-muted-foreground">
                                                        Thông qua xét duyệt
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </CardContent>
                    </Card>

                    {(request.status == STATUS["P"]) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Xét duyệt yêu cầu</CardTitle>
                                {workflow && (
                                    <p className="text-sm text-muted-foreground">
                                        {request.description}
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
                                {request.status == STATUS["P"] && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => onSubmit("APPROVED", comment, request.id)}
                                            // disabled={isProcessing}
                                            className="bg-green-600 hover:bg-green-700 text-black"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2"/> Phê duyệt
                                        </Button>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white"
                                                onClick={() => onSubmit("REJECTED", comment, request.id)}
                                            // disabled={isProcessing || !comment.trim()}
                                        >
                                            <XCircle className="h-4 w-4 mr-2"/> Từ chối
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/*/!* Rejection Reason *!/*/}
                    {request.status === STATUS["R"] && (
                        <Card className="border-destructive gap-2">
                            <CardHeader>
                                <CardTitle className="text-lg text-destructive">Lý do từ chối</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground">{workflow?.find(item => item.level == request.level)?.comment}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>

    )
}
