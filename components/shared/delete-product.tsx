"use client";

import { deleteProduct } from "@/action/products.action";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function DeleteProduct({ id }: { id: number }) {
 const deleteProductWithId = deleteProduct.bind(null, id);

   const { pending } = useFormStatus()

 
  return (
    <form action={deleteProductWithId}>
      <button type="submit" className="hover:cursor-pointer" disabled={pending}>
        <Trash className="w-auto h-auto text-red-500 p-1 shrink-0" />
      </button>
      <input type="hidden" value={id} name="id" />
    </form>
  );
}
