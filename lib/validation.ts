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
  colors: z.array(z.string()).optional(),
  thumbnail_image: z.union([z.string(), z.instanceof(File)]).optional(),
  images: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters",
  }),
});
