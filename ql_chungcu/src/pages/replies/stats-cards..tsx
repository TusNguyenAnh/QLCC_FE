import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react"
import type {MaintenanceRequest} from "@/pages/replies/reply.tsx";

interface StatsCardsProps {
    requests: MaintenanceRequest[]
    userLevel: number
}

export function StatsCards({ requests, userLevel }: StatsCardsProps) {
    const totalRequests = requests.length
    const pendingReview = requests.filter((r) => r.currentLevel === userLevel && r.status.includes("review")).length
    const urgentRequests = requests.filter((r) => r.priority === "urgent").length
    const completedRequests = requests.filter((r) => r.status === "completed").length

    const stats = [
        {
            title: "Tổng yêu cầu",
            value: totalRequests,
            icon: FileText,
            description: "Tất cả yêu cầu trong hệ thống",
        },
        {
            title: "Chờ xét duyệt",
            value: pendingReview,
            icon: Clock,
            description: `Yêu cầu cần phê duyệt cấp ${userLevel}`,
            highlight: pendingReview > 0,
        },
        {
            title: "Khẩn cấp",
            value: urgentRequests,
            icon: AlertTriangle,
            description: "Yêu cầu ưu tiên cao",
            highlight: urgentRequests > 0,
        },
        {
            title: "Đã hoàn thành",
            value: completedRequests,
            icon: CheckCircle,
            description: "Yêu cầu đã xử lý xong",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className={stat.highlight ? "border-accent" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        {stat.highlight && stat.value > 0 && (
                            <Badge variant="secondary" className="mt-2 bg-accent text-accent-foreground">
                                Cần xử lý
                            </Badge>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
