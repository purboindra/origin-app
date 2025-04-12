"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "../ui/progress";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  no: string;
  name: string;
  popularity: number;
  sales: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
    meta: {
      headerClassName: "w-[24px]",
      cellClassName: "w-[24px]",
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    meta: {
      headerClassName: "w-[300px]",
      cellClassName: "w-[300px]",
    },
  },
  {
    accessorKey: "popularity",
    header: "Popularitas",
    cell: ({ row }) => {
      return (
        <Progress
          backgroundIndicatorColor="bg-blue-500/20"
          indicatorColor="bg-blue-500"
          value={row.getValue("popularity")}
          className={`w-[${row.getValue("popularity")}%]`}
        />
      );
    },
  },
  {
    accessorKey: "sales",
    header: "Penjualan",
    cell: ({ row }) => {
      return (
        <div className="w-16 h-7 bg-blue-500/20 border border-blue-500 rounded-sm flex items-center justify-center">
          <p className="text-[13px] text-blue-500">{`${row.getValue(
            "popularity"
          )}%`}</p>
        </div>
      );
    },
    meta: {
      headerClassName: "w-[82px]",
      cellClassName: "w-[82px]",
    },
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={`text-[13px] text-gray-400 ${header.column.columnDef.meta?.headerClassName}`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`text-gray-600 ${cell.column.columnDef.meta?.cellClassName} `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
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
  );
}
