"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      message: "User not found",
      success: false,
    };
  }

  return {
    data: user,
    message: "User found",
    success: true,
  };
}
