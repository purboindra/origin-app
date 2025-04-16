import { fetchProducts } from "@/action/products.action";
import { DataTableDemo } from "@/components/shared/product-table";

export default async function DashboardProducts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = (await searchParams).q || "";

  console.log("Query is", query);

  const { data, message, success } = await fetchProducts({
    searchQuery: query || "",
  });

  if (!data || !success) {
    return (
      <section className="w-full min-h-screen px-8 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-blue-800">{message}</h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-8 py-8">
      <DataTableDemo />
    </section>
  );
}
