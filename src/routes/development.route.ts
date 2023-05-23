import express from "express";
import { getAllEnv } from "../config";

const router = express.Router();

router.get("/ip", async (req, res) => res.send(req.ip));

router.get("/env", async (_req, res) => {
    res.send(getAllEnv());
});

export default router;
