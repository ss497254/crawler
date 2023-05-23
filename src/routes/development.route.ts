import express from "express";

const router = express.Router();

router.get("/ip", async (req, res) => res.send(req.ip));

router.get("/ping", (_, res) => res.send("pong"));

export default router;
