-- AlterTable: add campus to User (backend userController expects this)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "campus" TEXT;

-- CreateTable BusinessForecast (backend businessForecastController uses it)
CREATE TABLE "BusinessForecast" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "financialAdvisoryId" TEXT,
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessForecast_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BusinessForecast_user_id_idx" ON "BusinessForecast"("user_id");

ALTER TABLE "BusinessForecast" ADD CONSTRAINT "BusinessForecast_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
