"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { ProductInterface } from "@/types";

export const productColumns: ColumnDef<ProductInterface>[] = [
  {
    accessorKey: "thumbnail_image",
    header: "Gambar",
    cell: ({ row }) => (
      <div className="w-24 h-16 relative">
        <Image
          src={row.getValue("thumbnail_image")}
          alt={row.getValue("name")}
          fill
          className="object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nama Produk",
    cell: ({ row }) => <div className="w-[240px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Kategory",
    cell: ({ row }) => <div className="w-16">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stok",
    cell: ({ row }) => <div className="w-12">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "colors",
    header: () => <div className="text-center">Warna Tersedia</div>,
    cell: ({ row }) => {
      const colors = row.getValue("colors") as string[];
      if (colors.length === 0) {
        return <div className="text-center">No colors available</div>;
      }

      return (
        <div className="w-full flex space-x-2 justify-start">
          {colors.map((color: string, index: number) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex w-20 h-10 bg-gray-300/20 border border-gray-400 rounded-sm justify-between items-center">
          <Edit className="w-auto h-auto text-gray-400 p-1 shrink-0" />
          <hr className="w-[1px] h-full border border-gray-400" />
          <Trash className="w-auto h-auto text-red-500 p-1 shrink-0" />
        </div>
      );
    },
  },
];

interface DataTableDemoProps {
  products: ProductInterface[];
}

export function DataTableDemo({ products }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: products,
    columns: productColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
