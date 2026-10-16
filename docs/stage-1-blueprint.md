# EthioPrep — Stage 1: UI/UX Design Blueprint & Sitemap Specification

**Version:** 1.0  
**Date:** 2026-10-16  
**Status:** Approved for Implementation  

---

## Table of Contents

1. [Sitemap & Route Inventory](#1-sitemap--route-inventory)
2. [Design Tokens & Typography Specification](#2-design-tokens--typography-specification)
3. [Reusable Component API Inventory](#3-reusable-component-api-inventory)
4. [ASCII Wireframes](#4-ascii-wireframes)
5. [Appendix: State Machine Diagrams](#5-appendix-state-machine-diagrams)

---

## 1. Sitemap & Route Inventory

### 1.1 Route Table

| Route | Page | Access Level | Layout | Entry Points | Exit Points |
|---|---|---|---|---|---|
| **Public Pages** | | | | | |
| `/` | Homepage | Public | PublicLayout | Direct URL, Search Engines | `/subjects`, `/register`, `/login` |
| `/subjects` | Subject Catalog | Public | PublicLayout | Homepage, Header Nav | `/subjects/:slug`, `/register` |
| `/subjects/:slug` | Subject Detail | Public | PublicLayout | Subject Catalog, Search | `/lessons/:id`, `/practice/:topicId`, `/register` |
| `/resources` | Public Resource Library | Public | PublicLayout | Homepage, Header Nav | External resource URLs |
| `/about` | About / FAQ / Contact | Public | PublicLayout | Footer, Header Nav | `/register`, `/` |
| `/register` | Registration | Public (redirect if authed) | MinimalLayout | Any public page CTA | `/dashboard`, `/login` |
| `/login` | Login | Public (redirect if authed) | MinimalLayout | Any public page CTA | `/dashboard`, `/register` |
| **Student Pages** | | | | | |
| `/dashboard` | Student Dashboard | Authenticated (Student) | DashboardLayout | Login, Header Nav | `/lessons/:id`, `/exams/:id/instructions`, `/history` |
| `/lessons/:id` | Lesson Viewer | Authenticated or Public (free) | LearningLayout | Subject Detail, Dashboard, Bookmarks | `/practice/:topicId`, Next Lesson, `/bookmarks` |
| `/practice/:topicId` | Topic Practice | Authenticated (Student) | LearningLayout | Lesson Viewer, Subject Detail | `/dashboard`, Lesson Viewer |
| `/exams/:id/instructions` | Exam Instructions | Authenticated (Student) | MinimalLayout | Dashboard, Subject Detail | `/exams/:id/attempt`, `/dashboard` |
| `/exams/:id/attempt` | Active Timed Exam | Authenticated (Student) | ExamLayout (no nav) | Exam Instructions ONLY | `/attempts/:id/results` (submit) |
| `/attempts/:id/results` | Exam Results | Authenticated (Student) | DashboardLayout | Active Exam (submit) | `/dashboard`, `/exams/:id/instructions` (retry) |
| `/bookmarks` | Bookmarks | Authenticated (Student) | DashboardLayout | Dashboard Sidebar, Header | `/lessons/:id`, `/practice/:topicId` |
| `/history` | Learning History | Authenticated (Student) | DashboardLayout | Dashboard Sidebar | `/lessons/:id`, `/attempts/:id/results` |
| `/profile` | Profile & Language | Authenticated (Student) | DashboardLayout | Dashboard Sidebar, Header | `/dashboard` |
| **Admin Pages** | | | | | |
| `/admin` | Admin Overview | Authenticated (Admin) | AdminLayout | Login (admin) | Any admin sub-page |
| `/admin/subjects` | Subject & Topic Manager | Authenticated (Admin) | AdminLayout | Admin Overview | `/admin/lessons`, `/admin/questions` |
| `/admin/lessons` | Lesson Editor | Authenticated (Admin) | AdminLayout | Admin Overview, Subject Manager | `/admin/subjects` |
| `/admin/questions` | Question Bank Editor | Authenticated (Admin) | AdminLayout | Admin Overview | `/admin/exams` |
| `/admin/exams` | Exam Builder | Authenticated (Admin) | AdminLayout | Admin Overview, Question Bank | `/admin/questions` |
| `/admin/resources` | Resource Manager | Authenticated (Admin) | AdminLayout | Admin Overview | — |

### 1.2 Layout Definitions

| Layout | Components | Description |
|---|---|---|
| `PublicLayout` | `Header` + `Footer` + `MobileNav` | Standard public navigation with language switcher |
| `MinimalLayout` | Logo + Back link only | Distraction-free for auth flows |
| `DashboardLayout` | `Header` + `DashboardSidebar` + `MobileNav` | Persistent sidebar on desktop, bottom nav on mobile |
| `LearningLayout` | `Header` + topic sidebar (collapsible) + `MobileNav` | Lesson-focused with contextual topic navigation |
| `ExamLayout` | Timer bar only (no header/nav) | Fully immersive exam-taking, prevents accidental navigation |
| `AdminLayout` | `Header` (admin variant) + Admin sidebar + `MobileNav` | Full admin navigation |

### 1.3 Redirect Rules

| Condition | Action |
|---|---|
| Authenticated user visits `/login` or `/register` | Redirect to `/dashboard` |
| Unauthenticated user visits any `/dashboard/*`, `/bookmarks`, `/history`, `/profile`, `/exams/*/attempt` | Redirect to `/login?redirect=<original_path>` |
| Non-admin visits `/admin/*` | Redirect to `/dashboard` with toast error |
| Student accesses premium lesson without premium tier | Show lesson preview + `AccessBadge` upgrade prompt |
| 404 / Unknown route | Show custom 404 page with navigation suggestions |

### 1.4 Navigation Architecture

```
┌─────────────────────────────────────────────────┐
│                   HEADER                        │
│  Logo  │  Home  Subjects  Resources  About  │  │
│         │                                    │  │
│         │            (Public Nav)             │🌐│ ← Language Switcher
│         │                                    │  │
│         │  Dashboard  Bookmarks  Profile      │👤│ ← Auth Nav (when logged in)
└─────────────────────────────────────────────────┘

Mobile (< 768px):
┌─────────────────────────────────────────────────┐
│  ☰ Logo                              🌐  👤    │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│   🏠     📚     📝     📊     👤              │
│  Home  Subjects Exams  Dashboard Profile       │
└─────────────────────────────────────────────────┘
           ↑ Bottom Tab Navigation
```

---

## 2. Design Tokens & Typography Specification

### 2.1 Color Tokens (Tailwind CSS)

```javascript
// tailwind.config.js — colors extension
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          navy:     '#142D4E',  // Primary — headings, nav bg, text
          'navy-light': '#1E3F6B', // Nav hover, subtle contrast
          'navy-dark':  '#0E1F35', // Footer, deep backgrounds
          teal:     '#167D78',  // Primary actions, progress fills, links
          'teal-light': '#1A9B95', // Hover state for teal buttons
          'teal-dark':  '#125F5B', // Active/pressed state
          bg:       '#F3F6FA',  // Page background, card panels
          'bg-alt': '#E8ECF2',  // Alternate row, section dividers
          gold:     '#F0B44D',  // Badges, flags, small highlights
          'gold-light': '#F5CC7A', // Gold hover
          'gold-dark':  '#D99A2B', // Gold active
        },
        // Semantic aliases
        surface: {
          DEFAULT:  '#FFFFFF',  // Cards, modals, form backgrounds
          muted:    '#F8F9FB',  // Subtle difference from page bg
        },
        text: {
          primary:   '#142D4E', // Main body text (navy)
          secondary: '#4A5568', // Descriptions, meta text
          muted:     '#718096', // Timestamps, placeholders
          inverse:   '#FFFFFF', // Text on dark backgrounds
        },
        status: {
          success:  '#22C55E',  // Correct answers, completed states
          error:    '#EF4444',  // Wrong answers, validation errors
          warning:  '#F59E0B',  // Warnings, flagged items
          info:     '#3B82F6',  // Informational banners
        },
        border: {
          DEFAULT:  '#E2E8F0',  // Default borders
          focus:    '#167D78',  // Focus rings (teal)
        },
      },
    },
  },
}
```

### 2.2 Spacing & Layout Tokens

```javascript
// tailwind.config.js — spacing/layout
module.exports = {
  theme: {
    extend: {
      spacing: {
        'nav-height': '64px',     // Desktop header height
        'nav-height-mobile': '56px', // Mobile header height
        'bottom-nav': '64px',     // Mobile bottom navigation
        'sidebar-w': '280px',     // Dashboard sidebar width
        'sidebar-w-collapsed': '64px',
        'content-max': '1200px',  // Max content width
        'lesson-max': '720px',    // Optimal lesson reading width
      },
      screens: {
        'xs': '360px',    // Minimum target (affordable Android)
        'sm': '640px',    // Small phones landscape
        'md': '768px',    // Tablets, sidebar breakpoint
        'lg': '1024px',   // Desktop
        'xl': '1280px',   // Wide desktop
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '6px',
        'pill': '9999px',
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(20,45,78,0.08), 0 1px 2px rgba(20,45,78,0.06)',
        'card-hover': '0 4px 12px rgba(20,45,78,0.12)',
        'nav':     '0 2px 8px rgba(20,45,78,0.08)',
        'modal':   '0 20px 60px rgba(20,45,78,0.2)',
      },
    },
  },
}
```

### 2.3 Typography Scale

```javascript
// tailwind.config.js — font families & sizes
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans:     ['Inter', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Mobile-first scale (360px minimum)
        'display':  ['2rem',     { lineHeight: '2.5rem',  letterSpacing: '-0.02em' }],  // 32px — Hero headings
        'h1':       ['1.75rem',  { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],  // 28px — Page titles
        'h2':       ['1.375rem', { lineHeight: '1.875rem' }],                            // 22px — Section headings
        'h3':       ['1.125rem', { lineHeight: '1.625rem' }],                            // 18px — Card titles
        'body':     ['1rem',     { lineHeight: '1.625rem' }],                            // 16px — Body text
        'body-sm':  ['0.875rem', { lineHeight: '1.375rem' }],                            // 14px — Secondary text
        'caption':  ['0.75rem',  { lineHeight: '1.125rem' }],                            // 12px — Labels, timestamps
      },
    },
  },
}
```

### 2.4 Ethiopic Typography Rules

| Rule | Specification |
|---|---|
| **Primary font** | `Noto Sans Ethiopic` (loaded via Google Fonts, `wght@400;500;600;700`) |
| **Line height multiplier** | Ethiopic glyphs are taller — use `leading-relaxed` (1.625) minimum for body, `leading-loose` (2.0) for dense content blocks |
| **Word wrap** | Ethiopic has no spaces between words in some compound phrases; set `overflow-wrap: break-word` and `hyphens: manual` |
| **Min touch target** | 44×44px for all interactive elements (WCAG 2.1 AA) |
| **Amharic body max-width** | Amharic text is wider by ~15-20%; allow `max-w-[800px]` for lesson bodies in `am` mode |
| **Math rendering** | KaTeX block equations: `overflow-x: auto; max-width: 100%` with `-webkit-overflow-scrolling: touch` for smooth mobile scroll |
| **RTL** | Amharic is LTR — no RTL considerations needed |

### 2.5 Math (KaTeX) Rendering Rules

```css
/* KaTeX mobile-safe container */
.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
}

/* Prevent equation overflow on 360px screens */
.katex-display > .katex {
  white-space: nowrap;
}

/* Inline math baseline alignment */
.katex {
  font-size: 1.05em; /* Slightly larger than body for readability */
}
```

---

## 3. Reusable Component API Inventory

### 3.1 `Button`

```typescript
interface ButtonProps {
  /** Visual variant */
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size preset */
  size: 'sm' | 'md' | 'lg';
  /** Full-width mode (mobile) */
  fullWidth?: boolean;
  /** Loading spinner replaces children */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Optional left icon (React element) */
  leftIcon?: React.ReactNode;
  /** Optional right icon */
  rightIcon?: React.ReactNode;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: () => void;
  /** Accessible label */
  'aria-label'?: string;
  children: React.ReactNode;
}
```

**Visual States:**

| State | Primary (`brand-teal`) | Secondary (`brand-navy`) | Outline | Ghost | Danger |
|---|---|---|---|---|---|
| Default | `bg-brand-teal text-white` | `bg-brand-navy text-white` | `border-brand-teal text-brand-teal` | `text-brand-teal` | `bg-status-error text-white` |
| Hover | `bg-brand-teal-light` | `bg-brand-navy-light` | `bg-brand-teal/10` | `bg-brand-teal/5` | `bg-red-600` |
| Active | `bg-brand-teal-dark` | `bg-brand-navy-dark` | `bg-brand-teal/20` | `bg-brand-teal/10` | `bg-red-700` |
| Disabled | `opacity-50 cursor-not-allowed` | same | same | same | same |
| Loading | Spinner icon, disabled | same | same | same | same |

---

### 3.2 `Input`

```typescript
interface InputProps {
  /** Input type */
  type: 'text' | 'email' | 'password' | 'search' | 'number';
  /** Controlled value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Label text (bilingual) */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Validation error message */
  error?: string;
  /** Helper text below input */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required indicator */
  required?: boolean;
  /** Optional left icon */
  leftIcon?: React.ReactNode;
  /** Auto-focus */
  autoFocus?: boolean;
  /** HTML input id */
  id: string;
}
```

**Visual States:**

| State | Appearance |
|---|---|
| Default | `border-border bg-surface rounded-button` |
| Focused | `border-border-focus ring-2 ring-brand-teal/20` |
| Error | `border-status-error ring-2 ring-status-error/20` + red error text below |
| Disabled | `bg-surface-muted opacity-60 cursor-not-allowed` |

---

### 3.3 `Select`

```typescript
interface SelectOption {
  value: string;
  label_en: string;
  label_am: string;
}

interface SelectProps {
  /** Available options */
  options: SelectOption[];
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Label text */
  label: string;
  /** Placeholder when no selection */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Disabled */
  disabled?: boolean;
  /** Required */
  required?: boolean;
  id: string;
}
```

**States:** Same border/focus/error pattern as `Input`.

---

### 3.4 `LanguageSwitcher`

```typescript
interface LanguageSwitcherProps {
  /** Compact mode for header (icon only on mobile) */
  compact?: boolean;
}
```

**Behavior:**
- Toggles between `'en'` and `'am'` via `LanguageContext`
- Persists selection to `localStorage('ethioprep_lang')`
- Shows 🌐 icon with current language code (`EN` / `አማ`)
- Compact mode: icon-only on mobile, text on desktop
- States: Default, Hover, Active (current language highlighted)

---

### 3.5 `Header`

```typescript
interface HeaderProps {
  /** Variant determines navigation items shown */
  variant: 'public' | 'student' | 'admin';
}
```

**Behavior:**
- Sticky top, `h-nav-height` (64px desktop, 56px mobile)
- `shadow-nav`, `bg-brand-navy`, `text-white`
- Logo left, navigation center (desktop) / hamburger (mobile)
- `LanguageSwitcher` + auth buttons right
- On mobile < 768px: collapses to logo + hamburger + switcher

---

### 3.6 `Footer`

```typescript
interface FooterProps {
  /** Minimal mode hides secondary links */
  minimal?: boolean;
}
```

**Sections:** About blurb, Quick Links, Legal Links, Social/Contact, Copyright  
**States:** Full (public pages), Minimal (dashboard/admin), Hidden (active exam)

---

### 3.7 `MobileNav`

```typescript
interface MobileNavProps {
  /** Navigation items based on auth state */
  variant: 'public' | 'student' | 'admin';
}
```

**Behavior:**
- Fixed bottom bar, visible only < 768px
- 5 icon tabs with labels: Home, Subjects, Exams, Dashboard, Profile
- Active tab: `text-brand-teal`, inactive: `text-text-muted`
- Hidden during active exam (`ExamLayout`)
- Safe area padding for notched phones

---

### 3.8 `DashboardSidebar`

```typescript
interface DashboardSidebarProps {
  /** Collapsed state (icon-only) */
  collapsed?: boolean;
  /** Toggle collapse handler */
  onToggle?: () => void;
}
```

**Nav Items:**
- Dashboard Overview (📊)
- My Subjects (📚)
- Bookmarks (🔖)
- Learning History (📋)
- Profile & Settings (⚙️)

**States:** Expanded (`w-sidebar-w`), Collapsed (`w-sidebar-w-collapsed`, icons only), Hidden (< 768px, uses `MobileNav`)

---

### 3.9 `SubjectCard`

```typescript
interface SubjectCardProps {
  /** Subject data */
  subject: {
    slug: string;
    title_en: string;
    title_am: string;
    description_en: string;
    description_am: string;
    stream: 'natural_science' | 'social_science' | 'common';
    topicCount: number;
    questionCount: number;
    published: boolean;
  };
  /** Show/hide topic and question counts */
  showStats?: boolean;
}
```

**Visual States:**

| State | Appearance |
|---|---|
| Default | `bg-surface rounded-card shadow-card` |
| Hover | `shadow-card-hover translate-y-[-2px] transition-all` |
| Loading | Skeleton placeholder with shimmer |
| Stream badge | Colored pill: Natural Science = `brand-teal`, Social Science = `brand-gold`, Common = `brand-navy` |

---

### 3.10 `TopicRow`

```typescript
interface TopicRowProps {
  topic: {
    id: string;
    title_en: string;
    title_am: string;
    lessonCount: number;
    questionCount: number;
    children?: TopicRowProps['topic'][];
    published: boolean;
  };
  /** Nesting depth for indentation */
  depth: number;
  /** Expanded state for children */
  isExpanded: boolean;
  /** Toggle handler */
  onToggle: () => void;
  /** Completion percentage (0-100) for authenticated students */
  completionPercent?: number;
}
```

**Visual States:**
- Default: row with expand chevron, title, counts, optional `ProgressBar`
- Expanded: chevron rotates 90°, children indent by `depth * 1rem`
- Completed: subtle green check icon
- Empty (no lessons): muted text "Coming soon"

---

### 3.11 `LessonContent`

```typescript
interface LessonContentProps {
  /** Lesson content in current language (Markdown + KaTeX) */
  content: string;
  /** Current language for typography adjustments */
  language: 'en' | 'am';
  /** Estimated reading time in minutes */
  estimatedMinutes?: number;
}
```

**Behavior:**
- Renders Markdown (headings, lists, code blocks, callouts, tables)
- Renders inline and block KaTeX math
- Block math wrapped in scrollable container for mobile
- Language-aware: uses `font-ethiopic` class when `am`, adjusts `leading-relaxed`
- Provides `max-w-lesson-max` (720px) centered reading column

---

### 3.12 `ProgressBar`

```typescript
interface ProgressBarProps {
  /** Completion value (0-100) */
  value: number;
  /** Size */
  size: 'sm' | 'md' | 'lg';
  /** Show percentage label */
  showLabel?: boolean;
  /** Color variant */
  variant: 'teal' | 'gold' | 'success' | 'error';
  /** Accessible label */
  'aria-label': string;
}
```

**Visual States:**

| Range | Color | Label |
|---|---|---|
| 0% | `bg-border` (empty track) | "Not started" |
| 1–59% | `bg-brand-gold` or `bg-status-error` (weak) | Percentage |
| 60–89% | `bg-brand-teal` (on track) | Percentage |
| 90–100% | `bg-status-success` (strong) | Percentage or ✓ |

---

### 3.13 `QuestionOption`

```typescript
interface QuestionOptionProps {
  /** Option label (A, B, C, D) */
  label: string;
  /** Option text content (bilingual) */
  text: string;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Selection handler */
  onSelect: () => void;
  /** Review mode: show correct/incorrect styling */
  reviewMode?: boolean;
  /** Is this option the correct answer (review mode only) */
  isCorrect?: boolean;
  /** Is this the student's selected answer (review mode only) */
  wasSelected?: boolean;
  /** Disabled state */
  disabled?: boolean;
}
```

**Visual States:**

| State | Appearance |
|---|---|
| Default | `border-border bg-surface` with label badge left |
| Hover | `border-brand-teal/40 bg-brand-teal/5` |
| Selected | `border-brand-teal bg-brand-teal/10` with filled radio |
| Disabled | `opacity-50 cursor-not-allowed` |
| Review — Correct | `border-status-success bg-green-50` with ✓ icon |
| Review — Incorrect (was selected) | `border-status-error bg-red-50` with ✗ icon |
| Review — Correct (not selected) | `border-status-success bg-green-50/50` subtle highlight |

---

### 3.14 `QuestionNavigator`

```typescript
interface QuestionNavigatorProps {
  /** Total number of questions */
  totalQuestions: number;
  /** Current question index (0-based) */
  currentIndex: number;
  /** Set of answered question indices */
  answeredIndices: Set<number>;
  /** Set of flagged question indices */
  flaggedIndices: Set<number>;
  /** Navigate to question handler */
  onNavigate: (index: number) => void;
}
```

**Visual States per cell:**

| Status | Color | Border |
|---|---|---|
| Unanswered | `bg-surface border-border` | — |
| Answered | `bg-brand-teal text-white` | — |
| Flagged | `bg-brand-gold text-white` | — |
| Current | — | `ring-2 ring-brand-navy` |
| Answered + Flagged | `bg-brand-teal` | `ring-2 ring-brand-gold` |

---

### 3.15 `Timer`

```typescript
interface TimerProps {
  /** Remaining seconds */
  remainingSeconds: number;
  /** Total duration in seconds (for progress calculation) */
  totalSeconds: number;
  /** Callback when timer reaches 0 */
  onExpire: () => void;
  /** Paused state (if needed for admin preview) */
  isPaused?: boolean;
}
```

**Visual States:**

| Remaining | Color | Behavior |
|---|---|---|
| > 5 min | `text-text-primary` | Normal display `HH:MM:SS` |
| 1–5 min | `text-brand-gold` | Warning state |
| < 1 min | `text-status-error animate-pulse` | Critical urgency |
| 0 | — | Triggers `onExpire()`, auto-submit |

---

### 3.16 `ResultSummary`

```typescript
interface ResultSummaryProps {
  /** Total score achieved */
  score: number;
  /** Maximum possible score */
  maxScore: number;
  /** Time taken in seconds */
  timeTaken: number;
  /** Total allotted time in seconds */
  totalTime: number;
  /** Per-topic breakdown */
  topicBreakdown: Array<{
    topicTitle: string;
    correct: number;
    total: number;
    percentage: number;
  }>;
}
```

**Visual States:**

| Percentage | Color | Message (en) |
|---|---|---|
| ≥ 90% | `text-status-success` | "Excellent! Keep it up!" |
| 70–89% | `text-brand-teal` | "Good work! Review flagged topics." |
| 50–69% | `text-brand-gold` | "Fair result. Focus on weak areas." |
| < 50% | `text-status-error` | "Needs improvement. Review lessons." |

---

### 3.17 `EmptyState`

```typescript
interface EmptyStateProps {
  /** Illustration type */
  icon: 'bookmarks' | 'history' | 'search' | 'subjects' | 'exams';
  /** Bilingual title */
  title: string;
  /** Bilingual description */
  description: string;
  /** Optional CTA button */
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### 3.18 `LoadingState`

```typescript
interface LoadingStateProps {
  /** Display mode */
  variant: 'spinner' | 'skeleton' | 'dots';
  /** Size */
  size: 'sm' | 'md' | 'lg' | 'full-page';
  /** Accessible label */
  label?: string;
}
```

**Rules:**
- `spinner`: centered rotating icon for page-level loads
- `skeleton`: shimmer rectangles matching the shape of expected content (cards, text lines)
- `dots`: three bouncing dots for inline loading indicators
- `full-page`: centered spinner with brand-teal color + label text

---

### 3.19 `ErrorMessage`

```typescript
interface ErrorMessageProps {
  /** Error title */
  title: string;
  /** Detailed message */
  message: string;
  /** Error type for styling */
  type: 'inline' | 'banner' | 'page';
  /** Retry action */
  onRetry?: () => void;
  /** Dismiss action */
  onDismiss?: () => void;
}
```

**Visual States:**

| Type | Placement | Style |
|---|---|---|
| `inline` | Below form fields | `text-status-error text-body-sm` |
| `banner` | Top of page/section | `bg-red-50 border-l-4 border-status-error` |
| `page` | Full page replacement | Centered icon + message + Retry button |

---

### 3.20 `ConfirmationDialog`

```typescript
interface ConfirmationDialogProps {
  /** Dialog visibility */
  isOpen: boolean;
  /** Title text */
  title: string;
  /** Body message */
  message: string;
  /** Confirm button label */
  confirmLabel: string;
  /** Cancel button label */
  cancelLabel: string;
  /** Confirm action */
  onConfirm: () => void;
  /** Cancel action (close) */
  onCancel: () => void;
  /** Destructive styling for confirm */
  isDestructive?: boolean;
}
```

**Behavior:**
- Modal overlay with `bg-black/50`
- Focus trapped inside dialog
- `Escape` key triggers `onCancel`
- `isDestructive`: confirm button uses `variant="danger"`

---

### 3.21 `AccessBadge`

```typescript
interface AccessBadgeProps {
  /** Access tier */
  tier: 'free' | 'premium';
  /** Size variant */
  size: 'sm' | 'md';
}
```

**Visual States:**

| Tier | Appearance |
|---|---|
| `free` | `bg-status-success/10 text-status-success border-status-success/20` — "Free" / "ነጻ" |
| `premium` | `bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20` — "Premium" / "ፕሪሚየም" |

---

## 4. ASCII Wireframes

### 4.1 Homepage — Desktop (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│ HEADER  [Logo EthioPrep]  Home  Subjects  Resources  About  🌐 Login│
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    HERO SECTION                              │  │
│  │                                                              │  │
│  │   "Master Your Grade 12 National Exam"                       │  │
│  │   "የ12ኛ ክፍል ብሔራዊ ፈተናን ያሸንፉ"                               │  │
│  │                                                              │  │
│  │   Bilingual lessons • Timed practice • Progress tracking     │  │
│  │                                                              │  │
│  │   [Get Started Free]    [Browse Subjects]                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  STREAM QUICK FILTERS                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │ 🔬 Natural   │  │ 🏛️ Social    │  │ 📖 Common    │             │
│  │   Science    │  │   Science    │  │              │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                    │
│  FEATURED SUBJECTS                                                 │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                  │
│  │ Math   │  │Physics │  │ Chem   │  │Biology │                  │
│  │ 12 ch  │  │ 10 ch  │  │ 11 ch  │  │ 13 ch  │                  │
│  │ 240 Q  │  │ 180 Q  │  │ 200 Q  │  │ 260 Q  │                  │
│  │[Free]  │  │[Free]  │  │[Free]  │  │[Free]  │                  │
│  └────────┘  └────────┘  └────────┘  └────────┘                  │
│                                                                    │
│  HOW ETHIOPREP WORKS                                               │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐        │
│  │  1   │───>│  2   │───>│  3   │───>│  4   │───>│  5   │        │
│  │Disc- │    │Learn │    │Prac- │    │Review│    │Impr- │        │
│  │over  │    │      │    │tice  │    │      │    │ove   │        │
│  └──────┘    └──────┘    └──────┘    └──────┘    └──────┘        │
│                                                                    │
│  FREE VS PREMIUM COMPARISON                                       │
│  ┌───────────────────┬──────────┬──────────┐                      │
│  │ Feature           │  Free    │ Premium  │                      │
│  ├───────────────────┼──────────┼──────────┤                      │
│  │ Selected Lessons  │    ✓     │    ✓     │                      │
│  │ All Lessons       │    —     │    ✓     │                      │
│  │ Basic Practice    │    ✓     │    ✓     │                      │
│  │ Full Mock Exams   │    —     │    ✓     │                      │
│  │ Progress Tracking │  Basic   │ Advanced │                      │
│  │ Resources         │ Selected │   All    │                      │
│  └───────────────────┴──────────┴──────────┘                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       CTA BANNER                             │  │
│  │   "Start Learning Today — It's Free"   [Register Now]        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ FOOTER  About │ Terms │ Privacy │ Contact │ © 2026 EthioPrep      │
└────────────────────────────────────────────────────────────────────┘
```

### 4.2 Homepage — Mobile (360px)

```
┌──────────────────────────┐
│ ☰ EthioPrep         🌐 👤│
├──────────────────────────┤
│                          │
│  Master Your Grade 12    │
│  National Exam           │
│                          │
│  የ12ኛ ክፍል ብሔራዊ         │
│  ፈተናን ያሸንፉ             │
│                          │
│  [Get Started Free    ]  │
│  [Browse Subjects     ]  │
│                          │
│ ┌───────┐ ┌───────┐     │
│ │🔬 Nat │ │🏛️ Soc │     │
│ └───────┘ └───────┘     │
│      ┌───────┐           │
│      │📖 Com │           │
│      └───────┘           │
│                          │
│ ┌────────────────────┐   │
│ │ Mathematics        │   │
│ │ 12 chapters · 240Q │   │
│ │ [Free]             │   │
│ └────────────────────┘   │
│ ┌────────────────────┐   │
│ │ Physics            │   │
│ │ 10 chapters · 180Q │   │
│ │ [Free]             │   │
│ └────────────────────┘   │
│                          │
│ 1→2→3→4→5               │
│ Discover → Improve       │
│                          │
│ [Register Now         ]  │
│                          │
│ Footer (stacked)         │
├──────────────────────────┤
│ 🏠  📚  📝  📊  👤     │
│Home Sub Exam Dash Prof   │
└──────────────────────────┘
```

### 4.3 Lesson Viewer — Desktop (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│ HEADER  [EthioPrep]  Home  Subjects  Resources    🌐  Dashboard 👤│
├────────────────┬───────────────────────────────────────────────────┤
│ TOPIC SIDEBAR  │  LESSON CONTENT                                   │
│ (280px)        │                                                   │
│                │  📚 Mathematics > Calculus > Limits                │
│ ▾ Ch 1: Limits │                                                   │
│   ✓ 1.1 Intro  │  ┌─────────────────────────────────────────────┐  │
│   ● 1.2 Def... │  │ Lesson: Definition of Limits         ~8 min │  │
│     1.3 Props  │  │ [🔖 Bookmark]   [✓ Mark Complete]           │  │
│ ▸ Ch 2: Deriv  │  ├─────────────────────────────────────────────┤  │
│ ▸ Ch 3: Integ  │  │                                             │  │
│                │  │  A limit describes the value that a         │  │
│ ● = current    │  │  function approaches as the input           │  │
│ ✓ = completed  │  │  approaches some value.                     │  │
│                │  │                                             │  │
│                │  │  ┌─ DEFINITION ─────────────────────────┐   │  │
│                │  │  │                                      │   │  │
│                │  │  │  lim f(x) = L                        │   │  │
│                │  │  │  x→a                                 │   │  │
│                │  │  │                                      │   │  │
│                │  │  │  means for every ε > 0 there exists  │   │  │
│                │  │  │  δ > 0 such that |f(x) - L| < ε     │   │  │
│                │  │  │  whenever 0 < |x - a| < δ           │   │  │
│                │  │  └──────────────────────────────────────┘   │  │
│                │  │                                             │  │
│                │  │  ┌─ WORKED EXAMPLE ─────────────────────┐   │  │
│                │  │  │ Find lim (3x + 1)                    │   │  │
│                │  │  │      x→2                             │   │  │
│                │  │  │                                      │   │  │
│                │  │  │ Solution:                            │   │  │
│                │  │  │ = 3(2) + 1 = 7                      │   │  │
│                │  │  └──────────────────────────────────────┘   │  │
│                │  │                                             │  │
│                │  │  [Practice This Topic →]                    │  │
│                │  │                                             │  │
│                │  │  ← Previous Lesson    Next Lesson →         │  │
│                │  └─────────────────────────────────────────────┘  │
├────────────────┴───────────────────────────────────────────────────┤
│ FOOTER                                                             │
└────────────────────────────────────────────────────────────────────┘
```

### 4.4 Lesson Viewer — Mobile (360px)

```
┌──────────────────────────┐
│ ← Math: Limits       🌐 │
├──────────────────────────┤
│                          │
│ Definition of Limits     │
│ ~8 min  [🔖] [✓ Done]   │
│                          │
│ ⚠ Translation pending    │
│ (Shown if am is partial) │
│                          │
│ A limit describes the    │
│ value that a function    │
│ approaches as the input  │
│ approaches some value.   │
│                          │
│ ┌─ DEFINITION ────────┐ │
│ │                      │ │
│ │ lim f(x) = L     ←→ │ │
│ │ x→a             scroll│
│ │                      │ │
│ └──────────────────────┘ │
│                          │
│ ┌─ WORKED EXAMPLE ────┐ │
│ │ Find lim (3x + 1)   │ │
│ │      x→2            │ │
│ │ Solution: 7          │ │
│ └──────────────────────┘ │
│                          │
│ [Practice This Topic  ]  │
│                          │
│ [← Prev]     [Next →]   │
│                          │
│ ┌──────────────────────┐ │
│ │ 📑 Topic Navigator   │ │
│ │ (expandable drawer)  │ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ 🏠  📚  📝  📊  👤     │
└──────────────────────────┘
```

### 4.5 Active Timed Exam — Desktop (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│  EXAM BAR   Mathematics Mock Exam 1          ⏱ 01:23:45   [Submit]│
│  ████████████████████░░░░░░░░░░  Q 15/40     ▓▓▓▓▓▓▓░░░░ 65% time│
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Question 15 of 40                               [🚩 Flag]        │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ What is the derivative of f(x) = 3x² + 2x - 5?             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌─ A ─────────────────────────────────────────────────────────┐  │
│  │  6x + 2                                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─ B ─────────────────────────────────────────────────────── ●┐  │
│  │  6x - 2                                             selected│  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─ C ─────────────────────────────────────────────────────────┐  │
│  │  3x + 2                                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─ D ─────────────────────────────────────────────────────────┐  │
│  │  6x² + 2                                                    │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  [← Previous]                                        [Next →]     │
│                                                                    │
│  QUESTION NAVIGATOR                                                │
│  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐                                 │
│  │✓1│✓2│✓3│✓4│ 5│✓6│🚩│✓8│ 9│✓ │                                 │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤                                 │
│  │✓ │✓ │✓ │✓ │●●│  │  │  │  │  │ ● = current                    │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤ ✓ = answered                   │
│  │  │  │  │  │  │  │  │  │  │  │ 🚩 = flagged                    │
│  ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤ □ = unanswered                 │
│  │  │  │  │  │  │  │  │  │  │  │                                  │
│  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
   (No header, no footer, no bottom nav — full immersion)
```

### 4.6 Active Timed Exam — Mobile (360px)

```
┌──────────────────────────┐
│ ⏱ 01:23:45    Q15/40    │
│ ████████░░░░  [Submit]   │
├──────────────────────────┤
│                          │
│ Q15              [🚩]   │
│                          │
│ What is the derivative   │
│ of f(x) = 3x² + 2x - 5? │
│                          │
│ ┌─ A ────────────────┐  │
│ │ 6x + 2             │  │
│ └────────────────────┘  │
│ ┌─ B ───────────── ● ┐  │
│ │ 6x - 2       sel   │  │
│ └────────────────────┘  │
│ ┌─ C ────────────────┐  │
│ │ 3x + 2             │  │
│ └────────────────────┘  │
│ ┌─ D ────────────────┐  │
│ │ 6x² + 2            │  │
│ └────────────────────┘  │
│                          │
│ [← Prev]     [Next →]   │
│                          │
│ ┌──────────────────────┐ │
│ │ 📋 Navigator (tap)   │ │
│ │ ✓✓✓✓ ✓🚩✓ ●         │ │
│ └──────────────────────┘ │
│                          │
└──────────────────────────┘
  (No bottom nav in exam)
```

### 4.7 Student Dashboard — Desktop (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│ HEADER  [EthioPrep]  Home  Subjects  Resources    🌐  John D.  👤│
├────────────────┬───────────────────────────────────────────────────┤
│ SIDEBAR        │  DASHBOARD                                        │
│                │                                                   │
│ 📊 Dashboard   │  Welcome back, John!           Stream: Nat. Sci.  │
│ 📚 My Subjects │                                                   │
│ 🔖 Bookmarks  │  ┌─ CONTINUE LEARNING ───────────────────────────┐│
│ 📋 History    │  │ 📖 Mathematics > Calculus > Derivatives        ││
│ ⚙️ Profile     │  │ Lesson 2.3: Chain Rule          ~12 min left  ││
│                │  │ [Continue →]                                   ││
│                │  └────────────────────────────────────────────────┘│
│                │                                                   │
│                │  ┌─ QUICK STATS ─────────────────────────────────┐│
│                │  │ Lessons    │  Tests     │  Avg Score │  Study  ││
│                │  │ 24/86 ✓   │  8 taken   │   72%      │ 12 hrs ││
│                │  └───────────┴────────────┴────────────┴─────────┘│
│                │                                                   │
│                │  ┌─ TOPIC MASTERY ───────────────────────────────┐│
│                │  │ Limits       ████████████████░░░   82%        ││
│                │  │ Derivatives  ████████████░░░░░░░   64%        ││
│                │  │ Integrals    ████████░░░░░░░░░░░   43% ⚠     ││
│                │  │ Mechanics    ██████████████████░░   91% ✓     ││
│                │  │ Thermo       █████████░░░░░░░░░░   48% ⚠     ││
│                │  └───────────────────────────────────────────────┘│
│                │  ⚠ = Weak topic (<60%), suggested for review      │
│                │                                                   │
│                │  ┌─ RECENT EXAM HISTORY ─────────────────────────┐│
│                │  │ Date       │ Exam          │ Score │ Grade    ││
│                │  │ 2026-10-14 │ Math Mock 3   │ 38/50 │ 76% ✓   ││
│                │  │ 2026-10-12 │ Physics Mid   │ 22/40 │ 55% ⚠   ││
│                │  │ 2026-10-10 │ Math Mock 2   │ 41/50 │ 82% ✓   ││
│                │  │ [View All History →]                          ││
│                │  └───────────────────────────────────────────────┘│
│                │                                                   │
│                │  ┌─ STUDY RECOMMENDATIONS ──────────────────────┐│
│                │  │ 📌 Review "Integrals" — scoring 43%          ││
│                │  │ 📌 Review "Thermodynamics" — scoring 48%     ││
│                │  │ 📌 Try Physics Mock Exam 2                   ││
│                │  └───────────────────────────────────────────────┘│
├────────────────┴───────────────────────────────────────────────────┤
│ FOOTER (minimal)                                                   │
└────────────────────────────────────────────────────────────────────┘
```

### 4.8 Student Dashboard — Mobile (360px)

```
┌──────────────────────────┐
│ ☰ EthioPrep        🌐 👤│
├──────────────────────────┤
│                          │
│ Welcome, John!           │
│ Natural Science          │
│                          │
│ ┌──────────────────────┐ │
│ │ Continue Learning    │ │
│ │ Math > Derivatives   │ │
│ │ Chain Rule  ~12 min  │ │
│ │ [Continue →]         │ │
│ └──────────────────────┘ │
│                          │
│ ┌────┐ ┌────┐ ┌────┐    │
│ │ 24 │ │ 8  │ │72% │    │
│ │Less│ │Test│ │Avg │    │
│ └────┘ └────┘ └────┘    │
│                          │
│ Topic Mastery            │
│ Limits      ████░ 82%   │
│ Deriv.      ███░░ 64%   │
│ Integ.      ██░░░ 43% ⚠│
│ Mech.       ████░ 91% ✓│
│ Thermo.     ██░░░ 48% ⚠│
│                          │
│ Recent Exams             │
│ ┌──────────────────────┐ │
│ │ Math Mock 3  76% ✓   │ │
│ │ Physics Mid  55% ⚠   │ │
│ │ [View All →]         │ │
│ └──────────────────────┘ │
│                          │
│ 📌 Recommendations       │
│ • Review Integrals (43%)│
│ • Review Thermo (48%)   │
│                          │
├──────────────────────────┤
│ 🏠  📚  📝  📊  👤     │
│Home Sub Exam Dash Prof   │
└──────────────────────────┘
```

---

## 5. Appendix: State Machine Diagrams

### 5.1 Exam Attempt Lifecycle

```
                    ┌──────────┐
                    │  IDLE    │  Student views exam instructions
                    └────┬─────┘
                         │ POST /exams/:id/attempts
                         ▼
                    ┌──────────┐
           ┌───────│ ACTIVE   │──────────┐
           │       │(in prog.)│          │
           │       └────┬─────┘          │
           │            │                │
    PUT /attempts/      │          Timer expires
    :id/answers         │          (auto-submit)
    (save progress)     │                │
           │            │                │
           └────────────┤                │
                        │                │
              POST /attempts/            │
              :id/submit                 │
                        │                │
                        ▼                ▼
                    ┌──────────┐
                    │SUBMITTED │  Server grades in transaction
                    │          │  Score calculated, answers saved
                    └────┬─────┘
                         │
                         ▼
                    ┌──────────┐
                    │ GRADED   │  Results available with explanations
                    └──────────┘

  Server invariants:
  • expires_at = started_at + duration_seconds + 60s grace
  • Submit rejected if now() > expires_at
  • Submit rejected if status ≠ 'active'
  • is_correct and explanation_* NEVER sent while status = 'active'
```

### 5.2 User Authentication Flow

```
  ┌─────────────┐     POST /auth/register     ┌───────────────┐
  │ ANONYMOUS   │ ──────────────────────────> │  REGISTERED   │
  │ (visitor)   │                              │  (student)    │
  └──────┬──────┘                              └───────┬───────┘
         │                                             │
         │  POST /auth/login                           │ Auto-login
         │  (email + password)                         │ after register
         ▼                                             ▼
  ┌─────────────┐                              ┌───────────────┐
  │ Login Page  │ ────── success ────────────> │ AUTHENTICATED │
  │             │                              │   (session)   │
  │             │ <──── 401 / rate limit ───── │               │
  └─────────────┘                              └───────┬───────┘
                                                       │
                                               POST /auth/logout
                                                       │
                                                       ▼
                                               ┌───────────────┐
                                               │  LOGGED OUT   │
                                               │  → redirect / │
                                               └───────────────┘
```

### 5.3 Content Access Decision Tree

```
  Request for lesson/exam/resource
         │
         ▼
  ┌─ Is content published? ─┐
  │                          │
  No                        Yes
  │                          │
  ▼                          ▼
  404                 ┌─ Is access_tier = 'free'? ─┐
                      │                             │
                     Yes                           No (premium)
                      │                             │
                      ▼                             ▼
               Serve content            ┌─ Is user authenticated? ─┐
                                        │                          │
                                       No                         Yes
                                        │                          │
                                        ▼                          ▼
                                   Show preview         ┌─ user.access_tier
                                   + login CTA          │   === 'premium'? ─┐
                                                        │                   │
                                                       Yes                 No
                                                        │                   │
                                                        ▼                   ▼
                                                  Serve content        403 Forbidden
                                                                   + upgrade prompt
```

---

## End of Stage 1 Blueprint

**Next:** Stage 2 — Frontend Foundation & Design System (Vite + React + TS setup, Tailwind tokens implementation, bilingual context, core UI components, and navigation shell).

