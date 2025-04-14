"use client";

import { Camera, Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";
import { FormControl, FormField, FormItem } from "../ui/form";
import VariantImagesForm from "./variant-images-form";
import { Input } from "../ui/input";

export default function UploadImageComponent() {
  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const image = useWatch({
    control: form.control,
    name: "thumbnail_image",
    defaultValue: undefined,
  });


  React.useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-4xl font-semibold text-blue-800">Upload Gambar</h1>
      <div className="mt-8 flex flex-col gap-6">
      <FormField
  control={form.control}
  name="thumbnail_image"
  render={({ field: { onChange } }) => (
    <FormItem>
      <FormControl>
        <div className="relative w-96 h-96">
          {image ? (
            <div>
              <Image
                src={
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : typeof image === "string"
                    ? image
                    : ""
                }
                alt="Thumbnail Image"
                fill
                className="object-cover rounded-md"
              />
              <label htmlFor="thumbnail_image" className="absolute inset-0 z-10 cursor-pointer" />
              <Input
                type="file"
                id="thumbnail_image"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex w-full h-full items-center justify-center bg-gray-200 rounded-md">
              <label htmlFor="thumbnail_image" className="cursor-pointer">
                <Camera size={140} className="text-blue-800" />
                <Input
                type="file"
                id="thumbnail_image"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
              </label>
             
            </div>
          )}
        </div>
      </FormControl>
    </FormItem>
  )}
/>

{/* VARIANT IMAGES */}

        <VariantImagesForm/>
      </div>
    </div>
  );
}
