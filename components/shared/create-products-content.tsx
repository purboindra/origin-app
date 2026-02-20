"use client";

import { createProduct } from "@/action/products.action";
import { ProductInterface } from "@/types";
import React, { useActionState } from "react";
import { toast } from "sonner";
import ProductInformationForm from "./product-information-form";
import UploadImageComponent from "./upload-image-component";

const initialState = {
  message: "",
  timestamp: 0,
  success: false,
};

interface ProductProps {
  product?: ProductInterface | null;
}

export default function CreateProductsContent({ product }: ProductProps) {
  const [state, dispatch] = useActionState(createProduct, initialState);

  React.useEffect(() => {
    if (state.message && state.timestamp) {
      if (!state.success) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state.message, state.timestamp, state.success]);

  return (
    <form action={dispatch}>
      <div className="flex space-x-4 w-full h-full bg-white rounded-md p-12 gap-8">
        <UploadImageComponent />
        <ProductInformationForm />
      </div>
    </form>
  );
}
