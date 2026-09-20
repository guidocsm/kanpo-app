# Kanpo

Mobile-first web app for amateur football in Venezuela. Players discover pickup matches, enroll with one tap and pay in USD via local methods (Zelle, Pago Móvil, Binance Pay, PayPal, USDT).

## Stack

React 19 · TypeScript · Vite · SCSS Modules · Radix UI · React Router · Supabase · TanStack Query · Zustand · Formik + Yup · i18next · date-fns

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev
```

## Environment variables

| Variable                 | Description              |
| ------------------------ | ------------------------ |
| `VITE_SUPABASE_URL`      | Supabase project URL     |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key |

## Scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server                    |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |
| `npm run format`  | Format with Prettier                |

## Project structure and conventions

See [AGENTS.md](./AGENTS.md).
