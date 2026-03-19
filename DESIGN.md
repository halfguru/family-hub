# Family App - Design System

> **See [README.md](./README.md) for features, tech stack, and project structure.**

## Design Direction: Warm Minimal

**Not corporate. Not cold. Homey.**

This app should feel like a warm, welcoming space for your family - not a productivity dashboard you'd use at work. Clean and organized, but with personality and warmth.

### Design Principles

| Principle | What it means |
|-----------|---------------|
| **Warm** | Soft colors, rounded corners, friendly icons |
| **Minimal** | Clean layouts, focused content, not cluttered |
| **Personal** | Family photos, milestones, celebrates your life |
| **Calm** | Easy on eyes, low cognitive load, pleasant to use daily |

### Visual Comparison

| Element | Corporate (Avoid) | Warm Minimal (Target) |
|---------|-------------------|----------------------|
| Colors | Blue/gray, cold | Cream, sage, warm beige, dusty rose |
| Feel | Tool, dashboard | Home, family space |
| Icons | Functional | Friendly, outlined |
| Typography | System default | Inter, clean but soft |
| Corners | Sharp or minimal rounding | Generous rounding (12-16px) |
| Shadows | Harsh, high contrast | Soft, warm-tinted |
| Illustrations | None or generic | Subtle, family-friendly |

---

## Design System

### Color Palette

**Light Mode:**
```
Primary:      #6B8E6B (sage green)
Secondary:    #D4A574 (warm terracotta)
Accent:       #E8B4B8 (dusty rose)
Success:      #7CB08B (soft green)
Warning:      #E5C07B (warm amber)
Error:        #D4878C (soft coral)

Background:   #FFFBF5 (warm white)
Surface:      #FFF8F0 (cream)
Card:         #FFFFFF (white)
Text:         #3D3B3A (warm black)
Muted:        #8A8685 (warm gray)
Border:       #E8E4E1 (warm border)
```

**Dark Mode:**
```
Primary:      #8BB08B (lighter sage)
Secondary:    #E5B88A (lighter terracotta)
Accent:       #F0C4C8 (lighter rose)

Background:   #1C1B1A (warm dark)
Surface:      #252423 (warm charcoal)
Card:         #2D2C2B (warm gray)
Text:         #F5F2EF (warm white)
Muted:        #A09E9C (warm gray)
Border:       #3D3B3A (warm border)
```

**Family Member Colors:**
```
Parent 1:   #6B8E6B (sage)
Parent 2:   #7BA3C4 (soft blue)
Child 1:    #E8B4B8 (dusty rose)
Child 2:    #B8A5D4 (soft lavender)
Shared:     #A09E9C (warm gray)
```

### Typography

```
Font: Inter (https://fonts.google.com/specimen/Inter)

Display:   32px / Bold    (hero headlines)
H1:        24px / Bold    (page titles)
H2:        20px / Semibold (section headers)
H3:        18px / Semibold (card titles)
Body:      16px / Regular (content)
Small:     14px / Regular (secondary text)
Caption:   12px / Regular (labels, hints)

Line height: 1.5 for body, 1.25 for headings
```

### Spacing Scale

```
1:   4px
2:   8px
3:   12px
4:   16px
5:   24px
6:   32px
7:   48px
8:   64px
```

### Border Radius

```
sm:   6px   (buttons, inputs)
md:   12px  (cards)
lg:   16px  (modals, bottom sheets)
xl:   24px  (hero elements)
full: 9999px (pills, avatars)
```

### Shadows

```
sm:  0 1px 2px rgba(61, 59, 58, 0.05)
md:  0 4px 6px rgba(61, 59, 58, 0.07)
lg:  0 10px 15px rgba(61, 59, 58, 0.1)
```

Note: Use warm-tinted shadows (based on warm black), not pure gray.

---

## Navigation

### Mobile (Bottom Nav)

```
┌─────────────────────────────────────┐
│ Family App              👤 Simon ▼  │  ← Header
├─────────────────────────────────────┤
│                                     │
│         [Main Content]              │  ← Scrollable
│                                     │
├─────────────────────────────────────┤
│   🏠    📅    ➕    📋    ⋯        │  ← Bottom Nav
│  Home  Cal   Add  Lists  More      │
└─────────────────────────────────────┘
```

