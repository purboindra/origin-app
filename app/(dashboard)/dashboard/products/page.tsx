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

  console.log("Data is", data);

  return (
    <section className="w-full min-h-screen px-8 py-8">
      <DataTableDemo />
    </section>
  );
}
