import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        {
          message: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = await createClient();

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const fileUri = `data:${mimeType};base64,${base64}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(file.name, arrayBuffer);

    if (error) {
      throw error;
    }

    return Response.json(
      {
        message: "File uploaded successfully",
        url: data.fullPath,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(`Error from upload product image: ${error}`);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
