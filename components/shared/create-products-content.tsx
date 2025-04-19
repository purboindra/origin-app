"use client";

import UploadImageComponent from "./upload-image-component";
import ProductInformationForm from "./product-information-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validation";
import { createProduct } from "@/action/products.action";
import React, { useActionState } from "react";
import { toast } from "sonner";
import { ProductInterface } from "@/types";

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

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      category: product?.category.name || "",
      colors: product?.colors || [],
      price: product?.price || 0,
      stock: product?.stock || 0,
      images: product?.images || [],
      thumbnail_image: product?.thumbnail_image || "",
    },
  });

  const handleDispatch = (formData: FormData) => {
    const thumbnailImage = form.getValues("thumbnail_image");

    if (thumbnailImage instanceof File) {
      formData.set("thumbnail_image", thumbnailImage);
    }

    const variantImages = form.getValues("images");

    if (variantImages) {
      for (let i = 0; i < variantImages.length; i++) {
        const image = variantImages[i];
        if (image instanceof File) {
          formData.set(`images.${i}`, image);
        }
      }
    }

    dispatch(formData);
  };

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
    <FormProvider {...form}>
      <form action={handleDispatch}>
        <div className="flex space-x-4 w-full h-full bg-white rounded-md p-12">
          <UploadImageComponent />
          <ProductInformationForm />
        </div>
      </form>
    </FormProvider>
  );
}
