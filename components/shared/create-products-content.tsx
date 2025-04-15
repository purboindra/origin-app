"use client";

import UploadImageComponent from "./upload-image-component";
import ProductInformationForm from "./product-information-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validation";
import { createProduct } from "@/action/products.action";

export default function CreateProductsContent() {
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      colors: [],
      price: 0,
      stock: 0,
      images: [],
      thumbnail_image: "",
    },
  });

  const handleDispatch = (formData: FormData) => {
    const thumbnailImage = form.getValues("thumbnail_image");

    if (thumbnailImage instanceof File) {
      formData.set("thumbnail_image", thumbnailImage);
    }

    const variantImages = form.getValues("images");

    for (let i = 0; i < variantImages.length; i++) {
      const image = variantImages[i];
      if (image instanceof File) {
        formData.set(`images.${i}`, image);
      }
    }

    createProduct(formData);
  };

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
