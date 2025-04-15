import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();

    const result = await db.collection("categories").find({}).toArray();

    const categories = result.map((cat) => ({
      ...cat,
      id: cat._id.toString(),
    }));

    return new Response(
      JSON.stringify({
        message: "Success get categories",
        data: categories,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        status: 500,
      }),
      {
        status: 500,
      }
    );
  }
}
