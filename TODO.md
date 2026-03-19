# Family App - TODO

> **See [README.md](./README.md) for features and [DESIGN.md](./DESIGN.md) for design system.**

## Phase 1: Foundation

### Project Setup
- [ ] Initialize Next.js 14 with App Router
- [ ] Configure Tailwind CSS
- [ ] Install and configure shadcn/ui
- [ ] Set up custom color palette (warm minimal)
- [ ] Install Lucide React icons
- [ ] Configure Inter font

### Database & Auth
- [ ] Create Supabase project
- [ ] Set up database schema (User, Family, etc.)
- [ ] Configure NextAuth.js
- [ ] Create login page
- [ ] Create register page
- [ ] Create family creation flow
- [ ] Set up Google OAuth for Calendar/Drive APIs

### Layout & Navigation
- [ ] Create root layout
- [ ] Build mobile bottom nav component
- [ ] Build desktop sidebar component
- [ ] Create responsive layout wrapper
- [ ] Build header component with user menu
- [ ] Add dark mode toggle

---

## Phase 2: Core Features

### Calendar
- [ ] Create calendar page
- [ ] Build month view component
- [ ] Build week view component
- [ ] Build day view component
- [ ] Add event creation modal
- [ ] Add event editing/deleting
- [ ] Implement recurring events
- [ ] Add Google Calendar sync
- [ ] Color-code events by family member

### Shopping Lists
- [ ] Create lists page
- [ ] Build list card component
- [ ] Build list detail view
- [ ] Add item creation/editing
- [ ] Add item completion animation
- [ ] Implement swipe gestures (complete/delete)
- [ ] Add category grouping
- [ ] Implement real-time sync
- [ ] Add "quick add" for common items

### Chores & Tasks
- [ ] Create tasks page
- [ ] Build task card component
- [ ] Add task assignment to family members
- [ ] Implement recurring schedules
- [ ] Add completion tracking
- [ ] Build streak visualization
- [ ] Add optional points/rewards system

### Quick Add (FAB)
- [ ] Build bottom sheet component
- [ ] Create quick add menu
- [ ] Wire up to create events/tasks/items

---

## Phase 3: Documents & Health

### Document Vault
- [ ] Create documents page
- [ ] Build folder grid component
- [ ] Add document upload
- [ ] Add Google Drive sync
- [ ] Build document viewer
- [ ] Add document categories

### Health & Medical
- [ ] Create health section
- [ ] Build vaccination tracker
- [ ] Add vaccination reminders
- [ ] Build doctor visit log
- [ ] Add prescription tracking

### Family Profiles
- [ ] Build family list page
- [ ] Build person profile page
- [ ] Add profile editing
- [ ] Assign colors to members
- [ ] Filter views by person

---

## Phase 4: Family Life

### Milestones Journal
- [ ] Create milestones page
- [ ] Add milestone creation with photos
- [ ] Build timeline view per child
- [ ] Add milestone filtering

### Babysitter Sheet
- [ ] Create babysitter sheet page
- [ ] Build emergency contacts section
- [ ] Add routines section
- [ ] Add allergies/dietary restrictions
- [ ] Generate shareable link
- [ ] Add print-friendly view

### Meal Planning
- [ ] Create recipes page
- [ ] Build recipe card component
- [ ] Add recipe creation/editing
- [ ] Build weekly meal planner
- [ ] Generate shopping list from meal plan

### Activity Ideas
- [ ] Create activities page
- [ ] Build activity card component
- [ ] Add age filtering
- [ ] Add indoor/outdoor filtering
- [ ] Add materials filtering

### Who's Home
- [ ] Build presence tracking component
- [ ] Add status options (Home, Away, Out, Traveling)
- [ ] Display on dashboard

### Expense Tracker
- [ ] Create expenses page
- [ ] Add expense logging
- [ ] Build category breakdown
- [ ] Add recurring bills tracking

---

## Polish & Deploy

### PWA
- [ ] Create manifest.json
- [ ] Add service worker
- [ ] Enable offline support
- [ ] Add install prompt

### Testing & Quality
- [ ] Add loading skeletons
- [ ] Add error boundaries
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Accessibility audit

### Deployment
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Set up custom domain (optional)

---

## Nice to Have (Future)

- [ ] Google Photos integration
- [ ] Push notifications
- [ ] Export milestones to PDF
- [ ] Weather widget
- [ ] Widget for phone home screen
