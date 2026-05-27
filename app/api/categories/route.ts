import { createClient } from "@/lib/supabase/server";
import { CategoryInterface } from "@/types";

export async function GET() {
  try {
    const supabase = await createClient();
    const response = await supabase.from("categories").select();

    const categories: CategoryInterface[] = (response.data || []).map(
      (category) => ({
        description: category.description,
        id: category.id,
        label: category.label,
        slug: category.slug,
      }),
    );

    return Response.json(
      {
        message: "Success get categories",
        data: categories,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(`error: ${error}`);
    return Response.json(
      {
        message: "Internal Server Error",
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
