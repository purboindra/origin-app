export async function GET() {
  try {
    return new Response(
      JSON.stringify({
        message: "Success get categories",
        data: [],
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        data: null,
      }),
      {
        status: 500,
      },
    );
  }
}
