"use server";

import { createProductSchema } from "@/lib/validation";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function createProduct(formData: FormData) {


  const thumbnail_image = formData.get("thumbnail_image") as File;
  const images = formData.getAll("images") as File[];
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const category = formData.get("category") as string;
  const colors = formData.getAll("colors") as string[];

  const validateFields = createProductSchema.safeParse({
    name,
    description,
    price,
    stock,
    category,
    colors,
thumbnail_image,
images
  });

  if(!validateFields.success){
    throw new Error(validateFields.error.message)
  }

  try {

    let thumbnail_image_url = "";
    let images_url: string[] = [];

    const {
      category,
      colors,
      description,
      images, 
      name,
      price,
      stock,thumbnail_image
    }=validateFields.data

    if(thumbnail_image && thumbnail_image instanceof File){
      const result =  await fetch(
        "http://localhost:3000/api/products/upload-image",
        {
          method: "POST",
          body: (() => {
            const f = new FormData();
            f.append("file", thumbnail_image);
            return f;
          })(),
        });

          if(result.ok){
            thumbnail_image_url = (await result.json()).url
          }

    }

    if(images && images.length > 0){
      for (let i = 0;i <images.length; i++){
        const image = images[i];
        if(image instanceof File){
          const result =  await fetch(
            "http://localhost:3000/api/products/upload-image",
            {
              method: "POST",
              body: (() => {
                const f = new FormData();
                f.append("file", image);
                return f;
              })(),
            });
    
              if(result.ok){
              const url = (await result.json()).url
              images_url.push(url) 
              }
        }
      }
    }

    

    revalidateTag("products");

    
  } catch (error) {
    console.error("Error create product",error);
    throw error
  }
}
