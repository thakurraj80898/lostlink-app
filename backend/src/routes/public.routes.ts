import { Router } from "express";
import { getPublicLostItem, reportFoundViaPublicLink } from "../controllers/public.controller";

const router = Router();

router.get("/lost/:id", getPublicLostItem);
router.post("/lost/:id/found", reportFoundViaPublicLink);

export default router;
