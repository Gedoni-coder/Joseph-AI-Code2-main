import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

type AuthRequest = Request & { userId: string };
const pj = (v: string | null | undefined) => { try { return JSON.parse(v ?? "[]"); } catch { return []; } };
const tj = (v: unknown) => JSON.stringify(Array.isArray(v) ? v : []);

// ─── Revenue Strategy Summary ─────────────────────────────────────────────────

function fmtStrategy(r: Awaited<ReturnType<typeof prisma.revenueStrategy.findFirst>>) {
  if (!r) return null;
  return {
    id: r.id, user_id: r.user_id,
    monthly_recurring_revenue: r.monthly_recurring_revenue,
    annual_contract_value: r.annual_contract_value,
    customer_lifetime_value: r.customer_lifetime_value,
    revenue_per_customer: r.revenue_per_customer,
    gross_revenue_retention: r.gross_revenue_retention,
    net_revenue_retention: r.net_revenue_retention,
    top_revenue_streams: pj(r.top_revenue_streams),
    churn_risk_summary: pj(r.churn_risk_summary),
    top_upsell_opportunities: pj(r.top_upsell_opportunities),
    channel_performance: pj(r.channel_performance),
    revenue_strategy_summary: r.revenue_strategy_summary,
    key_metrics_insights: pj(r.key_metrics_insights),
    revenue_strategy_recommendations: pj(r.revenue_strategy_recommendations),
    action_items: pj(r.action_items),
    next_steps: pj(r.next_steps),
    revenue_streams_details: pj(r.revenue_streams_details),
    revenue_forecasting: pj(r.revenue_forecasting),
    churn_analysis: pj(r.churn_analysis),
    upsell_opportunities: pj(r.upsell_opportunities),
    created_at: r.created_at, updated_at: r.updated_at,
  };
}

export async function listStrategies(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.revenueStrategy.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(fmtStrategy));
}

export async function getStrategy(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const r = await prisma.revenueStrategy.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(fmtStrategy(r));
}

export async function createStrategy(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.revenueStrategy.create({ data: {
    user_id: userId,
    monthly_recurring_revenue: Number(b.monthly_recurring_revenue ?? 0),
    annual_contract_value: Number(b.annual_contract_value ?? 0),
    customer_lifetime_value: Number(b.customer_lifetime_value ?? 0),
    revenue_per_customer: Number(b.revenue_per_customer ?? 0),
    gross_revenue_retention: Number(b.gross_revenue_retention ?? 0),
    net_revenue_retention: Number(b.net_revenue_retention ?? 0),
    top_revenue_streams: tj(b.top_revenue_streams),
    churn_risk_summary: tj(b.churn_risk_summary),
    top_upsell_opportunities: tj(b.top_upsell_opportunities),
    channel_performance: tj(b.channel_performance),
    revenue_strategy_summary: String(b.revenue_strategy_summary ?? ""),
    key_metrics_insights: tj(b.key_metrics_insights),
    revenue_strategy_recommendations: tj(b.revenue_strategy_recommendations),
    action_items: tj(b.action_items),
    next_steps: tj(b.next_steps),
    revenue_streams_details: tj(b.revenue_streams_details),
    revenue_forecasting: tj(b.revenue_forecasting),
    churn_analysis: tj(b.churn_analysis),
    upsell_opportunities: tj(b.upsell_opportunities),
  }});
  res.status(201).json(fmtStrategy(r));
}

export async function updateStrategy(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.revenueStrategy.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  const nums = ["monthly_recurring_revenue","annual_contract_value","customer_lifetime_value",
    "revenue_per_customer","gross_revenue_retention","net_revenue_retention"];
  for (const f of nums) if (b[f] !== undefined) data[f] = Number(b[f]);
  if (b.revenue_strategy_summary !== undefined) data.revenue_strategy_summary = String(b.revenue_strategy_summary);
  const arrs = ["top_revenue_streams","churn_risk_summary","top_upsell_opportunities","channel_performance",
    "key_metrics_insights","revenue_strategy_recommendations","action_items","next_steps",
    "revenue_streams_details","revenue_forecasting","churn_analysis","upsell_opportunities"];
  for (const f of arrs) if (b[f] !== undefined) data[f] = tj(b[f]);
  const r = await prisma.revenueStrategy.update({ where: { id: req.params.id }, data });
  res.json(fmtStrategy(r));
}

// ─── Revenue Streams ──────────────────────────────────────────────────────────

function fmtStream(r: Awaited<ReturnType<typeof prisma.revenueStream.findFirst>>) {
  if (!r) return null;
  return { ...r, tags: pj(r.tags) };
}

export async function listStreams(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.revenueStream.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(fmtStream));
}

export async function addStream(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.revenueStream.create({ data: {
    user_id: userId,
    name: String(b.name ?? "New Stream"),
    type: String(b.type ?? "subscription"),
    current_revenue: Number(b.current_revenue ?? b.currentRevenue ?? 0),
    projected_growth: Number(b.projected_growth ?? b.projectedGrowth ?? 0),
    margin: Number(b.margin ?? 0),
    status: String(b.status ?? "active"),
    description: String(b.description ?? ""),
    tags: tj(b.tags),
  }});
  res.status(201).json(fmtStream(r));
}

export async function updateStream(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.revenueStream.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["name","type","status","description"]) if (b[f] !== undefined) data[f] = String(b[f]);
  const numMap: Record<string, string> = { current_revenue: "current_revenue", currentRevenue: "current_revenue",
    projected_growth: "projected_growth", projectedGrowth: "projected_growth", margin: "margin" };
  for (const [k, v] of Object.entries(numMap)) if (b[k] !== undefined) data[v] = Number(b[k]);
  if (b.tags !== undefined) data.tags = tj(b.tags);
  const r = await prisma.revenueStream.update({ where: { id: req.params.id }, data });
  res.json(fmtStream(r));
}

export async function deleteStream(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.revenueStream.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.revenueStream.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
