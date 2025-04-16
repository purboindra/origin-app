"use client";

import React from "react";

import ThumbnailImageForm from "./thumbnail-image-form";
import VariantImagesForm from "./variant-images-form";

export default function UploadImageComponent() {
  return (
    <div className="flex max-w-[45%]flex-col">
      <h1 className="text-4xl font-semibold text-blue-800">Upload Gambar</h1>
      <div className="mt-8 flex flex-col gap-6">
        <ThumbnailImageForm />

        {/* VARIANT IMAGES */}
        <VariantImagesForm />
      </div>
    </div>
  );
}
