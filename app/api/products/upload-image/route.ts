import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const fileUri = `data:${mimeType};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "product-images",
    });

    return new Response(
      JSON.stringify({
        message: "File uploaded successfully",
        url: uploadResult.secure_url,
      }),
      {
        status: 200,
        statusText: "File uploaded successfully",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(`Error from upload product image: ${error}`);
    return new Response(
      JSON.stringify({
        message: "Error from upload product image",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
