import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import type {ValidationError} from "@/utils/excel";

interface ExcelErrorTableProps {
  errors: ValidationError[];
  maxRows?: number;
}

export function ExcelErrorTable({
  errors,
  maxRows = 10,
}: ExcelErrorTableProps) {
  const displayErrors = errors.slice(0, maxRows);
  const hasMore = errors.length > maxRows;

  return (
    <div className="mt-2">
      <div className="max-h-60 overflow-y-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Dòng</TableHead>
              <TableHead className="w-32">Trường</TableHead>
              <TableHead className="w-40">Giá trị</TableHead>
              <TableHead>Lỗi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayErrors.map((error, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {error.row || "N/A"}
                </TableCell>
                <TableCell className="text-xs">{error.field}</TableCell>
                <TableCell className="max-w-[150px] truncate text-xs">
                  {error.value?.toString() || "(trống)"}
                </TableCell>
                <TableCell className="text-xs text-red-600">
                  {error.error}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {hasMore && (
        <p className="text-xs text-gray-500 mt-2">
          Và {errors.length - maxRows} lỗi khác...
        </p>
      )}
    </div>
  );
}
