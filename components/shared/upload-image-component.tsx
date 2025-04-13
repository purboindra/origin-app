"use client";

import { Camera, Plus } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";

export default function UploadImageComponent() {
  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const [imageCover, setImageCover] = React.useState<File | null>(null);
  const [images, setImages] = React.useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-4xl font-semibold text-blue-800">Upload Gambar</h1>
      <div className="mt-8 flex flex-col gap-6">
        {imageCover ? (
          <label htmlFor="image-cover" className="relative w-96 h-96">
            <Image
              src={URL.createObjectURL(imageCover)}
              alt={imageCover.name}
              fill
              className="object-cover rounded-md"
            />
            <Input
              type="file"
              id="image-cover"
              className="hidden"
              value={""}
              onChange={(e) => {
                if (e.target.files) {
                  setImageCover(e.target.files[0]);
                }
              }}
            />
          </label>
        ) : (
          <label
            htmlFor="image-cover"
            className="flex w-96 h-96 bg-gray-300 rounded-md items-center justify-center"
          >
            <div>
              <Input
                type="file"
                id="image-cover"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageCover(e.target.files[0]);
                  }
                }}
              />
              <Camera size={140} className="text-blue-800" />
            </div>
          </label>
        )}
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
                      <Image
                        src={URL.createObjectURL(images[index])}
                        alt={images[index].name}
                        fill
                        className="object-cover"
                      />
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
                            setImages(newImages);
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
