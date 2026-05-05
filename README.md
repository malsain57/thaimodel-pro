# ThaiModel PRO V8 Functional

Next.js + Supabase version of the ThaiModel V8 demo.

## Setup

1. Upload the content of this folder to GitHub.
2. In Supabase, run `supabase/schema.sql` in SQL Editor.
3. In Vercel, add:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. Deploy on Vercel.

## Pages

- `/` homepage V8 style
- `/city/all` city/search page with advanced filters
- `/profile/bella` profile page
- `/auth/register` model/client registration
- `/auth/login` login
- `/dashboard/model` create/edit model profile + upload photo
- `/dashboard/client` client dashboard
- `/dashboard/admin` approve/reject profiles MVP
- `/pricing`, `/terms`, `/privacy`, `/contact`

## Important

This MVP sells profile visibility only. Public profiles require `is_approved = true` and `active_plan = true`.
