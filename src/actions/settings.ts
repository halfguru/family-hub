"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";

export async function disconnectGoogle(): Promise<{ success: boolean }> {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false };
  }

  const supabase = await createClient();
  
  const { error } = await supabase
    .from("users")
    .update({
      google_access_token: null,
      google_refresh_token: null,
      google_token_expires_at: null,
    })
    .eq("id", session.user.id);

  if (error) {
    console.error("Error disconnecting Google:", error);
    return { success: false };
  }

  return { success: true };
}
