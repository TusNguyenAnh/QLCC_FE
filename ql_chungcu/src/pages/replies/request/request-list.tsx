"use client";

import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  User,
  MapPin,
  Loader2,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import type { Task } from "@/types/Task.ts";
import {
  formatDate,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "@/utils/reply-constant.ts";
import { Button } from "@/components/ui/button.tsx";

interface RequestListProps {
  requests: Task[] | null;
  onSelectRequest: (request: Task) => void;
  loading?: boolean;
  type: string;
}

export function RequestList({
  requests,
  onSelectRequest,
  loading,
  type,
}: RequestListProps) {
  if (!Array.isArray(requests) || requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Không có yêu cầu nào
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-1" />
          Loading...
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card
              key={request.id}
              className="border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                      {type == "apd" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : type == "pd" ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {request.id}
                      </div>
                      <div className="text-sm text-slate-500">
                        {request.type_name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/*<Badge*/}
                    {/*  variant="outline"*/}
                    {/*  className={`${*/}
                    {/*    STATUS_COLORS[request.status]*/}
                    {/*  } border-0 font-medium`}*/}
                    {/*>*/}
                    {/*  {request.status}*/}
                    {/*</Badge>*/}
                    <Badge
                      variant="outline"
                      className={`border-slate-200 font-semibold ${
                        PRIORITY_COLORS[request.priority_name]
                      }`}
                    >
                      {request.priority_name}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm font-medium text-slate-700">
                    {request.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Resident Info */}
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 flex-shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Cư dân
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {request.fullname}
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Vị trí
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {request.building_name}, Căn {request.apt_number}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 flex-shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Điện thoại
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {request.phone_number}
                      </div>
                    </div>
                  </div>

                  {/* Submitted Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 flex-shrink-0 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Ngày gửi
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {formatDate(request.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Approved Date */}
                  {type == "apd" || type == "rj" ? (
                    <div className="flex items-start gap-3">
                      {type == "apd" ? (
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {type == "apd" ? "Ngày xét duyệt" : "Ngày từ chối"}
                        </div>
                        <div className="text-sm font-medium text-slate-900">
                          {formatDate(request.updated_at)}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Action */}
                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 bg-transparent"
                    onClick={() => onSelectRequest(request)}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
