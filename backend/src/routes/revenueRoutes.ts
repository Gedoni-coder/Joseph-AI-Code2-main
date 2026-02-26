import express from "express";
import { authMiddleware } from "../utils/authMiddleware.ts";
import {
  listStrategies, getStrategy, createStrategy, updateStrategy,
  listStreams, addStream, updateStream, deleteStream,
} from "../controllers/revenueController.ts";

const router = express.Router();
router.use(authMiddleware);

// Revenue Strategy Summary
router.get("/strategies", listStrategies);
router.get("/strategies/:id", getStrategy);
router.post("/strategies", createStrategy);
router.patch("/strategies/:id", updateStrategy);

// Revenue Streams (supports onAddStream mutation)
router.get("/streams", listStreams);
router.post("/streams", addStream);
router.patch("/streams/:id", updateStream);
router.delete("/streams/:id", deleteStream);

export default router;
