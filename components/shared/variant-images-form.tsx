"use client";

import { Camera, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";

export default function VariantImagesForm() {
  const [images, setImages] = useState([]);
  return (
    <div className=" flex w-full overflow-x-auto space-x-3 items-center">
      <div className="flex space-x-3 items-center">
        {[]?.map((_, index) => {
          return (
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
                    onChange={(e) => {}}
                  />
                  <Camera size={48} className="text-blue-800" />
                </div>
              )}
            </label>
          );
        })}
        <button
          className="w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center hover:cursor-pointer"
          type="button"
        >
          <Plus size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
