# CLAUDE.md

> Instructions for AI assistants (Claude Code, Cursor, Codex) working on Kanpo.
> This is the **source of truth** of the project. Other files (`AGENTS.md`, `.cursorrules`) reference this one.

---

## 🎯 Project context

**Kanpo** is a web app for amateur football in Venezuela. Inspired by IF7SPORTS in Madrid.

- **Audience:** amateur football players in Caracas (phase 1).
- **Differentiator:** USD payments via Venezuelan methods (Zelle, Pago Móvil, Binance Pay, PayPal, USDT) + premium editorial experience.
- **Distribution:** PWA + WhatsApp (no App Store in MVP).

### Product roles

| Role          | Where it lives                   | What it does                                    |
| ------------- | -------------------------------- | ----------------------------------------------- |
| **Player**    | In-app                           | Browses matches, enrolls, pays, uploads receipt |
| **Organizer** | In-app                           | Validates receipts, accepts/rejects players     |
| **Admin**     | Outside the app (separate route) | Creates venues, matches, organizers             |

---

## ⚙️ Tech stack

| Layer     | Technology                                            |
| --------- | ----------------------------------------------------- |
| Framework | Next.js 14 (App Router)                               |
| Language  | TypeScript (strict)                                   |
| Styles    | Tailwind CSS + custom tokens in `src/theme/tokens.ts` |
| Backend   | Supabase (Postgres + Auth + Edge Functions + Storage) |
| Auth      | Google OAuth + Apple OAuth + Magic Link (no SMS)      |
| Deploy    | Vercel                                                |

---

## 📁 Folder structure

```
src/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (app)/
│   │   ├── eventos/page.tsx          # Feed
│   │   ├── partido/[id]/page.tsx     # Match detail
│   │   ├── pago/[id]/page.tsx        # Checkout
│   │   └── perfil/page.tsx           # Profile
│   ├── admin/                        # Admin panel (separate)
│   ├── layout.tsx
│   └── page.tsx                      # Public landing (SEO)
├── components/
│   ├── ui/                           # Primitives: Button, Card, Tab, EyebrowLabel
│   └── features/                     # Domain-specific: MatchCard, PaymentMethodRow
├── lib/
│   ├── supabase/                     # Supabase client (server + client)
│   └── utils.ts
├── theme/
│   └── tokens.ts                     # Single source of truth for design system
├── constants/                        # Strings, enums, config (see rule 2)
├── methods/                          # Logic, transforms, math (see rule 3)
└── types/                            # Shared types + auto-generated from Supabase
```

---

## 🎨 Design System

### Palette (in `tokens.ts` and Tailwind config)

| Token        | Hex       | Use                           |
| ------------ | --------- | ----------------------------- |
| `cream`      | `#F5F1E8` | Main background               |
| `paper`      | `#FBF8F1` | Cards / elevated surfaces     |
| `ink`        | `#0F1410` | Text, primary CTA             |
| `emerald`    | `#0F8A5F` | Brand accent, price, emphasis |
| `gold`       | `#C9A24A` | "Your next match" badge       |
| `text-muted` | `#6B6B66` | Secondary text                |
| `border`     | `#E5E0D5` | Subtle borders                |
| `disabled`   | `#A8A39B` | Disabled state                |

### Typography

- **Bricolage Grotesque** (`font-display`) — display + body
- **Instrument Serif Italic** (`font-serif`) — editorial flourish, sparing use
- **JetBrains Mono** (`font-mono`) — metadata, 11px, 0.16em tracking, UPPERCASE

### Custom utilities (in `globals.css`)

- `.eyebrow` — JetBrains Mono 11px tracked uppercase
- `.tabular` — font-variant-numeric: tabular-nums (for time numerals)
- `.em-italic` — Instrument Serif italic

### Visual signature moves

1. Big tabular time numerals
2. Em-dash in italic serif as a poetic accent
3. Monospace metadata strips (tracked uppercase)
4. Numbered slot grid for participants
5. Ink CTA + Emerald price chip
6. Hero with football pitch lines

---

## 📜 Code rules

These are **mandatory** and apply to all code you generate.

### 1. `useMemo` / `useCallback` — only when they pull weight

Use them **only** for:

- Props passed to children with `React.memo`
- Dependencies of other hooks (`useEffect`, `useMemo`, etc.)

**Never** wrap by default "just in case." React is fast without them in most cases.

### 2. Strings — never hardcoded

Strings **always** in `constants.ts` as **named variables**. Never inline in code.

```ts
// ✅ Good
// constants.ts
export const ENROLL_CTA = "Apuntarme al partido";

// Component.tsx
import { ENROLL_CTA } from './constants';
<Button>{ENROLL_CTA}</Button>

// ❌ Bad
<Button>Apuntarme al partido</Button>
```

### 3. Logic — always in `methods.ts`

Calculations, string transformations, and general logic **always** in `methods.ts` so they can be reused. Components only orchestrate.

```ts
// methods.ts
export const calculateAvailableSlots = (totalSlots: number, enrolled: number) =>
  totalSlots - enrolled

// Component.tsx
const available = calculateAvailableSlots(match.totalSlots, match.enrolled)
```

### 4. Variables — don't create them just to create them

