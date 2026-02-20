"use client";

import ThumbnailImageForm from "./thumbnail-image-form";
import VariantImagesForm from "./variant-images-form";

interface UploadImageComponentProps {
  thumbnailImage: string | null;
  variantImages: File[];
}

export default function UploadImageComponent({
  thumbnailImage,
  variantImages,
}: UploadImageComponentProps) {
  return (
    <div className="flex w-[40%] flex-col">
      <h1 className="text-4xl font-semibold text-blue-800">Upload Gambar</h1>
      <div className="mt-8 flex flex-col gap-6 h-full">
        <ThumbnailImageForm thumbnailImage={thumbnailImage} />

        {/* VARIANT IMAGES */}
        <VariantImagesForm variantImages={variantImages} />
      </div>
    </div>
  );
}
