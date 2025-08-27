import express from "express";

const router = express.Router();

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  res.status(200).json({ url, something: "endpoint is working" });
});

export default router;
