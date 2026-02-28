import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

type AuthRequest = Request & { userId: string };

function parseJson(val: string | null | undefined): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

function toJson(val: unknown): string {
  return JSON.stringify(Array.isArray(val) ? val : []);
}

function fmt(r: Awaited<ReturnType<typeof prisma.businessForecast.findFirst>>) {
  if (!r) return null;
  return {
    id: r.id,
    user_id: r.user_id,
    annual_revenue_target: r.annual_revenue_target,
    customer_segments_count: r.customer_segments_count,
    kpis_tracked_count: r.kpis_tracked_count,
    scenarios_modeled_count: r.scenarios_modeled_count,
    total_demand_units: r.total_demand_units,
    average_order_value: r.average_order_value,
    total_revenue_target: r.total_revenue_target,
    avg_confidence: r.avg_confidence,
    potential_upside: r.potential_upside,
    total_market_opportunity: r.total_market_opportunity,
    weighted_avg_growth: r.weighted_avg_growth,
    overall_retention: r.overall_retention,
    enterprise_units: r.enterprise_units,
    enterprise_growth_rate: r.enterprise_growth_rate,
    enterprise_retention: r.enterprise_retention,
    enterprise_avg_order: r.enterprise_avg_order,
    enterprise_seasonality: r.enterprise_seasonality,
    enterprise_revenue_potential: r.enterprise_revenue_potential,
    smb_units: r.smb_units,
    smb_growth_rate: r.smb_growth_rate,
    smb_retention: r.smb_retention,
    smb_avg_order: r.smb_avg_order,
    smb_seasonality: r.smb_seasonality,
    smb_revenue_potential: r.smb_revenue_potential,
    q1_2025_projected_revenue: r.q1_projected_revenue,
    q1_2025_actual_to_date: r.q1_actual_to_date,
    q1_2025_scenario_range_min: r.q1_scenario_min,
    q1_2025_scenario_range_max: r.q1_scenario_max,
    q1_2025_confidence: r.q1_confidence,
    q2_2025_projected_revenue: r.q2_projected_revenue,
    q2_2025_actual_to_date: r.q2_actual_to_date,
    q2_2025_scenario_range_min: r.q2_scenario_min,
    q2_2025_scenario_range_max: r.q2_scenario_max,
    q2_2025_confidence: r.q2_confidence,
    q3_2025_projected_revenue: r.q3_projected_revenue,
    q3_2025_actual_to_date: r.q3_actual_to_date,
    q3_2025_scenario_range_min: r.q3_scenario_min,
    q3_2025_scenario_range_max: r.q3_scenario_max,
    q3_2025_confidence: r.q3_confidence,
    q4_2025_projected_revenue: r.q4_projected_revenue,
    q4_2025_actual_to_date: r.q4_actual_to_date,
    q4_2025_scenario_range_min: r.q4_scenario_min,
    q4_2025_scenario_range_max: r.q4_scenario_max,
    q4_2025_confidence: r.q4_confidence,
    kpis: parseJson(r.kpis),
    forecast_scenarios: parseJson(r.forecast_scenarios),
    documents: parseJson(r.documents),
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

/** GET /api/business/forecasts */
export async function listForecasts(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.businessForecast.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
  res.json(records.map(fmt));
}

/** GET /api/business/forecasts/:id */
export async function getForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const record = await prisma.businessForecast.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!record) return res.status(404).json({ message: "Not found" });
  res.json(fmt(record));
}