Only create a variable if:

- The value is reused
- It's configurable
- It carries domain/business semantics that clarify the code

```ts
// ❌ Bad — redundant variable
const formattedPrice = `$${match.price}`;
return <p>{formattedPrice}</p>;

// ✅ Good — direct
return <p>${match.price}</p>;
```

### 5. Function naming

| Type             | Pattern                                       | Example                                                   |
| ---------------- | --------------------------------------------- | --------------------------------------------------------- |
| CTAs (props)     | `on` + description + entity                   | `onCompleteExercise`, `onPressEnroll`                     |
| Handlers (funcs) | `handle` + description + entity               | `handleTextUsername`, `handlePressEnroll`                 |
| Booleans         | `is` / `has` / `can` / `should` + description | `isLoading`, `canSubmit`, `hasPayment`, `shouldShowModal` |

### 6. Parameters — never single letters

Parameters **always descriptive**. Never single letters (`s`, `i`, `e`).

In array callbacks: use the **singular** of the collection + a descriptive index.

```ts
// ✅ Good
sets.map((set, setIndex) => ...)
matches.filter((match) => match.isOpen)
exercises.forEach((exercise, exerciseIndex) => ...)

// ❌ Bad
sets.map((s, i) => ...)
matches.filter((m) => m.isOpen)
exercises.forEach((e, i) => ...)
```

---

## 🔤 TypeScript rules (pragmatic — owner is still learning TS)

The owner is learning TypeScript. Keep types **simple and useful**. Don't show off advanced TS unless it genuinely helps.

### TS-1. Prefer inference over explicit types

Don't add types TypeScript can already infer.

```ts
// ❌ Bad — redundant
const matchCount: number = matches.length
const isOpen: boolean = match.enrolled < match.totalSlots

// ✅ Good — inference works
const matchCount = matches.length
const isOpen = match.enrolled < match.totalSlots
```

### TS-2. Always type exported function arguments and return values

Internal helpers can rely on inference. Anything exported from `methods.ts` or shared modules: type it explicitly.

```ts
// ✅ Good
export const calculateAvailableSlots = (totalSlots: number, enrolled: number): number =>
  totalSlots - enrolled
```

### TS-3. Avoid `any` — use `unknown` if you really don't know

`any` defeats the whole point of TypeScript. If a value's shape is genuinely unknown (e.g., raw API response before validation), use `unknown` and narrow it.

```ts
// ❌ Bad
const data: any = await response.json()

// ✅ Good
const data: unknown = await response.json()
if (typeof data === 'object' && data !== null && 'id' in data) {
  // narrowed
}
```

If you find yourself fighting types and considering `any`, stop and ask the owner — there's usually a simpler shape.

### TS-4. Use Supabase auto-generated types

Don't write database types by hand. Use:

```bash
npx supabase gen types typescript --project-id PROJECT_ID > src/types/supabase.ts
```

Import from `src/types/supabase.ts` to keep types in sync with the schema.

### TS-5. Prefer `type` over `interface` (for this project)

Both work, but pick one and stick with it. Kanpo uses `type`.

```ts
// ✅ Good
type Match = {
  id: string
  venue: string
  totalSlots: number
  enrolled: number
}

// Avoid mixing both
```

### TS-6. Don't reach for advanced TS features unless needed

Skip generics, conditional types, mapped types, template literal types, etc. unless they solve a real problem in this codebase. The owner is learning — readability beats cleverness.

If you do use one: explain it inline with a short comment so the owner can follow.

### TS-7. Strict mode is on — fix warnings, don't silence them

`tsconfig.json` is strict. If TS complains, the right move is to fix the code, not add `// @ts-ignore` or `as any`. If you genuinely can't, leave a comment explaining why and ask for review.

---

## 🔑 Key decisions (don't question, already settled)

- **Web app, not React Native** — WhatsApp distribution, instant updates.
- **TypeScript strict from day 1** — Supabase auto-generates types.
- **Always USD** — No automatic gateway in MVP, manual receipts.
- **Admin outside the app** — Separate `/admin` route, ultra-minimal.
- **Cursor leads** — v0 only for occasional visual variants.

---

## 🛠️ Useful commands

```bash
# Dev
npm run dev

# Build
npm run build

# Supabase types (once schema exists)
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts

# Lint
npm run lint
```

---

## 📋 Commit conventions

Format: `type(scope): message`

- `feat(feed): add date picker filter`
- `fix(auth): resolve magic link redirect`
- `style(card): adjust spacing on featured card`
- `refactor(checkout): extract payment methods to constants`
- `docs(readme): update setup instructions`

---

## 🧠 How we work

1. **Before writing code:** read the rules above.
2. **When in doubt** between two ways of doing something: the more readable one wins.
3. **When a component grows** too much: split it. Logic → `methods.ts`. Strings → `constants.ts`.
4. **When you create a new color/spacing/font:** first to `tokens.ts`, then use it. Never hardcode.
5. **When you finish a task:** lint + local build before committing.
6. **When you use a new TS feature** the owner might not know: explain it briefly inline.

---

## 🔗 References

- Full concept and roadmap: project Notion
- Visual design reference: Claude Design (3 screens: Feed, Detail, Checkout)
