import * as z from "zod";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z
  .instanceof(File, { message: "Image is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, "File too large")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Invalid file type",
  );

export type ImagePayload = z.infer<typeof imageSchema>;

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
  thumbnail_image: imageSchema.optional(),
  variant_images: z.array(imageSchema).optional(),
});

export const editProductSchema = z.object({
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
  thumbnail_image: imageSchema.optional(),
  variant_images: z.array(imageSchema).optional(),
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
