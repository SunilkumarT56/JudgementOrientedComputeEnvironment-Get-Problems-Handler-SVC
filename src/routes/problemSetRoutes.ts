import express from "express";
import { getProblemSet, getProblemById } from "../controllers/problemSetController.js";

const router = express.Router();

router.get("/", getProblemSet);
router.get("/:problemSlug", getProblemById);

export default router;
