export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  google_access_token: string | null;
  google_refresh_token: string | null;
  google_token_expires_at: number | null;
  created_at: string;
  updated_at: string;
}

export interface Family {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: "admin" | "member";
  color: string;
  joined_at: string;
}

export interface CalendarSettings {
  id: string;
  family_id: string;
  google_calendar_id: string;
  google_calendar_name: string;
  updated_by: string;
  updated_at: string;
}

export type FamilyWithMembers = Family & {
  members: (FamilyMember & { user: User })[];
};

export type UserWithFamily = User & {
  families: (FamilyMember & { family: Family })[];
};
