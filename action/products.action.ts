"use server";

import { createClient } from "@/lib/supabase/server";
import { createProductSchema } from "@/lib/validation";
import { ProductInterface } from "@/types";
import { FetchProductsParams } from "@/types/params.index";
import { File } from "buffer";
import { revalidateTag } from "next/cache";

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
        },
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
        const result = await fetch("/api/products/upload-image", {
          method: "POST",
          body: (() => {
            fileFormData.append("file", image);
            return fileFormData;
          })(),
        });

        if (result.ok) {
          const url = (await result.json()).url;
          images_url.push(url);
        }
      }

      imageIndex++;
    }

    revalidateTag("products", "max");

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

export async function fetchProducts(params: FetchProductsParams) {
  try {
    const { searchQuery, id } = params;

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select()
      .textSearch("name", searchQuery ?? "");

    if (error) {
      throw error;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return {
        data: null,
        message: "No products found",
        success: false,
      };
    }

    const products = data.map((data: any) => ({
      id: data._id.toString(),
      category: data.category,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      thumbnail_image: data.thumbnail_image,
      images: data.images,
      colors: data.colors,
    })) as ProductInterface[];

    return {
      data: products,
      message: "Success fetch products",
      success: true,
    };
  } catch (error) {
    console.error("Error fetch products", error);
    return {
      data: null,
      message: "Error fetch products",
      success: false,
    };
  }
}

export async function deleteProduct(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return {
        message: "Product not found",
        success: false,
        timestamp: Date.now(),
      };
    }

    // const db = await getDb();

    // const result = await db.collection("products").deleteOne({});

    // if (result.deletedCount === 0) {
    //   return {
    //     message: "Product not found",
    //     success: false,
    //   };
    // }

    // revalidateTag("products", "fast");

    return {
      message: "Success delete product!",
      success: true,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error delete product", error);
    return {
      message: "Error delete product",
      success: false,
      timestamp: Date.now(),
    };
  }
}
