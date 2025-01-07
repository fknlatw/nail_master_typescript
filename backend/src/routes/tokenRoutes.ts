import express from "express";
import { tokenRefresh } from "../controllers/tokenControllers";

const router = express.Router();

router.post("/token", tokenRefresh);


export default router;