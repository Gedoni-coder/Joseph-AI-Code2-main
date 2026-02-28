-- Supabase schema aligned with backend Prisma (User + BusinessForecast)
-- Run this in Supabase Dashboard → SQL Editor if you want tables created by SQL.
-- Alternatively, point Prisma at Supabase (DATABASE_URL) and run: npx prisma migrate deploy

-- Enum for user role (matches Prisma UserRole)
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'ADMIN');

-- User table (matches Prisma User)
CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
  "google_id" TEXT UNIQUE,
  "phone" TEXT,
  "avatar_url" TEXT,
  "bio" TEXT,
  "campus" TEXT,
  "password_hash" TEXT,
  "email_verified" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- BusinessForecast table (matches Prisma BusinessForecast)
CREATE TABLE IF NOT EXISTS "BusinessForecast" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "annual_revenue_target" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "customer_segments_count" INTEGER NOT NULL DEFAULT 0,
  "kpis_tracked_count" INTEGER NOT NULL DEFAULT 0,
  "scenarios_modeled_count" INTEGER NOT NULL DEFAULT 0,
  "total_demand_units" INTEGER NOT NULL DEFAULT 0,
  "average_order_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "total_revenue_target" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "avg_confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "potential_upside" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "total_market_opportunity" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "weighted_avg_growth" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "overall_retention" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "enterprise_units" INTEGER NOT NULL DEFAULT 0,
  "enterprise_growth_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "enterprise_retention" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "enterprise_avg_order" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "enterprise_seasonality" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "enterprise_revenue_potential" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "smb_units" INTEGER NOT NULL DEFAULT 0,
  "smb_growth_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "smb_retention" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "smb_avg_order" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "smb_seasonality" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "smb_revenue_potential" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q1_projected_revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q1_actual_to_date" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q1_scenario_min" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q1_scenario_max" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q1_confidence" TEXT NOT NULL DEFAULT 'Medium',
  "q2_projected_revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q2_actual_to_date" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q2_scenario_min" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q2_scenario_max" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q2_confidence" TEXT NOT NULL DEFAULT 'Medium',
  "q3_projected_revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q3_actual_to_date" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q3_scenario_min" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q3_scenario_max" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q3_confidence" TEXT NOT NULL DEFAULT 'Medium',
  "q4_projected_revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q4_actual_to_date" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q4_scenario_min" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q4_scenario_max" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "q4_confidence" TEXT NOT NULL DEFAULT 'Medium',
  "kpis" TEXT NOT NULL DEFAULT '[]',
  "forecast_scenarios" TEXT NOT NULL DEFAULT '[]',
  "documents" TEXT NOT NULL DEFAULT '[]',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "BusinessForecast_user_id_idx" ON "BusinessForecast"("user_id");

-- Row Level Security (RLS)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BusinessForecast" ENABLE ROW LEVEL SECURITY;

-- Access is via backend (Prisma using postgres connection string), which bypasses RLS.
-- No permissive policies for anon key = frontend cannot read/write these tables with anon key (secure).
-- If you later use Supabase Auth and want frontend to read own data, add e.g.:
--   CREATE POLICY "Users read own" ON "User" FOR SELECT USING (auth.uid()::text = id);
--   CREATE POLICY "User forecasts read own" ON "BusinessForecast" FOR SELECT USING (auth.uid()::text = user_id);
