import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listLeads, getLead, createLead, updateLead, deleteLead,
  listTargets, createTarget, updateTarget, deleteTarget,
  listEngagements, createEngagement, deleteEngagement,
  listKPIs, upsertKPI,
  listDeals, createDeal, updateDeal,
} from "../controllers/salesController.ts";

const router = express.Router();
router.use(authMiddleware);

// Leads
router.get("/leads", listLeads);
router.get("/leads/:id", getLead);
router.post("/leads", createLead);
router.patch("/leads/:id", updateLead);
router.delete("/leads/:id", deleteLead);

// Sales Targets
router.get("/targets", listTargets);
router.post("/targets", createTarget);
router.patch("/targets/:id", updateTarget);
router.delete("/targets/:id", deleteTarget);

// Engagements
router.get("/engagements", listEngagements);
router.post("/engagements", createEngagement);
router.delete("/engagements/:id", deleteEngagement);

// KPIs
router.get("/kpis", listKPIs);
router.post("/kpis", upsertKPI);

// Deal Analytics
router.get("/deals", listDeals);
router.post("/deals", createDeal);
router.patch("/deals/:id", updateDeal);

export default router;
