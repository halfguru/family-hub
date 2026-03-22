export interface GoogleCalendar {
  id: string;
  summary: string;
  description?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  accessRole?: string;
  primary?: boolean;
}

export interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  allDay?: boolean;
  colorId?: string;
  status?: string;
  htmlLink?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
  recurrence?: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color?: string;
  htmlLink?: string;
}

const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";

export async function refreshGoogleToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string; expiresAt: number } | null> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Token refresh failed:", error);
    return null;
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
  };
}

async function fetchWithAuth(
  accessToken: string,
  url: string
): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("TOKEN_EXPIRED");
  }

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Google API error response:", response.status, errorBody);
    throw new Error(`Google Calendar API error: ${response.status}`);
  }

  return response;
}

export async function getCalendars(
  accessToken: string
): Promise<GoogleCalendar[]> {
  const response = await fetchWithAuth(
    accessToken,
    `${GOOGLE_CALENDAR_API}/users/me/calendarList`
  );

  const data = await response.json();
  return data.items ?? [];
}

export async function getEvents(
  accessToken: string,
  calendarId: string,
  timeMin: Date,
  timeMax: Date,
  maxResults = 250
): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: maxResults.toString(),
    singleEvents: "true",
    orderBy: "startTime",
  });

  const response = await fetchWithAuth(
    accessToken,
    `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events?${params}`
  );

  const data = await response.json();
  const events = data.items ?? [];

  return events.map((event: GoogleCalendarEvent): CalendarEvent => {
    const allDay = !!event.start.date;
    const start = allDay
      ? new Date(event.start.date!)
      : new Date(event.start.dateTime!);
    const end = allDay
      ? new Date(event.end.date!)
      : new Date(event.end.dateTime!);

    return {
      id: event.id,
      title: event.summary ?? "(No title)",
      description: event.description,
      location: event.location,
      start,
      end,
      allDay,
      color: event.colorId,
      htmlLink: event.htmlLink,
    };
  });
}
