"use client";

import { deleteProduct } from "@/action/products.action";
import { Trash } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function DeleteProduct({ id }: { id: string }) {
  const [state, dispatch, pending] = useActionState(deleteProduct, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (!state.success) {
      toast.error(state.message);
    }
  }, [state.message, state.success, state.timestamp]);

  return (
    <form action={dispatch}>
      <button type="submit" className="hover:cursor-pointer">
        <Trash className="w-auto h-auto text-red-500 p-1 shrink-0" />
      </button>
      <input type="hidden" value={id} name="id" />
    </form>
  );
}
