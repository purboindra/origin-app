"use client";

import { createProduct } from "@/action/products.action";
import { redirect } from "next/navigation";
import React, { useActionState } from "react";
import { toast } from "sonner";
import ProductInformationForm from "./product-information-form";
import UploadImageComponent from "./upload-image-component";

const initialState = {
  message: "",
  timestamp: 0,
  success: false,
};

export default function CreateProductsContent() {
  const [state, dispatch] = useActionState(createProduct, initialState);

  React.useEffect(() => {
    const isSuccess = state.success;
    if (isSuccess) {
      toast.success(state.message);
      redirect("/dashboard/products");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <div className="flex space-x-4 w-full h-full bg-white rounded-md p-12 gap-8">
        <UploadImageComponent thumbnailImage={null} variantImages={null} />
        <ProductInformationForm />
      </div>
    </form>
  );
}
