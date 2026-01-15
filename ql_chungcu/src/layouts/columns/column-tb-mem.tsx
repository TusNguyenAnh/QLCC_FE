"use client";

import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableColumnHeader } from "@/layouts/data-table-header.tsx";

import type { ColumnDef } from "@tanstack/react-table";
import type { fillItemBd } from "@/types/Building.ts";
import type { Resident } from "@/types/Resident.ts";
import { POSITION } from "@/utils/mem-constant.ts";

interface CusItem {
  show?: boolean;
  onClick?: (rows: object) => void;
}

interface ComponentProps {
  handleUpdate?: (org: fillItemBd) => void;
  handleDelete?: (listBd: string[]) => void;
  cusItem?: Record<string, CusItem>;
}

//Cột là nơi bạn xác định cốt lõi của bảng trông như thế nào. Chúng xác định dữ liệu sẽ được hiển thị, cách định dạng, sắp xếp và lọc dữ liệu.
export const ColumnsMem = ({
  handleUpdate,
  handleDelete,
  cusItem,
}: ComponentProps): ColumnDef<Resident>[] => [
  {
    id: "select_all",
    header: ({ table }) => {
      return (
        <Checkbox
          className="cursor-pointer"
          checked={
            // neu k select all dc sau khi xoa thi bo comment doan tren va thay gia tri isAllSelected
            table.getIsAllPageRowsSelected() ||
            table.getIsSomePageRowsSelected()
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
      );
    },
    cell: ({ row }) => (
      <Checkbox
        className="cursor-pointer"
        checked={row.original.status == "0" ? row.getIsSelected() : false}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },

  {
    accessorKey: "cccd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số căn cước" />
    ),
    cell: ({ row }) => <div>{row.getValue("cccd")}</div>,
  },

  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cư dân" />
    ),
    cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
  },

  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày sinh" />
    ),
    cell: ({ row }) => <div>{row.getValue("birthday")}</div>,
  },

  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giới tính" />
    ),
    cell: ({ row }) => <div>{row.getValue("gender") == 0 ? "Nam" : "Nữ"}</div>,
  },

  {
    accessorKey: "position",
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vị trí" />
    ),
    cell: ({ row }) => {
      return cusItem && cusItem["updatePosition"]?.show == true ? (
        <Select
          value={row.original.position}
          onValueChange={(value) =>
            cusItem["updatePosition"].onClick
              ? cusItem["updatePosition"].onClick({
                  row: row.original,
                  position: value,
                })
              : null
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn vị trí" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(POSITION).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const resItemUpdate = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer"
              disabled={row.original.status != "0"}
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdate(resItemUpdate)}>
              Sửa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete([resItemUpdate.id])}>
              Ngưng hoạt động
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
