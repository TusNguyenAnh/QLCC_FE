'use client';

import {Fragment, useEffect, useState} from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table.tsx';

import clsx from 'clsx';
import {useIsMobile} from "@/hooks/use-mobile.ts";

import {
    type ColumnDef,
    type SortingState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    getExpandedRowModel, getFilteredRowModel,
} from '@tanstack/react-table';
import {DataTablePagination} from "@/layouts/data-table-pagination.tsx";

import {DataTableViewOptions} from "@/layouts/data-table-view.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    columnLabels: Record<string, string>;
    data: TData[];
    keyword: string
    showColumns?: boolean;
    rowSelection: any,
    setRowSelection: any
    handleDelete: (listItem: string[]) => void
}

export function DataTable<TData, TValue>
(
    {
        columns,
        columnLabels,
        data,
        keyword,
        rowSelection,
        setRowSelection,
        handleDelete,
    }: DataTableProps<TData, TValue>
) {
    const isMobile = useIsMobile();
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable<TData>({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        enableRowSelection: true, // Chỉ cho phép chọn hàng có status là "0"
        getRowId: row => row.id,
        initialState: {
            pagination: {
                pageIndex: 0,     // Trang bắt đầu (0 là trang đầu)
                pageSize: 10,     // Số dòng mỗi trang
            },
        },
        state: {
            sorting,
            rowSelection
        }
    });

    useEffect(() => {
        table.setGlobalFilter(keyword);
    }, [keyword])

    const ids = table.getSelectedRowModel().rows.map((r) => r.original.id)

    return (
        <div>
            <div className="flex mb-4">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" disabled={ids.length < 2}>Thực hiện hàng loạt</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem onClick={() => handleDelete(ids)}>Ngưng hoạt động</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <DataTableViewOptions table={table} columnLabels={columnLabels}></DataTableViewOptions>
            </div>

            <div className="relative overflow-auto max-h-[500px]">
                <Table className="table-fixed w-full">
                    <TableHeader className={clsx(
                        'sticky top-0 z-10',
                        isMobile ? 'bg-gray-100' : 'bg-gray-200')}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={clsx(
                                            'text-sm font-medium',
                                            isMobile ? 'px-2 py-1' : 'px-4 py-2',
                                            header.id == "select_all" ? "w-10 pr-10" : "",
                                            header.id == "stt" ? "w-20 pr-20" : "",
                                        )}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                        className={clsx(
                                            'hover:bg-gray-50',
                                            isMobile ? 'text-sm' : 'text-base',
                                            // row.depth > 0 && 'bg-gray-50', // Sub-row có nền nhạt hơn
                                            row.original.status != "0" ? "bg-gray-100 text-gray-400 pointer-events-none" : ""
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={clsx(
                                                    "whitespace-normal break-words",
                                                    isMobile ? 'px-2 py-1' : 'px-4 py-2',
                                                    row.depth > 0 && 'border-t-0' // Sub-row không có viền trên
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Phân trang */}
            <DataTablePagination table={table}></DataTablePagination>
        </div>
    );
}