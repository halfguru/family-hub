<div align="center">

# Family Hub

**Your family's command center for daily life**

A beautiful, warm, mobile-first PWA for managing household life.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Features

**Shared Calendar** — Monthly/weekly views, color-coded per person, Google Calendar sync

**Shopping Lists** — Real-time sync, multiple lists, categories, quick-add common items

**Chores & Tasks** — Assign to family members, recurring schedules, streaks, optional rewards

**Family Profiles** — Per-person views, color coding, milestones, medical info

**Document Vault** — Google Drive sync, important docs, medical records

**Health & Medical** — Vaccination schedule, doctor visits, prescriptions

**Milestones Journal** — First words, first steps, photos, timeline per child

**Babysitter Sheet** — Emergency contacts, routines, allergies, WiFi password

**Meal Planning** — Weekly planner, recipes, generate shopping lists

**Activity Ideas** — Age-appropriate crafts/games, filter by weather/materials

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Database | PostgreSQL (Supabase) |
| Auth | NextAuth.js |
| Hosting | Vercel |
| PWA | @ducanh2912/next-pwa |

**Cost: $0/month** on free tiers

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/family-hub.git
cd family-hub

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## Project Structure

```
family-hub/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── layout/       # Layout, navigation
│   ├── lib/              # Utilities, Supabase client
│   ├── auth/             # NextAuth configuration
│   ├── providers/        # React context providers
│   └── types/            # TypeScript types
├── public/               # Static assets, PWA manifest
└── .github/              # GitHub workflows
```

---

## Documentation

- **[DESIGN.md](./DESIGN.md)** — UI/UX design system, wireframes, interactions
- **[TODO.md](./TODO.md)** — Task tracking and build phases
- **[AGENTS.md](./AGENTS.md)** — Development guidelines and commands

---

## Design Philosophy

**Warm Minimal** — Not corporate. Not cold. Homey.

Clean and organized, but with personality and warmth. Soft colors, rounded corners, friendly icons. Feels like a welcoming space for your family.

---

## PWA Support

Family Hub is a Progressive Web App:

- Install on your home screen
- Works offline for cached data
- Fast and responsive

---

## Roadmap

- [x] Phase 0: Infrastructure Setup
- [ ] Phase 1: Foundation (Auth, Database)
- [ ] Phase 2: Core Features (Calendar, Lists, Tasks)
- [ ] Phase 3: Documents & Health
- [ ] Phase 4: Family Life (Meals, Activities, Expenses)

---