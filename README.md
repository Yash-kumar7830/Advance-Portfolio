# Yash Kumar Premium Portfolio

A production-ready React 19, TypeScript, Vite, Tailwind, Supabase, Framer Motion, GSAP-ready, Lenis, and React Three Fiber portfolio for Yash Kumar.

The app is built as a frontend-only Supabase architecture:

```txt
React -> Supabase Auth -> Supabase Postgres -> Supabase Storage -> Supabase Realtime
```

There is no Express, FastAPI, Spring Boot, Node API, or custom backend server.

## Features

- Immersive animated hero with aurora lighting, typing text, social actions, and a React Three Fiber scene.
- Floating glass navbar with scroll-hide behavior and active section indicators.
- Dynamic Supabase-backed projects, skills, blogs, certificates, experience, and messages.
- Demo fallbacks when Supabase environment variables are not configured.
- Markdown blog rendering, search, categories, reading time, likes, and views.
- Project fullscreen modal with features, challenges, stack, architecture, GitHub, and live links.
- Resume preview and download via Supabase Storage or local fallback.
- Contact form with React Hook Form and Zod validation.
- Protected admin dashboard using Supabase Auth and admin email gating.
- CRUD upsert/delete helpers for portfolio content.
- Dark/light theme, custom cursor, command palette, smooth scrolling, loading state, error boundary, PWA manifest, and 404 page.

## Structure

```txt
src/
  components/     reusable UI and system components
  contexts/       auth, theme, toast providers
  hooks/          scroll, active-section, cursor lighting hooks
  layouts/        site layout shell
  lib/            Supabase client
  pages/          route-level pages
  sections/       portfolio sections
  services/       Supabase data access
  types/          shared TypeScript models
  utils/          small helpers
supabase/
  schema.sql      tables, RLS policies, storage policies
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=yash@example.com
VITE_RESUME_BUCKET=portfolio
VITE_RESUME_PATH=resume/yash-kumar-resume.pdf
```

Without these values, the portfolio still runs with curated demo data.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create the admin user in Supabase Auth.
4. Insert a matching profile row:

```sql
insert into public.profiles (id, email, full_name, role)
values ('AUTH_USER_UUID', 'yash@example.com', 'Yash Kumar', 'admin');
```

5. Upload the resume PDF to the `portfolio` bucket at `resume/yash-kumar-resume.pdf`.
6. Add project, skill, blog, certificate, and experience rows through SQL or the admin dashboard.

## Local Development

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm build
pnpm preview
```

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the environment variables from `.env.example`.
4. Use the default Vite settings:
   - Build command: `pnpm build`
   - Output directory: `dist`
5. Deploy.

## Admin Usage

Visit `/admin`, sign in with the configured Supabase admin user, and manage content with JSON upserts. Records are protected by RLS policies, so public visitors can read portfolio data and submit messages, while only admins can mutate content.
