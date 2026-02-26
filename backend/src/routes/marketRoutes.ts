import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listMarketAnalyses,
  getMarketAnalysis,
  createMarketAnalysis,
  updateMarketAnalysis,
  deleteMarketAnalysis,
  listCompetitiveAnalyses,
  getCompetitiveAnalysis,
  createCompetitiveAnalysis,
  updateCompetitiveAnalysis,
  deleteCompetitiveAnalysis,
} from "../controllers/marketController.ts";

const router = express.Router();
router.use(authMiddleware);

// Market Analysis
router.get("/analyses", listMarketAnalyses);
router.get("/analyses/:id", getMarketAnalysis);
router.post("/analyses", createMarketAnalysis);
router.patch("/analyses/:id", updateMarketAnalysis);
router.delete("/analyses/:id", deleteMarketAnalysis);

// Competitive Analysis
router.get("/competitive", listCompetitiveAnalyses);
router.get("/competitive/:id", getCompetitiveAnalysis);
router.post("/competitive", createCompetitiveAnalysis);
router.patch("/competitive/:id", updateCompetitiveAnalysis);
router.delete("/competitive/:id", deleteCompetitiveAnalysis);

export default router;
