import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listForecasts,
  getForecast,
  createForecast,
  updateForecast,
  updateKPI,
  updateScenario,
  deleteForecast,
} from "../controllers/businessForecastController.ts";

const router = express.Router();

router.use(authMiddleware);

router.get("/forecasts", listForecasts);
router.get("/forecasts/:id", getForecast);
router.post("/forecasts", createForecast);
router.patch("/forecasts/:id", updateForecast);
router.patch("/forecasts/:id/kpi", updateKPI);
router.patch("/forecasts/:id/scenario", updateScenario);
router.delete("/forecasts/:id", deleteForecast);

export default router;
