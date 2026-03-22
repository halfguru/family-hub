import { createClient } from "@/lib/supabase/server";
import { refreshGoogleToken } from "@/lib/google-calendar";
import type { User } from "@/types/database";

export async function upsertUser(
  id: string,
  email: string,
  name?: string | null,
  image?: string | null,
  googleAccessToken?: string,
  googleRefreshToken?: string,
  googleExpiresAt?: number
): Promise<User | null> {
  const supabase = await createClient();

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    const { data, error } = await supabase
      .from("users")
      .update({
        name: name ?? existingUser.name,
        image: image ?? existingUser.image,
        google_access_token: googleAccessToken ?? null,
        google_refresh_token: googleRefreshToken ?? null,
        google_token_expires_at: googleExpiresAt ?? null,
      })
      .eq("id", existingUser.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", JSON.stringify(error, null, 2));
      return null;
    }
    return data;
  }

  const userData = {
    id,
    email,
    name: name ?? null,
    image: image ?? null,
    google_access_token: googleAccessToken ?? null,
    google_refresh_token: googleRefreshToken ?? null,
    google_token_expires_at: googleExpiresAt ?? null,
  };

  const { data, error } = await supabase
    .from("users")
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error("Error inserting user:", JSON.stringify(error, null, 2));
    return null;
  }

  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }

  return data;
}

export async function updateUserGoogleTokens(
  userId: string,
  accessToken: string | null,
  refreshToken: string | null,
  expiresAt: number | null
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .update({
      google_access_token: accessToken,
      google_refresh_token: refreshToken,
      google_token_expires_at: expiresAt,
    })
    .eq("id", userId);

  if (error) {
    console.error("Error updating Google tokens:", error);
    return false;
  }

  return true;
}

export async function getValidGoogleAccessToken(
  email: string
): Promise<{ accessToken: string | null; error?: string }> {
  const user = await getUserByEmail(email);
  
  if (!user) {
    return { accessToken: null, error: "User not found" };
  }

  if (!user.google_refresh_token) {
    return { accessToken: null, error: "No Google refresh token. Please sign in again." };
  }

  const now = Math.floor(Date.now() / 1000);
  const bufferSeconds = 300; // 5 minutes buffer
  const expiresAt = user.google_token_expires_at ?? 0;

  if (user.google_access_token && expiresAt > now + bufferSeconds) {
    return { accessToken: user.google_access_token };
  }

  console.log("Refreshing Google token for user:", email);
  const refreshed = await refreshGoogleToken(user.google_refresh_token);
  
  if (!refreshed) {
    return { accessToken: null, error: "Failed to refresh Google token. Please sign in again." };
  }

  const updated = await updateUserGoogleTokens(
    user.id,
    refreshed.accessToken,
    refreshed.refreshToken,
    refreshed.expiresAt
  );

  if (!updated) {
    console.error("Failed to update tokens in database");
  }

  return { accessToken: refreshed.accessToken };
}
