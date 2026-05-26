import { ProductInterface } from "@/types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryOptions } from "./category-options";
import ColorOptionsForm from "./color-options-form";
import { SubmitButtonCreateProduct } from "./submit-button-create-product";

interface ProductInformationFormProps {
  product?: ProductInterface;
}

export default function ProductInformationForm({
  product,
}: ProductInformationFormProps) {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <h1 className="text-4xl font-semibold text-blue-800">
        Keterangan Produk
      </h1>
      <Input
        className="rounded-md"
        id="name"
        name="name"
        autoComplete="off"
        defaultValue={product?.name}
      />
      <div className="flex gap-6">
        <Input
          className="rounded-md"
          id="price"
          name="price"
          autoComplete="off"
          defaultValue={product?.price}
        />
        <Input
          className="rounded-md"
          id="stock"
          name="stock"
          autoComplete="off"
          defaultValue={product?.stock}
        />
      </div>
      <Textarea
        className="rounded-md"
        id="description"
        name="description"
        autoComplete="off"
        defaultValue={product?.description}
      />
      <div className="flex space-x-12">
        <CategoryOptions categoryId={product?.category.id} />
        <ColorOptionsForm initialColors={product?.colors} />
      </div>
      <SubmitButtonCreateProduct />
    </div>
  );
}
