"use server";

import { getDb } from "@/lib/db";
import { createProductSchema } from "@/lib/validation";
import { File } from "buffer";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProduct(prevState: any, formData: FormData) {
  const thumbnail_image = formData.get("thumbnail_image");
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number.parseFloat(formData.get("price") as string);
  const stock = Number.parseFloat(formData.get("stock") as string);
  const category = formData.get("category") as string;
  const colors = formData.getAll("colors") as string[];

  const fileFormData = new FormData();

  const validateFields = createProductSchema.safeParse({
    name,
    description,
    price,
    stock,
    category,
    colors,
    thumbnail_image,
  });

  if (!validateFields.success) {
    throw new Error(validateFields.error.message);
  }

  try {
    const db = await getDb();

    let thumbnail_image_url = "";
    const images_url: string[] = [];

    const {
      category,
      colors,
      description,
      name,
      price,
      stock,
      thumbnail_image,
    } = validateFields.data;

    if (
      thumbnail_image &&
      thumbnail_image instanceof File &&
      thumbnail_image.size > 0
    ) {
      const result = await fetch(
        "http://localhost:3000/api/products/upload-image",
        {
          method: "POST",
          body: (() => {
            fileFormData.append("file", thumbnail_image);
            return fileFormData;
          })(),
        }
      );

      if (result.ok) {
        thumbnail_image_url = (await result.json()).url;
      }
    }

    let imageIndex = 0;

    while (formData.has(`images.${imageIndex}`)) {
      fileFormData.delete("file");

      const image = formData.get(`images.${imageIndex}`);
      if (image instanceof File && image.size > 0) {
        const result = await fetch(
          "http://localhost:3000/api/products/upload-image",
          {
            method: "POST",
            body: (() => {
              fileFormData.append("file", image);
              return fileFormData;
            })(),
          }
        );

        if (result.ok) {
          const url = (await result.json()).url;
          images_url.push(url);
        }
      }

      imageIndex++;
    }

    await db.collection("products").insertOne({
      name,
      description,
      category,
      colors,
      price,
      stock,
      images: images_url,
      thumbnail_image: thumbnail_image_url,
    });

    revalidateTag("products");

    return {
      success: true,
      message: "Product created successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error create product", error);
    return {
      success: false,
      message: "Product created successfully",
      timestamp: Date.now(),
    };
  }
}
