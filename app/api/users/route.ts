export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      name,
      image,
      email_verified,
      provider,
      provider_id,
      access_token,
      refresh_token,
      expires_at,
    } = body;

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "No user found",
          success: false,
          data: null,
        }),
        {
          status: 400,
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Success update user",
        data: null,
        success: true,
      }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        data: null,
        success: false,
      }),
      {
        status: 500,
      },
    );
  }
}
