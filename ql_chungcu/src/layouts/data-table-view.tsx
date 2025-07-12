"use client"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu"
import {Settings2} from "lucide-react"
import type {Table} from "@tanstack/react-table";

// anh xa id sang ten cu the
const columnLabels: Record<string, string> = {
    org_code: "Mã đơn vị",
    org_name: "Tên đơn vị",
    description: "Mô tả",
}

export function DataTableViewOptions<TData>({
                                                table,
                                            }: {
    table: Table<TData>
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <Settings2/>
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Ẩn/hiện cột</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {columnLabels[column.id] ?? column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
