# AGENTS.md

Development guidelines and commands for the Family App.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js

## Commands

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database

```bash
# Generate Supabase types (after schema changes)
npx supabase gen types typescript --project-id <id> --schema public > types/database.ts
```

### shadcn/ui

```bash
# Initialize shadcn (first time only)
npx shadcn@latest init

# Add a component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add sheet
```

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Run TypeScript check
npm run typecheck

# Fix lint issues
npm run lint -- --fix
```

## Code Style

### General

- Use TypeScript for all files
- Use server components by default (`'use server'`)
- Use server actions for mutations
- Keep components small and focused
- Use shadcn/ui components, don't reinvent

### File Naming

- Components: `PascalCase.tsx` (e.g., `TaskCard.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Utils: `camelCase.ts`
- Types: `PascalCase` for interfaces/types

### Imports Order

1. React/Next.js
2. External libraries
3. Internal components
4. Internal utilities
5. Types

```tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createEvent } from '@/actions/events'
import type { Event } from '@/types'
```

### Styling

- Use Tailwind utility classes
- Use `cn()` for conditional classes (from `@/lib/utils`)
- Use CSS variables for theme colors (defined in globals.css)
- Mobile-first: write mobile styles, then add desktop breakpoints

### Components

```tsx
// ✅ Good: Server Component
async function TaskList() {
  const tasks = await getTasks()
  return (
    <ul>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </ul>
  )
}

// ✅ Good: Client Component with 'use client'
'use client'
function TaskItem({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(false)
  return (
    <li onClick={() => setCompleted(!completed)}>
      {task.title}
    </li>
  )
}
```

## Git Workflow

### Branches

- `main` - production
- `develop` - integration
- `feature/*` - new features
- `fix/*` - bug fixes

### Commit Messages

Use conventional commits:
```
feat: add shopping list real-time sync
fix: correct calendar timezone handling
docs: update README with new features
style: adjust button padding
refactor: extract date formatting utility
chore: update dependencies
```

## Environment Variables

Required for development:
```env
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Before Committing

1. Run `npm run lint`
2. Run `npm run typecheck`
3. Test on mobile viewport
4. Test dark mode
5. Verify no console errors

## Documentation

- **[README.md](./README.md)** - Features, tech stack, setup
- **[DESIGN.md](./DESIGN.md)** - UI/UX design system
- **[TODO.md](./TODO.md)** - Task tracking
