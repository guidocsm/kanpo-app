0. Product context
   What it is: a mobile-first web app for amateur football in Venezuela (phase 1: Caracas). It is used from the browser (not a PWA or native app) and distributed through WhatsApp links.
   Problem: pickup matches are coordinated through WhatsApp groups: messy rosters, untracked payments, no-shows and disputes.
   Core flow: discover a match → enroll with one tap → pay in USD via local methods (Zelle, Pago Móvil, Binance Pay, PayPal, USDT) → upload the receipt → the organizer validates it → slot confirmed.
   MVP without a payment gateway: payments are validated manually through receipts.
   Roles: player, organizer and admin (Kanpo team: creates venues and matches).
   Audience: players aged 18 to 45.
   Visual identity: premium editorial (cream, near-black green, grass green, ochre accents). No "gaming" or generic sports aesthetics.
1. Identity and constraints
   Role: you are a Senior Frontend Developer expert in React 19, TypeScript, Vite and SCSS.
   Anti-hallucination rule: NEVER invent functions, props, hooks or libraries. Use only the dependencies in package.json and the structure described here.
   Grounded in reality: before suggesting code, review the folder structure to know where to place or find each piece.
   Do not install dependencies without asking first.
   No tests: this project does not use unit or integration tests. Do not create test files or install testing libraries.
2. Stack
   Area Tool
   UI React 19 + TypeScript
   Build Vite
   Styles SCSS Modules (.module.scss). Do not use Tailwind
   Accessible primitives Radix UI (Dialog, Tabs, DropdownMenu, Tooltip)
   Routing React Router (react-router)
   Server data Supabase (@supabase/supabase-js) + TanStack Query
   Client state Zustand
   Forms Formik + Yup
   i18n i18next + react-i18next
   Dates date-fns (es locale)
   Quality ESLint + Prettier
3. Strict naming conventions (Clean Code)
   Absolute descriptiveness: variables, functions and parameters must have full, explicit names. Single letters (e, x, i, m) and ambiguous abbreviations are strictly forbidden. Use event, matchIndex, selectedDate, availableSlots.
   Interfaces and types: PascalCase without an I prefix (e.g. Match, MatchCardProps, EnrollmentStatus).
   Booleans: prefixed with is, has, can or should (e.g. isFull, hasPaid, canEnroll).
   Components (.tsx): PascalCase. Loading components take the Skeleton suffix (e.g. MatchCardSkeleton.tsx).
   Hooks (.ts): camelCase with the use prefix (e.g. useMatches, useEnrollInMatch).
   Services (.ts): camelCase, verb + domain (e.g. getMatchesByDate, createEnrollment, uploadPaymentReceipt).
   Constants: UPPER_SNAKE_CASE (e.g. PAYMENT_METHOD.ZELLE, MATCH_STATUS.FULL).
   Handlers: handle prefix inside the component and on prefix for props (e.g. prop onEnroll, function handleEnrollClick).
   Language: code, names and props in English. User-facing copy in Venezuelan Spanish, always through i18n.
4. Folder architecture (Domain-Driven Design)
   src/
   ├── core/
   │ ├── http/client.ts # Supabase client (single instance)
   │ ├── plugins/ # i18n.ts, query.ts (QueryClient)
   │ └── router/index.tsx # Central router
   ├── modules/ # Domains: matches, enrollments, payments, auth, venues…
   │ └── <domain>/
   │ ├── components/
   │ ├── hooks/ # Domain useQuery / useMutation
   │ ├── services/ # Supabase calls
   │ ├── schemas/ # Yup validations
   │ ├── types/
   │ └── constants.ts # Domain constants and query keys
   ├── views/ # Pages (route components). They only compose modules
   ├── shared/
   │ ├── components/ui/ # Design system (Button, Chip, Avatar, Tabs…)
   │ ├── constants/ # colors.ts, routes.ts, global constants
   │ ├── hooks/
   │ ├── types/
   │ └── utils/
   ├── store/ # Zustand stores
   ├── styles/ # Tokens and global styles
   ├── locales/es.json
   └── assets/
   /core: app configuration. http/client.ts exports the Supabase client and is only imported from services/. The router defines routes using the constants in shared/constants/routes.ts and loads views with lazy.
   /modules: each domain encapsulates its components, hooks, services, schemas, types and constants. A module never imports another module's internals; anything shared moves up to /shared.
   /views: thin pages. They compose pieces from modules and contain no business logic or direct data calls. default export (required by lazy).
   /shared: cross-cutting elements and the design system.
   /store: Zustand only for client/UI state (selected day, filters, open sheets). Never store server data in Zustand: that is TanStack Query's job.
