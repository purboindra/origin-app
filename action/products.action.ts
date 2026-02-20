"use server";

import { createClient } from "@/lib/supabase/server";
import { createProductSchema } from "@/lib/validation";
import { ProductInterface } from "@/types";
import { FetchProductsParams } from "@/types/params.index";
import { revalidateTag } from "next/cache";

export async function createProduct(prevState: any, formData: FormData) {
  console.log(Object.fromEntries(formData.entries()));

  const thumbnail_image = formData.get("thumbnail_image") as File;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number.parseFloat(formData.get("price") as string);
  const stock = Number.parseFloat(formData.get("stock") as string);
  const category = formData.get("category") as string;

  const supabase = await createClient();

  let variantImages: File[] = [];
  let colors: string[] = [];

  let imageIndex = 0;

  while (formData.has(`variant_images.${imageIndex}`)) {
    const image = formData.get(`variant_images.${imageIndex}`);
    console.log(image);
    if (image instanceof File && image.size > 0) {
      variantImages.push(image);
    }
    imageIndex++;
  }

  console.log(`Variant images: ${variantImages.length}`);

  let colorIndex = 0;

  while (formData.has(`colors.${colorIndex}`)) {
    const color = formData.get(`colors.${colorIndex}`);
    if (color) {
      colors.push(String(color));
    }
    colorIndex++;
  }

  const validateFields = createProductSchema.safeParse({
    name,
    description,
    price,
    stock,
    category,
    colors,
    thumbnail_image,
    variant_images: variantImages,
  });

  if (!validateFields.success) {
    throw new Error(validateFields.error.message);
  }

  try {
    const thumbnailImage = validateFields.data.thumbnail_image;
    let thumbnailImageUrl = "";
    const { data, error: thumbnailError } = await supabase.storage
      .from("products")
      .upload(thumbnailImage!.name, thumbnailImage!);

    if (thumbnailError) {
      console.error("Error upload thumbnail image", thumbnailError);
      throw thumbnailError;
    }

    thumbnailImageUrl = data.path;

    const variantImagesUrl: string[] = [];

    for (let i = 0; i < variantImages.length; i++) {
      const image = variantImages[i];
      const { data, error: variantImageError } = await supabase.storage
        .from("products")
        .upload(image.name, image);

      if (variantImageError) {
        console.error("Error upload variant image", variantImageError);
        throw variantImageError;
      }

      variantImagesUrl.push(data.path);
    }

    const { category, description, name, price, stock, thumbnail_image } =
      validateFields.data;

    const { error } = await supabase.from("products").insert({
      category_id: category,
      name,
      description,
      stock,
      price,
      colors,
      thumbnail_image: thumbnailImageUrl,
      variant_images: variantImagesUrl,
    });

    if (error) {
      console.error("Error insert product", error);
      throw error;
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
    const { data, error } = await supabase.from("products").select();

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

    const getPublicUrl = (path: string) => {
      return supabase.storage.from("products").getPublicUrl(path).data
        .publicUrl;
    };

    const products = data.map((item: any) => ({
      id: item.id,
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      thumbnail_image: item.thumbnail_image
        ? getPublicUrl(item.thumbnail_image)
        : null,
      variant_images: Array.isArray(item.variant_images)
        ? item.variant_images.map((path: string) => getPublicUrl(path))
        : [],
      colors: item.colors ?? [],
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
