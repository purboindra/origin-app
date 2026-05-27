"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation";

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    const flattened = validatedFields.error.flatten();
    return {
      message: "",
      timestamp: Date.now(),
      success: false,
      email: flattened.fieldErrors.email,
      password: flattened.fieldErrors.password,
      values: { email },
    };
  }

  const data = {
    email,
    password,
  };

  const { error, data: userData } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      message: error.message,
      timestamp: Date.now(),
      success: false,
      values: { email },
    };
  }

  revalidatePath("/dashboard", "layout");
  return {
    message: "Login success",
    timestamp: Date.now(),
    success: true,
  };
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();
  const response = await supabase.auth.signOut();

  if (response.error) {
    return {
      message: response.error.message,
      timestamp: Date.now(),
      success: false,
    };
  }

  revalidatePath("/", "layout");
  return {
    message: "Logout success",
    timestamp: Date.now(),
    success: true,
  };
}
