import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryOptions } from "./category-options";
import CalorOptionsForm from "./color-options-form";
import { SubmitButtonCreatePruduct } from "./submit-button-create-pruduct";

export default function ProductInformationForm() {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <h1 className="text-4xl font-semibold text-blue-800">
        Keterangan Produk
      </h1>
      <Input className="rounded-md" id="name" name="name" autoComplete="off" placeholder="Evil Rabbit" />
      <div className="flex gap-6">
        <Input className="rounded-md" id="price" name="price" autoComplete="off" placeholder="Rp" />
        <Input className="rounded-md" id="stock" name="stock" autoComplete="off" placeholder="Stok" />
      </div>
      <Textarea className="rounded-md" id="description" name="description" autoComplete="off" placeholder="Deskripsi" />
      <div className="flex space-x-12">
        <CategoryOptions />
        <CalorOptionsForm />
      </div>
      <SubmitButtonCreatePruduct />
    </div>
  );
}
