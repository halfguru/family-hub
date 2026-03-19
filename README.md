# Family Household App

A beautiful, practical web app for managing household tasks, calendars, and shopping lists.

## Overview

- **Users**: 4-5 family members
- **Access**: Browser + mobile (PWA)
- **Data**: Cloud-hosted, accessible from anywhere

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | PWA support, SSR |
| UI | Tailwind CSS + shadcn/ui | Beautiful, accessible |
| Database | PostgreSQL (Supabase) | Free tier: 500MB |
| Auth | NextAuth.js | Email/password |
| Hosting | Vercel | Free tier: 100GB/mo |
| Calendar API | Google Calendar API | Sync family events |
| Tasks API | Google Tasks API (optional) | Google ecosystem tie-in |

## Core Features

### 1. Shared Calendar
- Monthly/weekly views
- Color-coded per family member
- Recurring events (school, activities, appointments)
- Day-of reminders
- **Google Calendar sync** - bi-directional integration

### 2. Shopping Lists
- Multiple lists (groceries, Costco, pharmacy, etc.)
- Real-time sync across family members
- Categories & smart sorting
- Quick-add for common items
- Mark items as purchased

### 3. Chores & Tasks
- Assign tasks to family members
- Recurring schedules (daily, weekly, monthly)
- Completion tracking with streaks
- Optional points/rewards system
- Due dates & reminders

## Database Schema

```
User
  ├─ id
  ├─ name
  ├─ email
  ├─ password_hash
  └─ family_id → Family

Family
  ├─ id
  ├─ name
  └─ created_at

Event
  ├─ id
  ├─ family_id → Family
  ├─ created_by → User
  ├─ title
  ├─ description
  ├─ start_time
  ├─ end_time
  ├─ recurring_rule
  ├─ assigned_user_ids[]
  └─ google_event_id (for sync)

ShoppingList
  ├─ id
  ├─ family_id → Family
  ├─ name
  └─ created_at

ShoppingItem
  ├─ id
  ├─ list_id → ShoppingList
  ├─ name
  ├─ category
  ├─ quantity
  ├─ is_completed
  ├─ added_by → User
  └─ completed_by → User

Task
  ├─ id
  ├─ family_id → Family
  ├─ title
  ├─ description
  ├─ assigned_to → User
  ├─ recurring_rule
  ├─ points_value
  └─ created_at

TaskCompletion
  ├─ id
  ├─ task_id → Task
  ├─ user_id → User
  ├─ completed_at
  └─ notes
```

## Project Structure

```
family-app/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  └─ register/page.tsx
│  ├─ (dashboard)/
│  │  ├─ calendar/page.tsx
│  │  ├─ lists/page.tsx
│  │  └─ tasks/page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ ui/           # shadcn components
│  ├─ calendar/
│  ├─ lists/
│  └─ tasks/
├─ lib/
│  ├─ db.ts         # Supabase client
│  ├─ auth.ts       # NextAuth config
│  ├─ google.ts     # Google API helpers
│  └─ utils.ts
├─ actions/         # Server actions
├─ types/
│  └─ index.ts
├─ public/
│  └─ manifest.json # PWA manifest
├─ .env.local       # Environment variables
└─ README.md
```

## Environment Variables

```env
# Database
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Google APIs
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Setup Steps

1. Create Supabase project and get credentials
2. Create Google Cloud project, enable Calendar & Tasks APIs
3. Configure OAuth consent screen
4. Set up Vercel project
5. Deploy

## Cost

**Total: $0/month**

All services used have free tiers that exceed requirements for a family of 5.

---

*Built with love for the family*
