"use client";

import { createProductSchema } from "@/lib/validation";
import { useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Camera, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { FormField } from "../ui/form";

export default function VariantImagesForm() {
  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const images = useWatch({
    control: form.control,
    name: "images",
    defaultValue: Array.from({ length: 3 }, () => ""),
  });

  const handleAddImageSlot = () => {
    form.setValue("images", [...(images ?? []), ""]);
  };

  return (
    <div className=" flex space-x-3 items-center">
      <div className="flex space-x-3 overflow-x-auto">
        {images?.map((_, index) => {
          return (
            <FormField
              control={form.control}
              name={`images.${index}`}
              key={index}
              render={({ field: { onChange, ...fieldProps } }) => (
                <label
                  htmlFor={`images.${index}`}
                  key={index}
                  className="flex w-28 h-28 bg-gray-200 rounded-md items-center justify-center cursor-pointer"
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
                        id={`images.${index}`}
                        name={`images.${index}`}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            onChange(e.target.files[0]);
                          }
                        }}
                      />
                      <Camera size={48} className="text-blue-800" />
                    </div>
                  )}
                </label>
              )}
            />
          );
        })}
      </div>

      <button
        className="w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center hover:cursor-pointer"
        type="button"
        onClick={() => handleAddImageSlot()}
      >
        <Plus size={18} className="text-white" />
      </button>
    </div>
  );
}
