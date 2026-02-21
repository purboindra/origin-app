import { fetchProductById } from "@/action/products.action";
import EditProductsContent from "@/components/shared/edit-products-content";

export default async function DashboardProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id || "";

  const { data, message, success } = await fetchProductById(id);

  if (!data || !success) {
    return (
      <section className="w-full min-h-screen px-8 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-blue-800">{`${message}`}</h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-8 py-8">
      <EditProductsContent product={data!} />
    </section>
  );
}
