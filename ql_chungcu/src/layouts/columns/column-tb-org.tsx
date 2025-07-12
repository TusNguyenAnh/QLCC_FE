"use client"

import {MoreHorizontal, SquareMinus} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {clsx} from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button";
import {DataTableColumnHeader} from "@/layouts/data-table-header.tsx";

import type {ColumnDef} from "@tanstack/react-table"
import type {fillItemOrg, Org} from "@/types/Organization";

interface ComponentProps {
    handleUpdate: (org: fillItemOrg) => void
    handleDelete: (listOrg: string[]) => void

}

//Cột là nơi bạn xác định cốt lõi của bảng trông như thế nào. Chúng xác định dữ liệu sẽ được hiển thị, cách định dạng, sắp xếp và lọc dữ liệu.
export const columns = ({handleUpdate, handleDelete}: ComponentProps): ColumnDef<Org>[] => [
    {

        id: "select_all",
        header: ({table}) => {
            // const rows = table.getRowModel().rows;
            //
            // const selectableRows = rows.filter(
            //     (row) => row.original.status == "0"
            // );
            //
            // const selectedRows = selectableRows.filter(
            //     (row) => row.getIsSelected()
            // );
            //
            // const isAllSelected =
            //     selectableRows.length > 0 &&
            //     selectedRows.length === selectableRows.length;

            return (

                <Checkbox className="cursor-pointer"
                          checked={
                              // neu k select all dc sau khi xoa thi bo comment doan tren va thay gia tri isAllSelected
                              table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
                          }
                          onCheckedChange={(value) => {
                              table.getPrePaginationRowModel().rows.forEach((row) => {
                                  if (row.original.status == "0") {
                                      row.toggleSelected(!!value);
                                  }
                              });
                          }}
                          aria-label="Select all"
                />
            )
        },
        cell: ({row}) => (
            <Checkbox className="cursor-pointer"
                      checked={row.original.status == "0" ? row.getIsSelected() : false}
                      onCheckedChange={(value) => row.toggleSelected(!!value)}
                      aria-label="Select row"
            />
        ),
    },

    {
        accessorKey: 'org_code',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Mã đơn vị"/>
        ),

        cell: ({row}) => (
            <div>{row.getValue('org_code')}</div>
        ),
    },

    {
        accessorKey: 'org_name',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tên đơn vị"/>
        ),
        cell: ({row}) => (
            row.getCanExpand() ?
                (
                    <div
                        className="flex"
                        style={{paddingLeft: row.depth > 0 ? `${row.depth * 40 - 3}px` : ""}}>
                        <SquareMinus
                            onClick={row.getToggleExpandedHandler()}
                            className={clsx(
                                'p-1 pl-0', "cursor-pointer",
                                row.getIsExpanded() ? 'text-black-500' : 'text-gray-500'
                            )}
                        >
                        </SquareMinus>
                        {row.getValue('org_name')}
                    </div>
                ) :
                (
                    <div
                        style={{paddingLeft: row.depth > 0 ? `${row.depth * 40}px` : ""}}>
                        {row.getValue('org_name')}
                    </div>
                )
        ),
    },

    {
        accessorKey: 'description',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Mô tả"/>
        ),
        cell: ({row}) => (
            <div>{row.getValue('description')}</div>
        ),
    },

    {
        id: 'actions',
        enableHiding: false,
        cell: ({row}) => {
            const orgItemUpdate = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" disabled={row.original.status != "0"}>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => handleUpdate(orgItemUpdate)}
                        >
                            Sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => handleDelete([orgItemUpdate.id])}
                        >
                            Ngưng hoạt động</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
];