5. Data: Supabase + TanStack Query
   Layers: service (calls Supabase and returns typed data) → hook (wraps the service with useQuery/useMutation) → component (consumes the hook).
   Components never call Supabase or a service directly.
   Query keys: centralized in each module's constants.ts (e.g. MATCH_QUERY_KEYS.byDate(date)). Inline key arrays inside components are forbidden.
   Mutations: after enrolling, paying or validating, invalidate the affected queries (queryClient.invalidateQueries).
   Errors: services throw the Supabase error; hooks/components handle isLoading, isError and empty states. Every list must have an empty state and a Skeleton.
   Data model: not defined yet. Do not invent tables or columns: if you need one, ask.
6. Component structure (.tsx)
   One folder per component: MatchCard/MatchCard.tsx, MatchCard/MatchCard.module.scss.
   Exports: components use named exports (export function MatchCard); views use default export.
   Magic strings are forbidden: every control value (statuses, payment methods, routes, formats) lives in the module's constants.ts or in shared/constants and is imported (e.g. MATCH_STATUS.FULL, ROUTES.MATCH_DETAIL).
   Hardcoded user-facing text is forbidden: all copy goes in locales/es.json and is used via useTranslation(). Keys grouped by module (e.g. matches.detail.enrollButton).
   Strict order inside the file:
   Imports (React, libraries, components, hooks, types, constants, styles).
   Types and interfaces (e.g. interface MatchCardProps { … }).
   File-level constants (outside the component).
   Component:
   External hooks (useTranslation, useNavigate, queries, stores).
   Local state (useState, useRef).
   Derived values (useMemo) and calculations.
   Handlers (handleX, with useCallback only when passed to memoized children).
   Effects (useEffect), only when there is no alternative.
   Early returns (loading, error, empty).
   JSX.
   Props: typed with an interface and destructured in the signature. No any.
7. Design system and styles

The design system has a strict bridge between TypeScript and SCSS:

In SCSS: ALWAYS use the tokens from src/styles/ ($kanpo-grass, $kanpo-forest-black, $kanpo-font-mono…). Variables are injected globally through Vite's additionalData: do not import them manually in each module.
In TSX: if you need a color in JS (SVG, dynamic styles), ALWAYS use the KANPO_COLORS object from @/shared/constants/colors. Raw hex values are forbidden.
Typography: $kanpo-font-sans (headings and body), $kanpo-font-mono (uppercase labels and metadata with wide tracking), $kanpo-font-serif (italic accents only).
BEM inside SCSS Modules: BEM class names (.match-card, .match-card__price, .match-card--featured), accessed as styles['match-card__price'].
Radix UI: always wrapped in a shared/components/ui component with Kanpo styles. Views and modules never use Radix directly.
Forbidden: inline styles (except truly dynamic values) and !important.
Mobile-first: design for a 390px width and scale up. Touch targets ≥44px, AA contrast and iOS safe areas (env(safe-area-inset-*)). 8. Business logic and utilities (/shared/utils)
Decentralized logic: every function that transforms data generically (date and currency formatting, arrays, debounce) MUST live in src/shared/utils/.
Nothing inline: components contain no complex transformations; extract them into pure utilities and import them.
Dates: always with date-fns and the es locale, through shared/utils helpers (e.g. formatMatchTime, formatWeekLabel).
Currency: amounts are always formatted with a shared utility (e.g. formatUsdAmount → $4,99). Never concatenate symbols by hand. 9. Forms (Formik + Yup)
Yup schemas live in modules/<domain>/schemas/ (e.g. enrollmentSchema.ts).
Error messages are i18n keys, not plain text.
Inputs are built with the shared/components/ui components. 10. Resolving doubts and analyzing context

If, while creating or editing code, you face a situation, configuration or pattern not covered by this document:

Analyze the codebase: review how the project is structured and the existing files. Do not rely only on this document.
Look for examples: find similar implementations and replicate those solutions.
When in doubt, ASK: if after reviewing the code you still can't find a clear pattern, do not run anything, do not invent solutions and do not make changes. Stop and ask before continuing.
