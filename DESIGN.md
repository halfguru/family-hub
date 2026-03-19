# Family App - UI Design

Mobile-first design. Primary: phone. Secondary: desktop browser.

## Navigation Structure

### Mobile (Bottom Nav)

```
┌─────────────────────────────────────┐
│ Family App              👤 Simon ▼  │  ← Header
├─────────────────────────────────────┤
│                                     │
│         [Main Content]              │  ← Scrollable
│                                     │
│                                     │
├─────────────────────────────────────┤
│   🏠    📅    ➕    📋    ⋯        │  ← Bottom Nav
│  Home  Cal   Add  Lists  More      │
└─────────────────────────────────────┘
```

**Bottom Nav Tabs:**

| Tab | Icon | Purpose |
|-----|------|---------|
| Home | 🏠 | Dashboard - today's overview |
| Calendar | 📅 | Full calendar views |
| Quick Add | ➕ | FAB - add anything quickly |
| Lists | 📋 | Shopping lists & tasks |
| More | ⋯ | Documents, Health, Meals, Settings |

### Desktop (Sidebar Nav)

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
│ ┌─────────────────────────────────┐ │
│ │ Pharmacy               1 item   │ │
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
│ 👶 Babysitter Sheet               │ │
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

### 6. Documents

```
┌─────────────────────────────────────┐
│ Documents                 [+ Add]  │
├─────────────────────────────────────┤
│                                     │
│ 📁 Folders                          │
│                                     │
│ ┌───────────┐ ┌───────────┐        │
│ │   🪪      │ │   🏥      │        │
│ │  IDs &    │ │  Medical  │        │
│ │  Legal    │ │           │        │
│ │   5 docs  │ │   8 docs  │        │
│ └───────────┘ └───────────┘        │
│                                     │
│ ┌───────────┐ ┌───────────┐        │
│ │   🎒      │ │   📄      │        │
│ │  School   │ │  Other    │        │
│ │   3 docs  │ │   2 docs  │        │
│ └───────────┘ └───────────┘        │
│                                     │
│ 🔗 Google Drive Sync                │
│ Connected ✓                         │
│                                     │
└─────────────────────────────────────┘
```

### 7. Babysitter Sheet

One-page emergency reference. Shareable link.

```
┌─────────────────────────────────────┐
│ Babysitter Sheet                    │
│ [Share Link] [Print]               │
├─────────────────────────────────────┤
│                                     │
│ 🚨 EMERGENCY                        │
│                                     │
│ Simon (Dad)                         │
│ 📱 555-123-4567                     │
│                                     │
│ Sarah (Mom)                         │
│ 📱 555-987-6543                     │
│                                     │
│ 👨‍⚕️ Pediatrician                    │
│ Dr. Johnson                         │
│ 📱 555-246-8135                     │
│                                     │
│ 🏥 Nearest ER                       │
│ Children's Hospital                 │
│ 123 Health St                       │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ 👶 KIDS                             │
│                                     │
│ Emma (3 years)                      │
│ ⚠️ Allergic to peanuts             │
│                                     │
│ Lucas (1 month)                     │
│ No allergies                        │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ 🌙 BEDTIME ROUTINE                  │
│                                     │
│ Emma: 7:30pm                        │
│ 1. Bath                             │
│ 2. Pajamas                          │
│ 3. 2 books                          │
│ 4. Lights out                       │
│                                     │
│ Lucas: 8:00pm                       │
│ (follow hunger cues)                │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ 📶 WiFi                             │
│ Network: SmithFamily                │
│ Password: xyz123                    │
│                                     │
│ 🔐 Alarm Code                       │
│ 1234                                │
│                                     │
└─────────────────────────────────────┘
```

### 8. Family & Profiles

Manage all household members. Tap any person to see their profile.

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
│ ┌─────────────────────────────────┐ │
│ │  👶 Lucas                1 mo  │ │
│ │  Child                          │ │
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
│ ├─────────────────────────────────┤ │
│ │ Rode tricycle 🚲                │ │
│ │ 1 week ago                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ QUICK LINKS                         │
│ ┌───────────┐ ┌───────────┐        │
│ │  📅       │ │  💊       │        │
│ │ Calendar  │ │ Vaccines  │        │
│ └───────────┘ └───────────┘        │
│ ┌───────────┐ ┌───────────┐        │
│ │  ⭐       │ │  📝       │        │
│ │Milestones │ │  Notes    │        │
│ └───────────┘ └───────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Profile Actions:**
- Edit name, avatar, birthday
- Assign color (for calendar/events)
- Set role (Admin, Member, Child)
- View their events filtered
- View their milestones
- View their medical records
- View their tasks/chores

**Avatar Colors:**
Each person gets assigned a color used throughout the app:
- Events on calendar
- Tasks assigned to them
- Milestones
- Quick visual filter

## Design System

### Colors

```
Primary:     #3B82F6 (blue)
Secondary:   #10B981 (green)
Accent:      #F59E0B (amber)
Danger:      #EF4444 (red)

Background:  #FFFFFF (light) / #0F172A (dark)
Surface:     #F8FAFC (light) / #1E293B (dark)
Text:        #0F172A (light) / #F8FAFC (dark)
Muted:       #64748B
```

**Family member colors:**
- Parent 1: Blue
- Parent 2: Green
- Child 1: Pink
- Child 2: Purple
- Shared/Everyone: Gray

### Typography

```
Font: Inter (system fallback)

H1:  24px / Bold
H2:  20px / Semibold
H3:  18px / Semibold
Body: 16px / Regular
Small: 14px / Regular
Caption: 12px / Regular
```

### Spacing

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
```

### Touch Targets

- Minimum: 44px × 44px
- Bottom nav: 56px height
- List items: 56px minimum height
- Buttons: 48px height

### Border Radius

```
sm:  4px   (buttons, inputs)
md:  8px   (cards)
lg:  16px  (modals, bottom sheets)
full: 9999px (pills, avatars)
```

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

## Responsive Breakpoints

```
Mobile:   0 - 639px    (bottom nav)
Tablet:   640 - 1023px (bottom nav, 2 columns)
Desktop:  1024px+      (sidebar nav, 3+ columns)
```

## PWA Features

- Installable on home screen
- Offline support for viewing cached data
- Push notifications (optional)
- Share target (share text/images to app)
