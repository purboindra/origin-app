import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const response = await supabase.from("categories").select();
    return Response.json(
      {
        message: "Success get categories",
        data: response.data ?? [],
      },
      {
        status: 200,
      },
    );
  } catch (error) {
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
