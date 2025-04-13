"use client";

import { Camera, Plus } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";
import { FormField } from "../ui/form";

export default function UploadImageComponent() {
  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const image = useWatch({
    control: form.control,
    name: "thumbnail_image",
    defaultValue: undefined,
  });

  const images = useWatch({
    control: form.control,
    name: "images",
    defaultValue: Array.from({ length: 3 }, () => undefined),
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
          name={"thumbnail_image"}
          render={({ field: { onChange } }) => (
            <div className="relative w-96 h-96">
              {image ? (
                <label htmlFor="image-cover">
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
                  <Input
                    type="file"
                    id="image-cover"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        onChange(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              ) : (
                <div>
                  <Input
                    type="file"
                    id="image-cover"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        onChange(e.target.files[0]);
                      }
                    }}
                  />
                  <Camera size={140} className="text-blue-800" />
                </div>
              )}
            </div>
          )}
        />
        <div className="w-full flex space-x-3 items-center">
          <div className="flex w-96 justify-between">
            {images?.map((_, index) => {
              return (
                <label
                  htmlFor={`images-${index}`}
                  key={index}
                  className="flex w-28 h-28 bg-gray-200 rounded-md items-center justify-center"
                >
                  {images[index] ? (
                    <div className="relative w-full h-full">
                      {images[index] instanceof File ? (
                        <Image
                          src={URL.createObjectURL(images[index])}
                          alt={images[index].name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={images[index]}
                          alt={images[index]}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <Input
                        type="file"
                        id={`images-${index}`}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            const newImages = [...images];
                            newImages[index] = e.target.files[0];
                            form.setValue("images", newImages);
                          }
                        }}
                      />
                      <Camera size={48} className="text-blue-800" />
                    </div>
                  )}
                </label>
              );
            })}
          </div>
          <div className="w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center">
            <Plus size={18} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
