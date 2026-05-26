"use server";

import { createClient } from "@/lib/supabase/server";
import { createProductSchema, editProductSchema } from "@/lib/validation";
import { ProductInterface } from "@/types";
import { FetchProductsParams } from "@/types/params.index";
import { revalidateTag } from "next/cache";

export async function createProduct(prevState: any, formData: FormData) {
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
    if (image instanceof File && image.size > 0) {
      variantImages.push(image);
    }
    imageIndex++;
  }

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

  try {
    if (!validateFields.success) {
      throw new Error(validateFields.error.message);
    }
    const thumbnailImage = validateFields.data.thumbnail_image;
    const thumbnailFileExt = thumbnailImage?.name.split(".").pop();
    const { data, error: thumbnailError } = await supabase.storage
      .from("products")
      .upload(`${crypto.randomUUID()}.${thumbnailFileExt}`, thumbnailImage!);

    if (thumbnailError) {
      console.error("Error upload thumbnail image", thumbnailError);
      throw thumbnailError;
    }

    const thumbnailImageUrl = data.path;

    const variantImagesUrl: string[] = [];

    for (let i = 0; i < variantImages.length; i++) {
      const image = variantImages[i];
      const variantImageFileExt = image?.name.split(".").pop();
      const { data, error: variantImageError } = await supabase.storage
        .from("products")
        .upload(`${crypto.randomUUID()}.${variantImageFileExt}`, image);

      if (variantImageError) {
        console.error("Error upload variant image", variantImageError);
        throw variantImageError;
      }

      variantImagesUrl.push(data.path);
    }

    const { category, description, name, price, stock } = validateFields.data;

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
      message: "Error creating product",
      timestamp: Date.now(),
    };
  }
}

export async function fetchProductById(id: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        description,
        price,
        stock,
        thumbnail_image,
        variant_images,
        colors,
        categories(
          id,
          label
        )
      `,
      )
      .eq("id", id)
      .limit(1);

    if (error) {
      throw error;
    }

    const firstData = data[0];

    const getPublicUrl = (path: string) => {
      return supabase.storage.from("products").getPublicUrl(path).data
        .publicUrl;
    };

    const product = {
      id: firstData.id,
      category: firstData.categories,
      name: firstData.name,
      description: firstData.description,
      price: firstData.price,
      stock: firstData.stock,
      thumbnail_image: getPublicUrl(firstData.thumbnail_image),
      variant_images: firstData.variant_images.map((imagePath: string) =>
        getPublicUrl(imagePath),
      ),
      colors: firstData.colors,
    } as unknown as ProductInterface;

    return {
      data: product,
      message: "Success get product",
      success: true,
    };
  } catch (error) {
    console.error("Error fetch product by id", error);
    return {
      data: null,
      message: "Error fetch products",
      success: false,
    };
  }
}

export async function fetchProducts(params: FetchProductsParams) {
  try {
    const { searchQuery, page, limit } = params;

    const supabase = await createClient();

    const pageNumber = Number(page ?? "1");
    const pageSize = Number(limit ?? "20");
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase.from("products").select(`
        id,
        name,
        description,
        price,
        stock,
        thumbnail_image,
        variant_images,
        colors,
        categories(
          id,
          label
        )
      `);

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data: rawData, error } = await query
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const data = rawData ?? [];

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
      category: item.categories,
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

export async function deleteProduct(id: number) {
  const supabase = await createClient();

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("thumbnail_image, variant_images")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;
  if (!product) throw new Error("Product not found");

  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  const filesToDelete = [
    product.thumbnail_image,
    ...(product.variant_images ?? []),
  ].filter(Boolean);

  if (filesToDelete.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("products")
      .remove(filesToDelete);

    if (storageError) {
      console.error("Storage cleanup failed:", storageError);
    }
  }

  revalidateTag("products", "max");
}

export async function editProduct(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
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
    if (image instanceof File && image.size > 0) {
      variantImages.push(image);
    }
    imageIndex++;
  }

  let colorIndex = 0;

  while (formData.has(`colors.${colorIndex}`)) {
    const color = formData.get(`colors.${colorIndex}`);
    if (color) {
      colors.push(String(color));
    }
    colorIndex++;
  }

  const validateFields = editProductSchema.safeParse({
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
    const thumbnailImageFileExt = thumbnailImage?.name.split(".").pop();
    const { data, error: thumbnailError } = await supabase.storage
      .from("products")
      .upload(
        `${crypto.randomUUID()}.${thumbnailImageFileExt}`,
        thumbnailImage!,
      );

    if (thumbnailError) {
      console.error("Error upload thumbnail image", thumbnailError);
      throw thumbnailError;
    }

    const thumbnailImageUrl = data.path;

    const variantImagesUrl: string[] = [];

    for (let i = 0; i < variantImages.length; i++) {
      const image = variantImages[i];
      const variantImageFileExt = image?.name.split(".").pop();
      const { data, error: variantImageError } = await supabase.storage
        .from("products")
        .upload(`${crypto.randomUUID()}.${variantImageFileExt}`, image);

      if (variantImageError) {
        console.error("Error upload variant image", variantImageError);
        throw variantImageError;
      }

      variantImagesUrl.push(data.path);
    }

    const { category, description, name, price, stock } = validateFields.data;

    const { error } = await supabase
      .from("products")
      .update({
        category_id: category,
        name,
        description,
        stock,
        price,
        colors,
        thumbnail_image: thumbnailImageUrl,
        variant_images: variantImagesUrl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error update product", error);
      throw error;
    }

    revalidateTag("products", "max");

    return {
      success: true,
      message: "Product updated successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error update product", error);
    return {
      success: false,
      message: "Error updating product",
      timestamp: Date.now(),
    };
  }
}
