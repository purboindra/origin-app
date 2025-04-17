import { ProductsTableInfo } from "@/components/shared/products-table-info";
import { TotalIncome } from "@/components/shared/total-income";
import { ChartAreaIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="w-full min-h-screen px-8 py-8">
      <div className="flex flex-col space-y-8">
        <div className="py-12 px-10 flex flex-col gap-8 bg-white rounded-md">
          <h1 className="text-4xl font-semibold text-blue-800">
            Total Pendapatan
          </h1>
          <TotalIncome />
        </div>
        <div className="mt-8 flex w-full gap-8">
          <div className="flex flex-1 flex-col bg-white rounded-md px-6 py-5">
            <h1 className="text-2xl font-semibold text-blue-800">
              Produk Terlaris
            </h1>
            <ProductsTableInfo />
          </div>
          <div className="flex flex-1 flex-col bg-white rounded-md px-6 py-5">
            <h1 className="text-2xl font-semibold text-blue-800">
              Penjualan Hari Ini
            </h1>
            <h3 className="text-slate-500 text-base">Ringkasan</h3>
            <div className="flex gap-8 mt-8">
              <div className="p-5 bg-red-200 rounded-md flex flex-col w-48">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <ChartAreaIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-blue-800">
                  100.000.000
                </h2>
                <h3 className="text-base text-slate-500 font-medium">
                  Total Penjualan
                </h3>
                <p className="text-xs text-blue-500">+10%</p>
              </div>
              {/* 2 */}
              <div className="p-5 bg-yellow-200 rounded-md flex flex-col w-48">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <ChartAreaIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-blue-800">300</h2>
                <h3 className="text-base text-slate-500 font-medium">
                  Total Pesanan
                </h3>
                <p className="text-xs text-blue-500">+10%</p>
              </div>
              {/* 3 */}
              <div className="p-5 bg-green-200 rounded-md flex flex-col w-48">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <ChartAreaIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-blue-800">20</h2>
                <h3 className="text-base text-slate-500 font-medium">
                  Produk Terjual
                </h3>
                <p className="text-xs text-blue-500">+10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
