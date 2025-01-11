import express from "express";
import { getEntries , addEntrie, editEntrie, deleteEntrie} from "../controllers/entrieControllers";

const router = express.Router();

router.get("/entries", getEntries);
router.post("/addentrie", addEntrie);
router.put("/editentrie/:id", editEntrie);
router.delete("/deleteentrie/:id", deleteEntrie);

export default router;