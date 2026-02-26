import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

type AuthRequest = Request & { userId: string };
const parseJson = (v: string | null | undefined) => { try { return JSON.parse(v ?? "[]"); } catch { return []; } };
const toJson = (v: unknown) => JSON.stringify(Array.isArray(v) ? v : typeof v === "object" ? v : []);

// ─── Financial Advisory Summary ───────────────────────────────────────────────

export async function listAdvisory(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.financialAdvisory.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(r => ({
    ...r,
    financial_forecasts: parseJson(r.financial_forecasts),
    budget_recommendations: parseJson(r.budget_recommendations),
    cost_optimization_opportunities: parseJson(r.cost_optimization_opportunities),
    investment_opportunities: parseJson(r.investment_opportunities),
    financial_risk_assessment: parseJson(r.financial_risk_assessment),
    tax_optimization_strategies: parseJson(r.tax_optimization_strategies),
    working_capital_management: parseJson(r.working_capital_management),
    financial_planning_roadmap: parseJson(r.financial_planning_roadmap),
  })));
}

export async function getAdvisory(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const r = await prisma.financialAdvisory.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json({ ...r,
    financial_forecasts: parseJson(r.financial_forecasts),
    budget_recommendations: parseJson(r.budget_recommendations),
    cost_optimization_opportunities: parseJson(r.cost_optimization_opportunities),
    investment_opportunities: parseJson(r.investment_opportunities),
    financial_risk_assessment: parseJson(r.financial_risk_assessment),
    tax_optimization_strategies: parseJson(r.tax_optimization_strategies),
    working_capital_management: parseJson(r.working_capital_management),
    financial_planning_roadmap: parseJson(r.financial_planning_roadmap),
  });
}

export async function createAdvisory(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.financialAdvisory.create({ data: {
    user_id: userId,
    total_financial_health_score: Number(b.total_financial_health_score ?? 0),
    profitability_trend: String(b.profitability_trend ?? ""),
    liquidity_score: Number(b.liquidity_score ?? 0),
    debt_to_equity_ratio: Number(b.debt_to_equity_ratio ?? 0),
    cash_flow_health: String(b.cash_flow_health ?? ""),
    financial_forecasts: toJson(b.financial_forecasts) as string,
    budget_recommendations: toJson(b.budget_recommendations) as string,
    cost_optimization_opportunities: toJson(b.cost_optimization_opportunities) as string,
    investment_opportunities: toJson(b.investment_opportunities) as string,
    financial_risk_assessment: toJson(b.financial_risk_assessment) as string,
    tax_optimization_strategies: toJson(b.tax_optimization_strategies) as string,
    working_capital_management: toJson(b.working_capital_management) as string,
    financial_planning_roadmap: toJson(b.financial_planning_roadmap) as string,
  }});
  res.status(201).json(r);
}

export async function updateAdvisory(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.financialAdvisory.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  const nums = ["total_financial_health_score","liquidity_score","debt_to_equity_ratio"];
  const strs = ["profitability_trend","cash_flow_health"];
  const arrs = ["financial_forecasts","budget_recommendations","cost_optimization_opportunities",
    "investment_opportunities","financial_risk_assessment","tax_optimization_strategies",
    "working_capital_management","financial_planning_roadmap"];
  for (const f of nums) if (b[f] !== undefined) data[f] = Number(b[f]);
  for (const f of strs) if (b[f] !== undefined) data[f] = String(b[f]);
  for (const f of arrs) if (b[f] !== undefined) data[f] = toJson(b[f]);
  const r = await prisma.financialAdvisory.update({ where: { id: req.params.id }, data });
  res.json(r);
}

// ─── Budget Forecasts ─────────────────────────────────────────────────────────

export async function listBudgetForecasts(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.budgetForecastRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(r => ({ ...r, assumptions: parseJson(r.assumptions) })));
}

export async function createBudgetForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.budgetForecastRecord.create({ data: {
    user_id: userId,
    period: String(b.period ?? ""),
    type: String(b.type ?? "quarterly"),
    revenue: Number(b.revenue ?? 0),
    expenses: Number(b.expenses ?? 0),
    net_income: Number(b.net_income ?? 0),
    confidence: Number(b.confidence ?? 85),
    variance: Number(b.variance ?? 0),
    assumptions: toJson(b.assumptions) as string,
  }});
  res.status(201).json({ ...r, assumptions: parseJson(r.assumptions) });
}

export async function updateBudgetForecast(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.budgetForecastRecord.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  if (b.period !== undefined) data.period = String(b.period);
  if (b.type !== undefined) data.type = String(b.type);
  for (const f of ["revenue","expenses","net_income","confidence","variance"]) if (b[f] !== undefined) data[f] = Number(b[f]);
  if (b.assumptions !== undefined) data.assumptions = toJson(b.assumptions);
  const r = await prisma.budgetForecastRecord.update({ where: { id: req.params.id }, data });
  res.json({ ...r, assumptions: parseJson(r.assumptions) });
}

