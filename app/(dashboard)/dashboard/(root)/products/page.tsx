import { fetchProducts } from "@/action/products.action";
import { ProductTable } from "@/components/shared/product-table";
import { Suspense } from "react";

export default async function DashboardProducts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = "1", limit = "10", q = "" } = await searchParams;

  const { data, message, success } = await fetchProducts({
    searchQuery: q,
    page: page,
    limit: limit,
  });

  if (!data || !success) {
    return (
      <section className="w-full min-h-screen p-8 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-blue-800">{`${message} with ${q}`}</h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen p-8">
     <Suspense>
       <ProductTable products={data} />
     </Suspense>
    </section>
  );
}
