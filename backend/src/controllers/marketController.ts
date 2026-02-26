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

// ─── Market Analysis ──────────────────────────────────────────────────────────

function fmtMarket(r: Awaited<ReturnType<typeof prisma.marketAnalysis.findFirst>>) {
  if (!r) return null;
  return {
    id: r.id,
    user_id: r.user_id,
    total_addressable_market: r.total_addressable_market,
    serviceable_addressable_market: r.serviceable_addressable_market,
    market_growth_rate: r.market_growth_rate,
    market_segments_count: r.market_segments_count,
    competitors_tracked: r.competitors_tracked,
    competitive_position_score: r.competitive_position_score,
    market_share_estimate: r.market_share_estimate,
    market_trends: parseJson(r.market_trends),
    competitive_threats: parseJson(r.competitive_threats),
    market_opportunities: parseJson(r.market_opportunities),
    competitor_analysis: parseJson(r.competitor_analysis),
    swot_analysis: parseJson(r.swot_analysis),
    market_dynamics: parseJson(r.market_dynamics),
    regulatory_environment: parseJson(r.regulatory_environment),
    customer_preferences: parseJson(r.customer_preferences),
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export async function listMarketAnalyses(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.marketAnalysis.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(fmtMarket));
}

export async function getMarketAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const r = await prisma.marketAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(fmtMarket(r));
}

export async function createMarketAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.marketAnalysis.create({
    data: {
      user_id: userId,
      total_addressable_market: Number(b.total_addressable_market ?? 0),
      serviceable_addressable_market: Number(b.serviceable_addressable_market ?? 0),
      market_growth_rate: Number(b.market_growth_rate ?? 0),
      market_segments_count: Number(b.market_segments_count ?? 0),
      competitors_tracked: Number(b.competitors_tracked ?? 0),
      competitive_position_score: Number(b.competitive_position_score ?? 0),
      market_share_estimate: Number(b.market_share_estimate ?? 0),
      market_trends: toJson(b.market_trends),
      competitive_threats: toJson(b.competitive_threats),
      market_opportunities: toJson(b.market_opportunities),
      competitor_analysis: toJson(b.competitor_analysis),
      swot_analysis: toJson(b.swot_analysis),
      market_dynamics: toJson(b.market_dynamics),
      regulatory_environment: toJson(b.regulatory_environment),
      customer_preferences: toJson(b.customer_preferences),
    },
  });
  res.status(201).json(fmtMarket(r));
}

export async function updateMarketAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.marketAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  const nums = ["total_addressable_market","serviceable_addressable_market","market_growth_rate",
    "market_segments_count","competitors_tracked","competitive_position_score","market_share_estimate"];
  for (const f of nums) if (b[f] !== undefined) data[f] = Number(b[f]);
  const arrs = ["market_trends","competitive_threats","market_opportunities","competitor_analysis",
    "swot_analysis","market_dynamics","regulatory_environment","customer_preferences"];
  for (const f of arrs) if (b[f] !== undefined) data[f] = toJson(b[f]);
  const r = await prisma.marketAnalysis.update({ where: { id: req.params.id }, data });
  res.json(fmtMarket(r));
}

export async function deleteMarketAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.marketAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.marketAnalysis.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

// ─── Competitive Analysis ─────────────────────────────────────────────────────

function fmtCompetitive(r: Awaited<ReturnType<typeof prisma.competitiveAnalysis.findFirst>>) {
  if (!r) return null;
  return {
    id: r.id,
    user_id: r.user_id,
    competitor_name: r.competitor_name,
    competitor_type: r.competitor_type,
    market_share: r.market_share,
    revenue: r.revenue,
    employees: r.employees,
    founded: r.founded,
    headquarters: r.headquarters,
    website: r.website,
    description: r.description,
    key_products: parseJson(r.key_products),
    target_markets: parseJson(r.target_markets),
    strengths: parseJson(r.strengths),
    weaknesses: parseJson(r.weaknesses),
    opportunities: parseJson(r.opportunities),
    threats: parseJson(r.threats),
    strategy_recommendations: parseJson(r.strategy_recommendations),
    overall_score: r.overall_score,
    funding_stage: r.funding_stage,
    last_funding_year: r.last_funding_year,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export async function listCompetitiveAnalyses(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.competitiveAnalysis.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(fmtCompetitive));
}

export async function getCompetitiveAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const r = await prisma.competitiveAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(fmtCompetitive(r));
}

export async function createCompetitiveAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.competitiveAnalysis.create({
    data: {
      user_id: userId,
      competitor_name: String(b.competitor_name ?? "Unknown"),
      competitor_type: String(b.competitor_type ?? "direct"),
      market_share: Number(b.market_share ?? 0),
      revenue: Number(b.revenue ?? 0),
      employees: Number(b.employees ?? 0),
      founded: Number(b.founded ?? 2020),
      headquarters: String(b.headquarters ?? ""),
      website: String(b.website ?? ""),
      description: String(b.description ?? ""),
      key_products: toJson(b.key_products),
      target_markets: toJson(b.target_markets),
      strengths: toJson(b.strengths),
      weaknesses: toJson(b.weaknesses),
      opportunities: toJson(b.opportunities),
      threats: toJson(b.threats),
      strategy_recommendations: toJson(b.strategy_recommendations),
      overall_score: Number(b.overall_score ?? 0),
      funding_stage: String(b.funding_stage ?? ""),
      last_funding_year: Number(b.last_funding_year ?? 2024),
    },
  });
  res.status(201).json(fmtCompetitive(r));
}

export async function updateCompetitiveAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.competitiveAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  const strs = ["competitor_name","competitor_type","headquarters","website","description","funding_stage"];
  for (const f of strs) if (b[f] !== undefined) data[f] = String(b[f]);
  const nums = ["market_share","revenue","employees","founded","overall_score","last_funding_year"];
  for (const f of nums) if (b[f] !== undefined) data[f] = Number(b[f]);
  const arrs = ["key_products","target_markets","strengths","weaknesses","opportunities","threats","strategy_recommendations"];
  for (const f of arrs) if (b[f] !== undefined) data[f] = toJson(b[f]);
  const r = await prisma.competitiveAnalysis.update({ where: { id: req.params.id }, data });
  res.json(fmtCompetitive(r));
}

export async function deleteCompetitiveAnalysis(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.competitiveAnalysis.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.competitiveAnalysis.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