// ─── Cash Flow Projections ────────────────────────────────────────────────────

export async function listCashFlows(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  res.json(await prisma.cashFlowProjectionRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } }));
}

export async function createCashFlow(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.cashFlowProjectionRecord.create({ data: {
    user_id: userId,
    period: String(b.period ?? ""),
    inflows: Number(b.inflows ?? 0),
    outflows: Number(b.outflows ?? 0),
    net_cash: Number(b.net_cash ?? 0),
    cumulative: Number(b.cumulative ?? 0),
    category: String(b.category ?? ""),
    notes: String(b.notes ?? ""),
  }});
  res.status(201).json(r);
}

// ─── Scenario Tests ───────────────────────────────────────────────────────────

export async function listScenarioTests(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.scenarioTestRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(r => ({ ...r, assumptions: parseJson(r.assumptions), results: parseJson(r.results) })));
}

export async function createScenarioTest(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.scenarioTestRecord.create({ data: {
    user_id: userId,
    name: String(b.name ?? ""),
    description: String(b.description ?? ""),
    status: String(b.status ?? "pending"),
    impact: String(b.impact ?? "medium"),
    probability: Number(b.probability ?? 0),
    assumptions: toJson(b.assumptions) as string,
    results: toJson(b.results) as string,
  }});
  res.status(201).json({ ...r, assumptions: parseJson(r.assumptions), results: parseJson(r.results) });
}

export async function updateScenarioTest(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.scenarioTestRecord.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["name","description","status","impact"]) if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.probability !== undefined) data.probability = Number(b.probability);
  if (b.assumptions !== undefined) data.assumptions = toJson(b.assumptions);
  if (b.results !== undefined) data.results = toJson(b.results);
  const r = await prisma.scenarioTestRecord.update({ where: { id: req.params.id }, data });
  res.json({ ...r, assumptions: parseJson(r.assumptions), results: parseJson(r.results) });
}

// ─── Risk Assessments ─────────────────────────────────────────────────────────

export async function listRisks(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  res.json(await prisma.riskAssessmentRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } }));
}

export async function createRisk(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.riskAssessmentRecord.create({ data: {
    user_id: userId,
    title: String(b.title ?? ""),
    category: String(b.category ?? ""),
    severity: String(b.severity ?? "medium"),
    probability: Number(b.probability ?? 0),
    impact: String(b.impact ?? "medium"),
    status: String(b.status ?? "identified"),
    description: String(b.description ?? ""),
    mitigation: String(b.mitigation ?? ""),
  }});
  res.status(201).json(r);
}

export async function updateRisk(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.riskAssessmentRecord.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["title","category","severity","impact","status","description","mitigation"]) if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.probability !== undefined) data.probability = Number(b.probability);
  const r = await prisma.riskAssessmentRecord.update({ where: { id: req.params.id }, data });
  res.json(r);
}

// ─── Advisory Insights ────────────────────────────────────────────────────────

export async function listInsights(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.advisoryInsightRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(r => ({ ...r, action_items: parseJson(r.action_items) })));
}

export async function createInsight(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.advisoryInsightRecord.create({ data: {
    user_id: userId,
    title: String(b.title ?? ""),
    category: String(b.category ?? ""),
    priority: String(b.priority ?? "medium"),
    status: String(b.status ?? "pending"),
    description: String(b.description ?? ""),
    action_items: toJson(b.action_items) as string,
  }});
  res.status(201).json({ ...r, action_items: parseJson(r.action_items) });
}

export async function updateInsight(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.advisoryInsightRecord.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["title","category","priority","status","description"]) if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.action_items !== undefined) data.action_items = toJson(b.action_items);
  const r = await prisma.advisoryInsightRecord.update({ where: { id: req.params.id }, data });
  res.json({ ...r, action_items: parseJson(r.action_items) });
}

// ─── Performance Drivers ──────────────────────────────────────────────────────

export async function listDrivers(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  res.json(await prisma.performanceDriverRecord.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } }));
}

export async function createDriver(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.performanceDriverRecord.create({ data: {
    user_id: userId,
    name: String(b.name ?? ""),
    category: String(b.category ?? ""),
    current: Number(b.current ?? 0),
    target: Number(b.target ?? 0),
    unit: String(b.unit ?? ""),
    trend: String(b.trend ?? "stable"),
    impact: String(b.impact ?? "medium"),
    description: String(b.description ?? ""),
  }});
  res.status(201).json(r);
}

export async function updateDriver(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.performanceDriverRecord.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["name","category","unit","trend","impact","description"]) if (b[f] !== undefined) data[f] = String(b[f]);
  for (const f of ["current","target"]) if (b[f] !== undefined) data[f] = Number(b[f]);
  const r = await prisma.performanceDriverRecord.update({ where: { id: req.params.id }, data });
  res.json(r);
}
