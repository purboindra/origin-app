import { fetchCategories } from "@/action/category.action";
import CreateProductsContent from "@/components/shared/create-products-content";

export default async function CreateProductsPage() {
  const categories = await fetchCategories();

  console.log("categories", categories);

  return (
    <section className="w-full min-h-screen px-8 py-8">
      <CreateProductsContent />
    </section>
  );
}
