import { Router } from "express";
import shortenRouter from "./shorten.route";

const router = Router();

router.use("/v1/api", shortenRouter);

export default router;
