import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listIndicators,
  getIndicator,
  createIndicator,
  updateIndicator,
  deleteIndicator,
} from "../controllers/economicController.ts";

const router = express.Router();

router.use(authMiddleware);

router.get("/indicators", listIndicators);
router.get("/indicators/:id", getIndicator);
router.post("/indicators", createIndicator);
router.patch("/indicators/:id", updateIndicator);
router.delete("/indicators/:id", deleteIndicator);

export default router;
