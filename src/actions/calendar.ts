"use server";

import { auth } from "@/auth";
import { getCalendars, getEvents } from "@/lib/google-calendar";
import { getValidGoogleAccessToken } from "@/lib/users";
import { createClient } from "@/lib/supabase/server";
import type { GoogleCalendar, CalendarEvent } from "@/lib/google-calendar";

export interface CalendarWithEvents {
  calendar: GoogleCalendar;
  events: CalendarEvent[];
}

export async function getUserCalendars(): Promise<{
  calendars?: GoogleCalendar[];
  error?: string;
}> {
  const session = await auth();
  
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(session.user.email);
  
  if (tokenError || !accessToken) {
    return { error: tokenError ?? "No Google access token" };
  }

  try {
    const calendars = await getCalendars(accessToken);
    console.log("Fetched calendars:", calendars?.length);
    return { calendars };
  } catch (error) {
    console.error("Failed to fetch calendars error:", error);
    return { error: `Failed to fetch calendars: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export async function getTodayEvents(): Promise<{
  events?: CalendarEvent[];
  error?: string;
}> {
  const session = await auth();
  
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(session.user.email);
  
  if (tokenError || !accessToken) {
    return { error: tokenError ?? "No Google access token" };
  }

  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    const events = await getEvents(accessToken, "primary", startOfDay, endOfDay);
    return { events };
  } catch {
    return { error: "Failed to fetch today's events" };
  }
}

export async function getPrimaryCalendarEvents(
  startDate: Date,
  endDate: Date
): Promise<{
  events?: CalendarEvent[];
  error?: string;
}> {
  const session = await auth();
  
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(session.user.email);
  
  if (tokenError || !accessToken) {
    return { error: tokenError ?? "No Google access token" };
  }

  try {
    const events = await getEvents(
      accessToken,
      "primary",
      startDate,
      endDate
    );
    return { events };
  } catch {
    return { error: "Failed to fetch events" };
  }
}

export async function setFamilyCalendar(
  familyId: string,
  calendarId: string,
  calendarName: string
): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: "Not authenticated" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("calendar_settings").upsert(
    {
      family_id: familyId,
      google_calendar_id: calendarId,
      google_calendar_name: calendarName,
      created_by: session.user.email,
    },
    { onConflict: "family_id" }
  );

  if (error) {
    return { success: false, error: "Failed to save calendar settings" };
  }

  return { success: true };
}
