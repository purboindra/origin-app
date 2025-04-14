"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(formData: FormData) {
  const file = formData.get("thumbnail_image") as File;

  const response = await fetch(
    "http://localhost:3000/api/products/upload-image",
    {
      method: "POST",
      body: (() => {
        const f = new FormData();
        f.append("file", file);
        return f;
      })(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();

  console.log("data upload file: ", data);
}
