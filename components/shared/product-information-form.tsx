import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CategoryOptions } from "./category-options";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";
import { FormControl, FormField, FormItem } from "../ui/form";
import CalorOptionsForm from "./color-options-form";
import { SubmitButtonCreatePrudct } from "./submit-button-create-prudct";

export default function ProductInformationForm() {
  const form = useFormContext<z.infer<typeof createProductSchema>>();

  return (
    <div className="flex flex-1 flex-col space-y-4">
      <h1 className="text-4xl font-semibold text-blue-800">
        Keterangan Produk
      </h1>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Nama Produk" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Rp" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Stok" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <Textarea placeholder="Deskripsi" maxLength={12} {...field} />
        )}
      />
      <div className="flex space-x-12">
        <CategoryOptions />
        <CalorOptionsForm />
      </div>
      <SubmitButtonCreatePrudct />
    </div>
  );
}
