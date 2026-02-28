import type { Request, Response } from "express";
import { prisma } from "../config/db.ts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseJsonField(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function serializeJsonField(value: unknown): string {
  return JSON.stringify(Array.isArray(value) ? value : []);
}

function formatRecord(record: {
  id: string;
  user_id: string;
  gdp_growth_rate: number;
  inflation_rate: number;
  unemployment_rate: number;
  interest_rates: number;
  exchange_rates: number;
  consumer_confidence: number;
  stock_market_index: number;
  commodity_prices: number;
  housing_index: number;
  trade_balance: number;
  economic_news: string;
  forecasts: string;
  trends: string;
  impact_analysis: string;
  alerts: string;
  created_at: Date;
  updated_at: Date;
}) {
  return {
    id: record.id,
    user_id: record.user_id,
    gdp_growth_rate: record.gdp_growth_rate,
    inflation_rate: record.inflation_rate,
    unemployment_rate: record.unemployment_rate,
    interest_rates: record.interest_rates,
    exchange_rates: record.exchange_rates,
    consumer_confidence: record.consumer_confidence,
    stock_market_index: record.stock_market_index,
    commodity_prices: record.commodity_prices,
    housing_index: record.housing_index,
    trade_balance: record.trade_balance,
    economic_news: parseJsonField(record.economic_news),
    forecasts: parseJsonField(record.forecasts),
    trends: parseJsonField(record.trends),
    impact_analysis: parseJsonField(record.impact_analysis),
    alerts: parseJsonField(record.alerts),
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

// ─── Controllers ──────────────────────────────────────────────────────────────

/** GET /api/economic/indicators */
export async function listIndicators(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;
  const records = await prisma.economicIndicator.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
  res.json(records.map(formatRecord));
}

/** GET /api/economic/indicators/:id */
export async function getIndicator(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;
  const record = await prisma.economicIndicator.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!record) return res.status(404).json({ message: "Not found" });
  res.json(formatRecord(record));
}

/** POST /api/economic/indicators */
export async function createIndicator(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;
  const body = req.body as Record<string, unknown>;

  const record = await prisma.economicIndicator.create({
    data: {
      user_id: userId,
      gdp_growth_rate: Number(body.gdp_growth_rate ?? 0),
      inflation_rate: Number(body.inflation_rate ?? 0),
      unemployment_rate: Number(body.unemployment_rate ?? 0),
      interest_rates: Number(body.interest_rates ?? 0),
      exchange_rates: Number(body.exchange_rates ?? 0),
      consumer_confidence: Number(body.consumer_confidence ?? 0),
      stock_market_index: Number(body.stock_market_index ?? 0),
      commodity_prices: Number(body.commodity_prices ?? 0),
      housing_index: Number(body.housing_index ?? 0),
      trade_balance: Number(body.trade_balance ?? 0),
      economic_news: serializeJsonField(body.economic_news),
      forecasts: serializeJsonField(body.forecasts),
      trends: serializeJsonField(body.trends),
      impact_analysis: serializeJsonField(body.impact_analysis),
      alerts: serializeJsonField(body.alerts),
    },
  });
  res.status(201).json(formatRecord(record));
}

/** PATCH /api/economic/indicators/:id */
export async function updateIndicator(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;
  const existing = await prisma.economicIndicator.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!existing) return res.status(404).json({ message: "Not found" });

  const body = req.body as Record<string, unknown>;

  const record = await prisma.economicIndicator.update({
    where: { id: req.params.id },
    data: {
      ...(body.gdp_growth_rate !== undefined && { gdp_growth_rate: Number(body.gdp_growth_rate) }),
      ...(body.inflation_rate !== undefined && { inflation_rate: Number(body.inflation_rate) }),
      ...(body.unemployment_rate !== undefined && { unemployment_rate: Number(body.unemployment_rate) }),
      ...(body.interest_rates !== undefined && { interest_rates: Number(body.interest_rates) }),
      ...(body.exchange_rates !== undefined && { exchange_rates: Number(body.exchange_rates) }),
      ...(body.consumer_confidence !== undefined && { consumer_confidence: Number(body.consumer_confidence) }),
      ...(body.stock_market_index !== undefined && { stock_market_index: Number(body.stock_market_index) }),
      ...(body.commodity_prices !== undefined && { commodity_prices: Number(body.commodity_prices) }),
      ...(body.housing_index !== undefined && { housing_index: Number(body.housing_index) }),
      ...(body.trade_balance !== undefined && { trade_balance: Number(body.trade_balance) }),
      ...(body.economic_news !== undefined && { economic_news: serializeJsonField(body.economic_news) }),
      ...(body.forecasts !== undefined && { forecasts: serializeJsonField(body.forecasts) }),
      ...(body.trends !== undefined && { trends: serializeJsonField(body.trends) }),
      ...(body.impact_analysis !== undefined && { impact_analysis: serializeJsonField(body.impact_analysis) }),
      ...(body.alerts !== undefined && { alerts: serializeJsonField(body.alerts) }),
      updated_at: new Date(),
    },
  });
  res.json(formatRecord(record));
}

/** DELETE /api/economic/indicators/:id */
export async function deleteIndicator(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;
  const existing = await prisma.economicIndicator.findFirst({
    where: { id: req.params.id, user_id: userId },
  });
  if (!existing) return res.status(404).json({ message: "Not found" });
  await prisma.economicIndicator.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
