import { columns, DataTable, Payment } from "./data-table";

export const payments: Payment[] = [
  {
    id: "1",
    no: "1",
    name: "Selimut Tetangga",
    popularity: 100,
    sales: 50,
  },
  {
    id: "2",
    no: "2",
    name: "Handuk Portugal",
    popularity: 75,
    sales: 40,
  },
  {
    id: "3",
    no: "3",
    name: "Sepatu Pemuda Pancasila",
    popularity: 50,
    sales: 30,
  },
  {
    id: "4",
    no: "4",
    name: "Jam Tangan Golkar",
    popularity: 25,
    sales: 20,
  },
];

export function ProductsTableInfo() {
  return <DataTable columns={columns} data={payments} />;
}
