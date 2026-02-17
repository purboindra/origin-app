"use server";

import { getDb } from "@/lib/db";

export async function fetchCategories() {
  try {
    const db = await getDb();

    const result = await db.collection("categories").find({}).toArray();

    const categories = result.map((cat: any) => ({
      ...cat,
      id: cat._id.toString(),
    }));

    return categories;
  } catch (error) {
    console.error("Error fetch categories", error);
    return [];
  }
}
