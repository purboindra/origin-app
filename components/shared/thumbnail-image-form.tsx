"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";

export default function ThumbnailImageForm() {
  const [image, setImage] = useState();

  return (
    <>
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
          <label
            htmlFor="thumbnail_image"
            className="absolute inset-0 z-10 cursor-pointer"
          />
          <Input
            type="file"
            accept="image/*"
            name="thumbnail_image"
            id="thumbnail_image"
            className="hidden"
            onChange={(e) => {}}
          />
        </div>
      ) : (
        <div className="flex w-full h-full items-center justify-center bg-gray-200 rounded-md">
          <label htmlFor="thumbnail_image" className="cursor-pointer">
            <Camera size={140} className="text-blue-800" />
            <Input
              type="file"
              id="thumbnail_image"
              name="thumbnail_image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {}}
            />
          </label>
        </div>
      )}
    </>
  );
}
