"use client";

import { blobToFile } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ThumbnailImageFormProps {
  thumbnailImage: string | null;
}

export default function ThumbnailImageForm({
  thumbnailImage,
}: ThumbnailImageFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncImage = async () => {
      if (!thumbnailImage) return;

      let fileToSync: File | null = null;

      try {
        fileToSync = await blobToFile(thumbnailImage, "thumbnail.jpg");
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }

      if (fileToSync) {
        setImage(fileToSync);

        if (inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(fileToSync);
          inputRef.current.files = dataTransfer.files;
        }
      }
    };

    syncImage();
  }, [thumbnailImage]);

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

      {image ? (
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
