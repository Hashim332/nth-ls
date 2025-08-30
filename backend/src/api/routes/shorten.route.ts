import express from "express";
import { BASE_URL, generateShortCode } from "../../utils/utils";

const router = express.Router();

router.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  const shortCode = generateShortCode();
  const shortUrl = `${BASE_URL}/${shortCode}`;
  res.status(200).json({ shortUrl });
  console.log(`new url: ${shortUrl}`);
});

export default router;
