import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

type AuthRequest = Request & { userId: string };

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function listLeads(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const stage = req.query.stage as string | undefined;
  const records = await prisma.lead.findMany({
    where: { user_id: userId, ...(stage ? { stage } : {}) },
    orderBy: { created_at: "desc" },
  });
  res.json(records.map(r => ({
    ...r,
    leadScore: r.lead_score,
    expectedClose: r.expected_close,
    leadSource: r.lead_source,
    dealSize: r.deal_size,
    salesRep: r.sales_rep,
  })));
}

export async function getLead(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const r = await prisma.lead.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!r) return res.status(404).json({ message: "Not found" });
  res.json(r);
}

export async function createLead(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.lead.create({ data: {
    user_id: userId,
    company: String(b.company ?? ""),
    description: String(b.description ?? ""),
    opening: String(b.opening ?? ""),
    expected_close: String(b.expectedClose ?? b.expected_close ?? ""),
    stage: String(b.stage ?? "cold"),
    lead_score: Number(b.leadScore ?? b.lead_score ?? 0),
    probability: Number(b.probability ?? 0),
    stall: String(b.stall ?? ""),
    playbook: String(b.playbook ?? ""),
    lead_source: String(b.leadSource ?? b.lead_source ?? ""),
    product: String(b.product ?? ""),
    region: String(b.region ?? ""),
    industry: String(b.industry ?? ""),
    segment: String(b.segment ?? ""),
    deal_size: Number(b.dealSize ?? b.deal_size ?? 0),
    sales_rep: String(b.salesRep ?? b.sales_rep ?? ""),
  }});
  res.status(201).json(r);
}

export async function updateLead(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.lead.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  const strFields = ["company","description","opening","expected_close","stage","stall",
    "playbook","lead_source","product","region","industry","segment","sales_rep"];
  for (const f of strFields) {
    const alias = f.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    if (b[f] !== undefined) data[f] = String(b[f]);
    else if (b[alias] !== undefined) data[f] = String(b[alias]);
  }
  if (b.lead_score !== undefined || b.leadScore !== undefined) data.lead_score = Number(b.lead_score ?? b.leadScore);
  if (b.probability !== undefined) data.probability = Number(b.probability);
  if (b.deal_size !== undefined || b.dealSize !== undefined) data.deal_size = Number(b.deal_size ?? b.dealSize);
  const r = await prisma.lead.update({ where: { id: req.params.id }, data });
  res.json(r);
}

export async function deleteLead(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.lead.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.lead.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

// ─── Sales Targets ────────────────────────────────────────────────────────────

export async function listTargets(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.salesTarget.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records.map(r => ({
    ...r,
    salesRepId: r.sales_rep_id,
    salesRepName: r.sales_rep_name,
    targetPeriod: r.target_period,
    targetAmount: r.target_amount,
    achievedAmount: r.achieved_amount,
    dealsClosed: r.deals_closed,
    avgDealSize: r.avg_deal_size,
  })));
}

export async function createTarget(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.salesTarget.create({ data: {
    user_id: userId,
    sales_rep_id: String(b.salesRepId ?? b.sales_rep_id ?? ""),
    sales_rep_name: String(b.salesRepName ?? b.sales_rep_name ?? ""),
    target_period: String(b.targetPeriod ?? b.target_period ?? ""),
    target_amount: Number(b.targetAmount ?? b.target_amount ?? 0),
    achieved_amount: Number(b.achievedAmount ?? b.achieved_amount ?? 0),
    status: String(b.status ?? "in-progress"),
    deals_closed: Number(b.dealsClosed ?? b.deals_closed ?? 0),
    avg_deal_size: Number(b.avgDealSize ?? b.avg_deal_size ?? 0),
  }});
  res.status(201).json(r);
}

export async function updateTarget(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.salesTarget.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  if (b.status !== undefined) data.status = String(b.status);
  if (b.achievedAmount !== undefined || b.achieved_amount !== undefined)
    data.achieved_amount = Number(b.achievedAmount ?? b.achieved_amount);
  if (b.dealsClosed !== undefined || b.deals_closed !== undefined)
    data.deals_closed = Number(b.dealsClosed ?? b.deals_closed);
  const r = await prisma.salesTarget.update({ where: { id: req.params.id }, data });
  res.json(r);
}

export async function deleteTarget(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.salesTarget.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.salesTarget.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

// ─── Engagements ──────────────────────────────────────────────────────────────

export async function listEngagements(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const records = await prisma.engagement.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });
  res.json(records);
}

export async function createEngagement(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.engagement.create({ data: {
    user_id: userId,
    lead_company: String(b.leadCompany ?? b.lead_company ?? ""),
    channel: String(b.channel ?? "email"),
    message: String(b.message ?? ""),
    subject: String(b.subject ?? ""),
    status: String(b.status ?? "sent"),
    scheduled_at: String(b.scheduledAt ?? b.scheduled_at ?? ""),
    sent_at: String(b.sentAt ?? b.sent_at ?? ""),
    response: String(b.response ?? ""),
    rep_name: String(b.repName ?? b.rep_name ?? ""),
  }});
  res.status(201).json(r);
}

export async function deleteEngagement(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.engagement.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.engagement.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

// ─── Sales KPIs ───────────────────────────────────────────────────────────────

export async function listKPIs(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  res.json(await prisma.salesKPI.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } }));
}

export async function upsertKPI(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const name = String(b.name ?? "");
  const existing = await prisma.salesKPI.findFirst({ where: { user_id: userId, name } });
  if (existing) {
    const r = await prisma.salesKPI.update({ where: { id: existing.id }, data: {
      value: String(b.value ?? existing.value),
      change: String(b.change ?? existing.change),
      trend: String(b.trend ?? existing.trend),
      updated_at: new Date(),
    }});
    return res.json(r);
  }
  const r = await prisma.salesKPI.create({ data: {
    user_id: userId, name,
    value: String(b.value ?? ""),
    change: String(b.change ?? ""),
    trend: String(b.trend ?? "stable"),
    category: String(b.category ?? ""),
    description: String(b.description ?? ""),
  }});
  res.status(201).json(r);
}

// ─── Deal Analytics ───────────────────────────────────────────────────────────

export async function listDeals(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  res.json(await prisma.dealAnalytic.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } }));
}

export async function createDeal(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const b = req.body as Record<string, unknown>;
  const r = await prisma.dealAnalytic.create({ data: {
    user_id: userId,
    deal_name: String(b.dealName ?? b.deal_name ?? ""),
    value: Number(b.value ?? 0),
    stage: String(b.stage ?? ""),
    probability: Number(b.probability ?? 0),
    rep_name: String(b.repName ?? b.rep_name ?? ""),
    close_date: String(b.closeDate ?? b.close_date ?? ""),
    industry: String(b.industry ?? ""),
    region: String(b.region ?? ""),
    notes: String(b.notes ?? ""),
  }});
  res.status(201).json(r);
}

export async function updateDeal(req: Request, res: Response) {
  const { userId } = req as AuthRequest;
  const existing = await prisma.dealAnalytic.findFirst({ where: { id: req.params.id, user_id: userId } });
  if (!existing) return res.status(404).json({ message: "Not found" });
  const b = req.body as Record<string, unknown>;
  const data: Record<string, unknown> = { updated_at: new Date() };
  for (const f of ["stage","rep_name","close_date","industry","region","notes"])
    if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.probability !== undefined) data.probability = Number(b.probability);
  if (b.value !== undefined) data.value = Number(b.value);
  const r = await prisma.dealAnalytic.update({ where: { id: req.params.id }, data });
  res.json(r);
}