/** POST /api/business/forecasts */
export async function createForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;

  const record = await prisma.businessForecast.create({
    data: {
      user_id: userId,
      annual_revenue_target: Number(b.annual_revenue_target ?? 0),
      customer_segments_count: Number(b.customer_segments_count ?? 0),
      kpis_tracked_count: Number(b.kpis_tracked_count ?? 0),
      scenarios_modeled_count: Number(b.scenarios_modeled_count ?? 0),
      total_demand_units: Number(b.total_demand_units ?? 0),
      average_order_value: Number(b.average_order_value ?? 0),
      total_revenue_target: Number(b.total_revenue_target ?? 0),
      avg_confidence: Number(b.avg_confidence ?? 0),
      potential_upside: Number(b.potential_upside ?? 0),
      total_market_opportunity: Number(b.total_market_opportunity ?? 0),
      weighted_avg_growth: Number(b.weighted_avg_growth ?? 0),
      overall_retention: Number(b.overall_retention ?? 0),
      enterprise_units: Number(b.enterprise_units ?? 0),
      enterprise_growth_rate: Number(b.enterprise_growth_rate ?? 0),
      enterprise_retention: Number(b.enterprise_retention ?? 0),
      enterprise_avg_order: Number(b.enterprise_avg_order ?? 0),
      enterprise_seasonality: Number(b.enterprise_seasonality ?? 0),
      enterprise_revenue_potential: Number(b.enterprise_revenue_potential ?? 0),
      smb_units: Number(b.smb_units ?? 0),
      smb_growth_rate: Number(b.smb_growth_rate ?? 0),
      smb_retention: Number(b.smb_retention ?? 0),
      smb_avg_order: Number(b.smb_avg_order ?? 0),
      smb_seasonality: Number(b.smb_seasonality ?? 0),
      smb_revenue_potential: Number(b.smb_revenue_potential ?? 0),
      q1_projected_revenue: Number(b.q1_2025_projected_revenue ?? 0),
      q1_actual_to_date: Number(b.q1_2025_actual_to_date ?? 0),
      q1_scenario_min: Number(b.q1_2025_scenario_range_min ?? 0),
      q1_scenario_max: Number(b.q1_2025_scenario_range_max ?? 0),
      q1_confidence: String(b.q1_2025_confidence ?? "Medium"),
      q2_projected_revenue: Number(b.q2_2025_projected_revenue ?? 0),
      q2_actual_to_date: Number(b.q2_2025_actual_to_date ?? 0),
      q2_scenario_min: Number(b.q2_2025_scenario_range_min ?? 0),
      q2_scenario_max: Number(b.q2_2025_scenario_range_max ?? 0),
      q2_confidence: String(b.q2_2025_confidence ?? "Medium"),
      q3_projected_revenue: Number(b.q3_2025_projected_revenue ?? 0),
      q3_actual_to_date: Number(b.q3_2025_actual_to_date ?? 0),
      q3_scenario_min: Number(b.q3_2025_scenario_range_min ?? 0),
      q3_scenario_max: Number(b.q3_2025_scenario_range_max ?? 0),
      q3_confidence: String(b.q3_2025_confidence ?? "Medium"),
      q4_projected_revenue: Number(b.q4_2025_projected_revenue ?? 0),
      q4_actual_to_date: Number(b.q4_2025_actual_to_date ?? 0),
      q4_scenario_min: Number(b.q4_2025_scenario_range_min ?? 0),
      q4_scenario_max: Number(b.q4_2025_scenario_range_max ?? 0),
      q4_confidence: String(b.q4_2025_confidence ?? "Medium"),
      kpis: toJson(b.kpis),
      forecast_scenarios: toJson(b.forecast_scenarios),
      documents: toJson(b.documents),
    },
  });
  res.status(201).json(fmt(record));
}

