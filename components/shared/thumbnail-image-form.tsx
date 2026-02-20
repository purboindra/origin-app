"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ThumbnailImageFormProps {
  thumbnailImage: string | null;
}

export default function ThumbnailImageForm({
  thumbnailImage,
}: ThumbnailImageFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="relative flex h-[375px] w-[375px] rounded-xl bg-gray-300 items-center justify-center overflow-hidden cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        id="thumbnail_image"
        name="thumbnail_image"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(file);
        }}
      />

      {thumbnailImage ? (
        <Image
          src={thumbnailImage}
          alt="thumbnail"
          className="w-full h-full object-cover rounded-xl"
          fill
        />
      ) : image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="thumbnail"
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <Camera size={140} className="text-blue-800" />
      )}
    </div>
  );
}
