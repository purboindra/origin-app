"use server";

import { loginSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return {
      message: "Success login",
      success: true,
    };
  } catch (error) {
    console.error("Error from login", error);
    return {
      message: "Internal Server Error",
      timestamp: Date.now(),
      success: false,
    };
  }
}