/** PATCH /api/business/forecasts/:id */
export async function updateForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.businessForecast.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!existing) return res.status(404).json({ message: "Not found" });

  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };

  const numFields = [
    "annual_revenue_target", "customer_segments_count", "kpis_tracked_count",
    "scenarios_modeled_count", "total_demand_units", "average_order_value",
    "total_revenue_target", "avg_confidence", "potential_upside",
    "total_market_opportunity", "weighted_avg_growth", "overall_retention",
    "enterprise_units", "enterprise_growth_rate", "enterprise_retention",
    "enterprise_avg_order", "enterprise_seasonality", "enterprise_revenue_potential",
    "smb_units", "smb_growth_rate", "smb_retention", "smb_avg_order",
    "smb_seasonality", "smb_revenue_potential",
  ];
  for (const f of numFields) {
    if (b[f] !== undefined) data[f] = Number(b[f]);
  }

  // Quarterly fields (frontend uses q1_2025_* naming, DB uses q1_* naming)
  const qMap: Record<string, string> = {
    q1_2025_projected_revenue: "q1_projected_revenue",
    q1_2025_actual_to_date: "q1_actual_to_date",
    q1_2025_scenario_range_min: "q1_scenario_min",
    q1_2025_scenario_range_max: "q1_scenario_max",
    q1_2025_confidence: "q1_confidence",
    q2_2025_projected_revenue: "q2_projected_revenue",
    q2_2025_actual_to_date: "q2_actual_to_date",
    q2_2025_scenario_range_min: "q2_scenario_min",
    q2_2025_scenario_range_max: "q2_scenario_max",
    q2_2025_confidence: "q2_confidence",
    q3_2025_projected_revenue: "q3_projected_revenue",
    q3_2025_actual_to_date: "q3_actual_to_date",
    q3_2025_scenario_range_min: "q3_scenario_min",
    q3_2025_scenario_range_max: "q3_scenario_max",
    q3_2025_confidence: "q3_confidence",
    q4_2025_projected_revenue: "q4_projected_revenue",
    q4_2025_actual_to_date: "q4_actual_to_date",
    q4_2025_scenario_range_min: "q4_scenario_min",
    q4_2025_scenario_range_max: "q4_scenario_max",
    q4_2025_confidence: "q4_confidence",
  };
  for (const [k, v] of Object.entries(qMap)) {
    if (b[k] !== undefined) {
      data[v] = v.endsWith("_confidence") ? String(b[k]) : Number(b[k]);
    }
  }

  if (b.kpis !== undefined) data.kpis = toJson(b.kpis);
  if (b.forecast_scenarios !== undefined) data.forecast_scenarios = toJson(b.forecast_scenarios);
  if (b.documents !== undefined) data.documents = toJson(b.documents);

  const record = await prisma.businessForecast.update({
    where: { id: req.params.id },
    data,
  });
  res.json(fmt(record));
}

/** PATCH /api/business/forecasts/:id/kpi — update a single KPI value */
export async function updateKPI(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const { kpiId, newValue } = req.body as { kpiId: string; newValue: number };

  const record = await prisma.businessForecast.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!record) return res.status(404).json({ message: "Not found" });

  const kpis = parseJson(record.kpis) as Array<Record<string, unknown>>;
  const updated = kpis.map((k) =>
    k.id === kpiId ? { ...k, current: newValue } : k,
  );

  const saved = await prisma.businessForecast.update({
    where: { id: req.params.id },
    data: { kpis: toJson(updated), updated_at: new Date() },
  });
  res.json(fmt(saved));
}

/** PATCH /api/business/forecasts/:id/scenario — update a scenario */
export async function updateScenario(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const { scenarioId, updates } = req.body as {
    scenarioId: string;
    updates: Record<string, unknown>;
  };

  const record = await prisma.businessForecast.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!record) return res.status(404).json({ message: "Not found" });

  const scenarios = parseJson(record.forecast_scenarios) as Array<Record<string, unknown>>;
  const updated = scenarios.map((s) =>
    s.id === scenarioId ? { ...s, ...updates } : s,
  );

  const saved = await prisma.businessForecast.update({
    where: { id: req.params.id },
    data: { forecast_scenarios: toJson(updated), updated_at: new Date() },
  });
  res.json(fmt(saved));
}

/** DELETE /api/business/forecasts/:id */
export async function deleteForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.businessForecast.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.businessForecast.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
