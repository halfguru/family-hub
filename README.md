# Family Household App

A beautiful, warm, mobile-first family app for managing household life.

## Overview

- **Users**: 4-5 family members (with young kids)
- **Access**: Browser + mobile (PWA), anywhere with internet
- **Data**: Cloud-hosted (Supabase)
- **Design**: Warm minimal - feels like home, not work

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | PWA, SSR, modern React |
| UI | Tailwind CSS + shadcn/ui | Beautiful, accessible components |
| Icons | Lucide React | Clean, friendly, outlined |
| Database | PostgreSQL (Supabase) | Free tier: 500MB, real-time |
| Auth | NextAuth.js | Email/password |
| Hosting | Vercel | Free tier: 100GB/mo |
| Google APIs | Calendar, Drive, Photos | Sync with existing tools |

**Cost: $0/month**

## Features

### Core

| Feature | Description |
|---------|-------------|
| **Shared Calendar** | Monthly/weekly views, color-coded per person, Google Calendar sync |
| **Shopping Lists** | Real-time sync, multiple lists, categories, quick-add |
| **Chores & Tasks** | Assign to members, recurring schedules, streaks, optional rewards |
| **Family Profiles** | Per-person views, color coding, milestones, medical |

### Family Life

| Feature | Description |
|---------|-------------|
| **Document Vault** | Google Drive sync, important docs, medical records |
| **Health & Medical** | Vaccination schedule, doctor visits, prescriptions |
| **Milestones Journal** | First words, first steps, photos, timeline per child |
| **Babysitter Sheet** | Emergency contacts, routines, allergies, WiFi password |
| **Meal Planning** | Weekly planner, recipes, generate shopping lists |
| **Activity Ideas** | Age-appropriate crafts/games, filter by weather/materials |
| **Who's Home** | Presence tracking for family members |
| **Expense Tracker** | Family budget, recurring bills, spending |

### Google Integration

- Calendar sync (bi-directional)
- Drive for document storage
- Photos (optional, for memories)

## Project Structure

```
family-app/
├─ app/                    # Next.js App Router pages
├─ components/
│   ├─ ui/                 # shadcn/ui components
│   ├─ calendar/           # Calendar components
│   ├─ lists/              # Shopping/task list components
│   └─ shared/             # Layout, navigation, etc.
├─ lib/
│   ├─ db.ts               # Supabase client
│   ├─ auth.ts             # NextAuth config
│   └─ google.ts           # Google API helpers
├─ actions/                # Server actions
├─ types/                  # TypeScript types
└─ public/                 # Static assets, PWA manifest
```

## Build Phases

**Phase 1: Foundation**
- Project setup (Next.js, Tailwind, shadcn/ui)
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
- Who's Home
- Expense tracker

## Setup

1. Create Supabase project → get credentials
2. Create Google Cloud project → enable APIs (Calendar, Drive, Photos)
3. Configure OAuth consent screen
4. Set up Vercel project
5. Deploy

## Environment Variables

```env
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Documentation

- **[DESIGN.md](./DESIGN.md)** - UI/UX design system, wireframes, interactions
- **[AGENTS.md](./AGENTS.md)** - Development guidelines and commands

---
