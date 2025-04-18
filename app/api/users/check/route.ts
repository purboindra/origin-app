import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Email is required",
          success: false,
          data: null,
        }),
        {
          status: 400,
        }
      );
    }

    const db = await getDb();

    const result = await db.collection("users").findOne({
      email,
    });

    if (!result) {
      return new Response(
        JSON.stringify({
          message: "User not found",
          success: false,
          data: null,
        }),
        {
          status: 400,
        }
      );
    }

    console.log("users/check", result);

    return new Response(
      JSON.stringify({
        data: {
          email: result.email,
        },
        message: "User Found",
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        success: false,
        data: null,
      }),
      {
        status: 500,
      }
    );
  }
}
