import express from "express";
import { getEntries } from "../controllers/entrieControllers";

const router = express.Router();

router.get("/entries", getEntries);

export default router;