**Bottom Nav Tabs:**

| Tab | Icon | Purpose |
|-----|------|---------|
| Home | Home | Dashboard - today's overview |
| Calendar | Calendar | Full calendar views |
| Quick Add | Plus | FAB - add anything quickly |
| Lists | ListTodo | Shopping lists & tasks |
| More | MoreHorizontal | Documents, Health, Meals, Settings |

### Desktop (Sidebar)

```
┌────────┬────────────────────────────────┐
│        │ Family App        👤 Simon ▼  │
│  🏠    ├────────────────────────────────┤
│  Home  │                                │
│        │       [Main Content]           │
│  📅    │       (wider, more columns)    │
│  Cal   │                                │
│        │                                │
│  📋    │                                │
│ Lists  │                                │
│        │                                │
│ ────── │                                │
│        │                                │
│ 👨‍👩‍👧‍👦│                                │
│ Family │                                │
│        │                                │
│  📁    │                                │
│ Docs   │                                │
│        │                                │
│  💊    │                                │
│ Health │                                │
│        │                                │
│  🍽️   │                                │
│ Meals  │                                │
│        │                                │
│ ────── │                                │
│        │                                │
│  ⚙️    │                                │
│ Sett.  │                                │
└────────┴────────────────────────────────┘
```

---

## Page Layouts

### 1. Home (Dashboard)

Primary view. Shows everything relevant to *today*.

```
┌─────────────────────────────────────┐
│ Good morning, Simon ☀️              │
│ Wednesday, March 18                 │
├─────────────────────────────────────┤
│                                     │
│ 📅 TODAY                            │
│ ┌─────────────────────────────────┐ │
│ │ 09:00  Preschool drop-off       │ │
│ │ 14:00  Playdate at the park     │ │
│ │ 18:00  Family dinner            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ✅ TASKS                            │
│ ┌─────────────────────────────────┐ │
│ │ [ ] Take out trash              │ │
│ │ [ ] Pack preschool bag          │ │
│ │ [✓] Pay electricity bill        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🛒 SHOPPING                         │
│ ┌─────────────────────────────────┐ │
│ │ Groceries          4 items  →   │ │
│ │ Costco             2 items  →   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📝 RECENT MILESTONES                │
│ ┌─────────────────────────────────┐ │
│ │ Emma said "butterfly"! 🦋       │ │
│ │ 2 days ago                      │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### 2. Calendar

```
┌─────────────────────────────────────┐
│ < March 2025 >              [+]    │
├─────────────────────────────────────┤
│ Mon Tue Wed Thu Fri Sat Sun         │
│                     1   2   3       │
│  4   5   6   7   8   9  10          │
│ 11  12  13  14  15  16  17          │
│ 18  19  20  21  22  23  24          │
│ 25  26  27  28  29  30  31          │
├─────────────────────────────────────┤
│ Wednesday, March 18                 │
│                                     │
│ 09:00  Preschool drop-off           │
│        📍 Sunshine Academy          │
│                                     │
│ 14:00  Playdate at the park         │
│        👤 Emma                      │
│                                     │
│ 18:00  Family dinner                │
│        👤 Everyone                  │
│                                     │
└─────────────────────────────────────┘
```

**View toggles:** Month | Week | Day (swipe left/right to change)
**Color coding:** Each family member gets a color. Events show assigned colors.

### 3. Quick Add (FAB Modal)

Tapping ➕ opens a bottom sheet:

```
┌─────────────────────────────────────┐
│           ──────                    │  ← Drag handle
│                                     │
│   What do you want to add?          │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ 📅 Event                    │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ ✅ Task / Chore             │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ 🛒 Shopping Item            │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ 📝 Milestone                │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### 4. Lists (Shopping & Tasks)

Tabbed view with swipe between tabs.

```
┌─────────────────────────────────────┐
│  [Shopping]  [Chores]  [All Tasks] │  ← Tabs
├─────────────────────────────────────┤
│                                     │
│ 🛒 SHOPPING LISTS                   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Groceries              4 items  │ │
│ │ ─────────────────────────────── │ │
│ │ □ Milk                          │ │
│ │ □ Bread                         │ │
│ │ □ Eggs                          │ │
│ │ □ Apples                        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Costco                 2 items  │ │
│ └─────────────────────────────────┘ │
│                                     │
│            [+ New List]             │
│                                     │
└─────────────────────────────────────┘
```

