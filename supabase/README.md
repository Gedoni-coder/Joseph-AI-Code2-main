# Supabase setup

This folder contains SQL and notes for using [Supabase](https://supabase.com) with the project.

## Options to create the database

### Option 1: Use Prisma migrations (recommended)

The backend already uses Prisma. Point it at Supabase Postgres:

1. Set `DATABASE_URL` in `backend/.env` to your Supabase connection string:
   - `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`
   - Encode special characters in the password (e.g. `#` → `%23`).

2. From the `backend` directory run:
   ```bash
   npx prisma migrate deploy
   ```
   This applies existing migrations and creates/updates tables in Supabase.

### Option 2: Run SQL in Supabase Dashboard

If you prefer to create tables manually:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Paste and run the contents of `schema.sql`.

This creates `User` and `BusinessForecast` plus RLS. Prisma migrations may still be used later; ensure table/column names match your Prisma schema.

## Row Level Security (RLS)

`schema.sql` enables RLS and adds permissive policies so the backend (using the service role or direct connection) can read/write. If you later use Supabase Auth from the frontend, tighten policies so users can only access their own rows (see comments in `schema.sql`).

## Storage (avatars)

The backend uses Supabase Storage for user avatars. In the Dashboard:

1. **Storage** → create a bucket (e.g. `avatars`).
2. Set `SUPABASE_AVATAR_BUCKET_NAME=avatars` in `backend/.env`.
