import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required",
  }),
  description: z.string().min(1, {
    message: "Product description is required",
  }),
  price: z.number().min(1, {
    message: "Product price is required",
  }),
  stock: z.number().min(0, { message: "Product stock should be positive" }),
  category: z.string().min(1, {
    message: "Product category is required",
  }),
  colors: z.array(z.string()).min(1, {
    message: "Product colors is required",
  }),
  thumbnail_image: z.union([z.string(), z.instanceof(File)]),
  images: z.array(z.union([z.string(), z.instanceof(File)])),
});
