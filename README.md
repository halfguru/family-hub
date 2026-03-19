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
| Storage API | Google Drive API | Document storage & sync |
| Photos API | Google Photos API (optional) | Family photo albums |

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

### 4. Document Vault
- **Google Drive sync** - connect existing folders
- Important docs: birth certificates, passports, insurance cards
- Medical records & vaccination records
- School/daycare forms
- Emergency contacts sheet for babysitters
- Quick access from mobile

### 5. Health & Medical
- Vaccination schedule with auto-reminders
- Doctor appointment tracking
- Prescription/medication logs
- Visit notes & follow-ups

### 6. Milestones Journal
- First words, first steps, funny quotes
- Photo attachments
- Timeline view per child
- Export to PDF/memory book

### 7. Babysitter Cheat Sheet
- Daily routines (bedtime, meals, screen time rules)
- Allergies & dietary restrictions
- Emergency contacts (parents, grandparents, neighbors)
- Pediatrician info
- WiFi password
- House instructions (alarm, locks, pets)

### 8. Meal Planning
- Weekly meal planner
- Recipe collection with tags (kid-friendly, quick, etc.)
- Generate shopping list from meal plan
- Allergy/intolerance tracking

### 9. Activity Ideas
- Age-appropriate crafts & games
- Filter by weather (indoor/outdoor)
- Filter by materials on hand
- Weekend activity planner

## Database Schema

```
User
  ├─ id
  ├─ name
  ├─ email
  ├─ password_hash
  ├─ avatar_url
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

Document
  ├─ id
  ├─ family_id → Family
  ├─ title
  ├─ category (medical, legal, school, etc.)
  ├─ google_drive_file_id
  ├─ google_drive_folder_id
  ├─ uploaded_by → User
  └─ tags[]

Vaccination
  ├─ id
  ├─ user_id → User (the child)
  ├─ vaccine_name
  ├─ date_administered
  ├─ next_due_date
  ├─ notes
  └─ document_id → Document (optional)

MedicalVisit
  ├─ id
  ├─ user_id → User
  ├─ visit_type (checkup, sick, specialist)
  ├─ provider_name
  ├─ visit_date
  ├─ notes
  ├─ prescriptions[]
  └─ follow_up_date

Milestone
  ├─ id
  ├─ user_id → User (the child)
  ├─ title
  ├─ description
  ├─ date
  ├─ photo_urls[]
  └─ created_by → User

BabysitterSheet
  ├─ id
  ├─ family_id → Family
  ├─ emergency_contacts (JSON)
  ├─ routines (JSON)
  ├─ allergies[]
  ├─ dietary_restrictions[]
  ├─ house_instructions
  ├─ wifi_password
  └─ updated_at

Recipe
  ├─ id
  ├─ family_id → Family
  ├─ title
  ├─ ingredients (JSON)
  ├─ instructions
  ├─ prep_time
  ├─ cook_time
  ├─ servings
  ├─ tags[] (kid-friendly, quick, etc.)
  └─ created_by → User

MealPlan
  ├─ id
  ├─ family_id → Family
  ├─ week_start_date
  └─ meals (JSON: day -> meal -> recipe_id)

Activity
  ├─ id
  ├─ title
  ├─ description
  ├─ age_range_min
  ├─ age_range_max
  ├─ indoor_outdoor (indoor, outdoor, both)
  ├─ materials[]
  ├─ duration_minutes
  └─ source_url (optional)
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
│  │  ├─ lists/
│  │  │  └─ [id]/page.tsx
│  │  ├─ tasks/page.tsx
│  │  ├─ documents/page.tsx
│  │  ├─ health/
│  │  │  ├─ vaccinations/page.tsx
│  │  │  └─ visits/page.tsx
│  │  ├─ milestones/page.tsx
│  │  ├─ babysitter/page.tsx
│  │  ├─ meals/
│  │  │  ├─ recipes/page.tsx
│  │  │  └─ plan/page.tsx
│  │  └─ activities/page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ ui/              # shadcn components
│  ├─ calendar/
│  ├─ lists/
│  ├─ tasks/
│  ├─ documents/
│  ├─ health/
│  ├─ milestones/
│  ├─ meals/
│  └─ shared/          # Layout, nav, etc.
├─ lib/
│  ├─ db.ts            # Supabase client
│  ├─ auth.ts          # NextAuth config
│  ├─ google.ts        # Google API helpers
│  └─ utils.ts
├─ actions/            # Server actions
├─ types/
│  └─ index.ts
├─ public/
│  └─ manifest.json    # PWA manifest
├─ .env.local          # Environment variables
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

# Google APIs (single OAuth app for all)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Setup Steps

1. Create Supabase project and get credentials
2. Create Google Cloud project, enable APIs:
   - Google Calendar API
   - Google Drive API
   - Google Tasks API (optional)
   - Google Photos API (optional)
3. Configure OAuth consent screen
4. Set up Vercel project
5. Deploy

## Build Phases

**Phase 1: Foundation**
- Project setup (Next.js, Tailwind, shadcn)
- Authentication & family creation
- Basic layout & navigation

**Phase 2: Core Features**
- Calendar with Google sync
- Shopping lists with real-time sync
- Chores/tasks

**Phase 3: Documents & Health**
- Document vault with Google Drive
- Vaccination tracking
- Medical visits

**Phase 4: Family Life**
- Milestones journal
- Babysitter cheat sheet
- Meal planning
- Activity ideas

## Cost

**Total: $0/month**

All services used have free tiers that exceed requirements for a family of 5.

---

*Built with love for the family*