**Inside a list:**
- Tap checkbox to complete (strikethrough, fades)
- Swipe right → complete
- Swipe left → delete
- Long press → edit
- Pull down → refresh/sync
- Categories collapsed by default, expandable

### 5. More Menu

```
┌─────────────────────────────────────┐
│ More                               │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 👨‍👩‍👧‍👦 Family & Profiles           │ │
│ │ Manage household members        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📁 Documents                    │ │
│ │ Birth certs, passports, forms   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💊 Health & Medical             │ │
│ │ Vaccines, doctor visits         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⭐ Milestones                   │ │
│ │ First words, first steps        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 👶 Babysitter Sheet             │ │
│ │ Emergency info & routines       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🍽️ Meals & Recipes             │ │
│ │ Meal planning, recipe box       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🎨 Activity Ideas               │ │
│ │ Crafts & games for kids         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⚙️ Settings                     │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### 6. Family & Profiles

**Family List:**
```
┌─────────────────────────────────────┐
│ Family                      [+ Add] │
├─────────────────────────────────────┤
│                                     │
│ THE SMITH FAMILY                    │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  👨 Simon                       │ │
│ │  Dad · Admin                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  👩 Sarah                       │ │
│ │  Mom · Admin                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  👧 Emma                  3 yrs │ │
│ │  Child · 2 events today         │ │
│ └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Person Profile View:**
```
┌─────────────────────────────────────┐
│ ← Emma                         ✏️   │
├─────────────────────────────────────┤
│                                     │
│            🧒                       │
│           Emma                      │
│        3 years old                  │
│    🎂 June 15, 2022                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ 📅 TODAY                            │
│ ┌─────────────────────────────────┐ │
│ │ 09:00  Preschool drop-off       │ │
│ │ 14:00  Playdate at the park     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⭐ RECENT MILESTONES                │
│ ┌─────────────────────────────────┐ │
│ │ Said "butterfly"! 🦋            │ │
│ │ 2 days ago                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ QUICK LINKS                         │
│ ┌───────────┐ ┌───────────┐        │
│ │  📅       │ │  💊       │        │
│ │ Calendar  │ │ Vaccines  │        │
│ └───────────┘ └───────────┘        │
│                                     │
└─────────────────────────────────────┘
```

---

## Interactions

### Gestures (Mobile)

| Gesture | Action |
|---------|--------|
| Pull down | Refresh/sync |
| Swipe right (task) | Complete |
| Swipe left (task/item) | Delete |
| Swipe left/right (calendar) | Change view |
| Long press | Edit/reorder |
| Pinch (calendar) | Zoom in/out |

### Animations

- Transitions: 200ms ease-out
- Checkbox: scale + color fade
- Modal: slide up from bottom
- Nav: crossfade between tabs
- Delete: slide out + fade

### Feedback

- Haptic on task complete (mobile)
- Toast notifications for sync status
- Loading skeletons, not spinners
- Optimistic UI updates

---

## Responsive Breakpoints

```
Mobile:   0 - 639px    (bottom nav)
Tablet:   640 - 1023px (bottom nav, 2 columns)
Desktop:  1024px+      (sidebar nav, 3+ columns)
```

---

## Touch Targets

- Minimum: 44px × 44px
- Bottom nav: 56px height
- List items: 56px minimum height
- Buttons: 48px height

---

## PWA Features

- Installable on home screen
- Offline support for viewing cached data
- Push notifications (optional)
- Share target (share text/images to app)

---

## Design Inspiration

Apps that capture the "warm minimal" aesthetic:
- **Notion** - Clean, approachable, friendly
- **Headspace** - Calm, soft colors, rounded
- **Duolingo** - Playful but not childish
- **Linear** - Polished, modern (but warmer palette)
- **Bear Notes** - Warm, personal, clean

---

## Component Libraries

Using **shadcn/ui** with custom theme:
- Copy components into project
- Customize colors via CSS variables
- Override border-radius for warmer feel
- Add soft shadows

Icon library: **Lucide React** (outlined, friendly)
