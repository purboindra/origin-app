import { fetchProducts } from "@/action/products.action";
import { ProductTable } from "@/components/shared/product-table";

export default async function DashboardProducts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = (await searchParams).q || "";

  const { data, message, success } = await fetchProducts({
    id: "",
    searchQuery: query || "",
  });

  if (!data || !success) {
    return (
      <section className="w-full min-h-screen px-8 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-blue-800">{`${message} with ${query}`}</h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-8 py-8">
      <ProductTable products={data} />
    </section>
  );
}
