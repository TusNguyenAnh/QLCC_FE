import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Building2, Layers, CheckCircle2} from "lucide-react";
import {useEffect, useState} from "react";
import {getAllBdAPI} from "@/apis/bdAPI.ts";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import type {Building} from "@/types/Building.ts";

interface ModelDashboardProps {
    modelType: "centralized" | "decentralized";
}

export default function ModelDashboard({
                                           modelType,
                                       }: ModelDashboardProps) {
    const isCentralized = modelType === "centralized";
    const [buildings, setBuildings] = useState<Building[]>([]);

    const getAllBuilding = async () => {
        try {
            const data = await getAllBdAPI();
            setBuildings(data);
            console.log(data);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    }
    useEffect(() => {
        if (!isCentralized) {
            getAllBuilding();
        }
    }, [isCentralized]);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Model Type Card */}
                <Card className="mb-6 shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            {isCentralized ? (
                                <div className="p-4 bg-blue-500 rounded-full shadow-lg">
                                    <Layers className="h-10 w-10 text-white"/>
                                </div>
                            ) : (
                                <div className="p-4 bg-green-500 rounded-full shadow-lg">
                                    <Building2 className="h-10 w-10 text-white"/>
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <CardTitle className="text-2xl font-bold">
                                        {isCentralized ? "Mô hình tập trung" : "Mô hình phân tán"}
                                    </CardTitle>
                                    <Badge
                                        className={`${
                                            isCentralized ? "bg-blue-600" : "bg-green-600"
                                        } text-white`}
                                    >
                                        Đang áp dụng
                                    </Badge>
                                </div>
                                <CardDescription className="text-base leading-relaxed text-gray-700">
                                    {isCentralized
                                        ? "Quản lý tất cả các khoản thu chi trong một tài khoản duy nhất. Đơn giản và dễ quản lý."
                                        : "Quản lý thu chi theo từng tòa nhà với tỉ lệ phân bổ riêng. Chi tiết và chuyên nghiệp."}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Buildings List (only for distributed model) */}
                {!isCentralized && buildings && buildings.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Danh sách tòa nhà</CardTitle>
                            <CardDescription>
                                Tỉ lệ phân bổ thu/chi cho từng tòa nhà
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {buildings.map((building) => (
                                <div
                                    key={building.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <span className="font-medium">{building.building_name}</span>
                                    <Badge variant="secondary" className="text-base px-3 py-1">
                                        {Number(building.financial_ratio).toFixed(1)}%
                                    </Badge>
                                </div>
                            ))}

                            {/* Total Summary */}
                            <div
                                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                <span className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600"/>
                  Tổng tỉ lệ phân bổ
                </span>
                                <Badge className="bg-blue-600 text-white text-base px-3 py-1">
                                    {buildings
                                        .reduce((sum, b) => sum + Number(b.financial_ratio), 0)
                                        .toFixed(1)}
                                    %
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Centralized Model Info */}
                {isCentralized && (
                    <Card className="shadow-xl border-2 border-blue-200">
                        <CardContent className="p-12 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div
                                    className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Layers className="h-10 w-10 text-blue-600"/>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    Quản lý tập trung
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Tất cả các khoản thu và chi sẽ được quản lý trong một tài
                                    khoản duy nhất. Điều này giúp đơn giản hóa việc theo dõi và
                                    báo cáo tài chính, phù hợp cho các tổ chức có quy mô nhỏ hoặc
                                    cần quản lý đơn giản.
                                </p>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 inline-block">
                                    <p className="text-sm text-blue-800 font-medium">
                                        ✓ Tài khoản duy nhất cho toàn bộ hệ thống
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Progress indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className="h-2 w-2 rounded-full bg-blue-600"/>
                    <div className="h-2 w-2 rounded-full bg-blue-600"/>
                    <div className="h-2 w-2 rounded-full bg-blue-600"/>
                </div>
            </div>
        </div>
    );
}
