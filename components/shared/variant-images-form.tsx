"use client";

import { Camera, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const INITIAL_SLOTS = 3;

export default function VariantImagesForm({
  variantImages,
}: {
  variantImages: File[] | null;
}) {
  const [images, setImages] = useState<(File | null)[]>(
    Array(INITIAL_SLOTS).fill(null),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleRemove = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = "";
    }

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = null;

      while (
        updated.length > INITIAL_SLOTS &&
        updated[updated.length - 1] === null
      ) {
        updated.pop();
      }

      return updated;
    });
  };

  useEffect(() => {
    if (variantImages && variantImages.length > 0) {
      setImages(variantImages);
    }
  }, [variantImages]);

  return (
    <div className="flex w-full overflow-x-auto space-x-3 items-center">
      <div className="flex space-x-3 items-center">
        {images.map((file, index) => (
          <div key={index} className="relative w-28 h-28 flex-shrink-0">
            <input
              type="file"
              id={`variant_images_${index}`}
              name={`variant_images.${index}`}
              accept="image/*"
              className="hidden"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleFileChange(e, index)}
            />

            {file ? (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2.5 right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 hover:cursor-pointer"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <label
                htmlFor={`variant_images_${index}`}
                className="flex w-full h-full bg-gray-200 rounded-md items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <Camera size={36} className="text-blue-800 opacity-60" />
              </label>
            )}
          </div>
        ))}
      </div>
      <Button
        className="w-12 h-12 bg-blue-800 rounded-md flex items-center justify-center hover:cursor-pointer"
        type="button"
        onClick={() => {
          setImages((prev) => [...prev, null]);
        }}
      >
        <Plus size={18} className="text-white" />
      </Button>
    </div>
  );
}
