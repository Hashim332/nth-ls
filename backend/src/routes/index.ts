import { Router } from "express";
import shortenRouter from "./shorten.route";

const router = Router();

router.use("/", shortenRouter);

export default router;
