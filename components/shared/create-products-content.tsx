"use client";

import UploadImageComponent from "./upload-image-component";
import ProductInformationForm from "./product-information-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/validation";

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

  return (
    <FormProvider {...form}>
      <div className="flex space-x-4 w-full h-full bg-white rounded-md p-12">
        <UploadImageComponent />
        <ProductInformationForm />
      </div>
    </FormProvider>
  );
}
