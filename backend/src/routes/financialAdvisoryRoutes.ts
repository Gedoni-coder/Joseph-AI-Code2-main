import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listAdvisory, getAdvisory, createAdvisory, updateAdvisory,
  listBudgetForecasts, createBudgetForecast, updateBudgetForecast,
  listCashFlows, createCashFlow,
  listScenarioTests, createScenarioTest, updateScenarioTest,
  listRisks, createRisk, updateRisk,
  listInsights, createInsight, updateInsight,
  listDrivers, createDriver, updateDriver,
} from "../controllers/financialAdvisoryController.ts";

const router = express.Router();
router.use(authMiddleware);

// Financial Advisory Summary
router.get("/", listAdvisory);
router.get("/:id", getAdvisory);
router.post("/", createAdvisory);
router.patch("/:id", updateAdvisory);

// Budget Forecasts
router.get("/budgets", listBudgetForecasts);
router.post("/budgets", createBudgetForecast);
router.patch("/budgets/:id", updateBudgetForecast);

// Cash Flow Projections
router.get("/cashflows", listCashFlows);
router.post("/cashflows", createCashFlow);

// Scenario Tests
router.get("/scenarios", listScenarioTests);
router.post("/scenarios", createScenarioTest);
router.patch("/scenarios/:id", updateScenarioTest);

// Risk Assessments
router.get("/risks", listRisks);
router.post("/risks", createRisk);
router.patch("/risks/:id", updateRisk);

// Advisory Insights
router.get("/insights", listInsights);
router.post("/insights", createInsight);
router.patch("/insights/:id", updateInsight);

// Performance Drivers
router.get("/drivers", listDrivers);
router.post("/drivers", createDriver);
router.patch("/drivers/:id", updateDriver);

export default router;
