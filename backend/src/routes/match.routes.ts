import { Router } from "express";
import { sendMatchRequest, approveMatch, rejectMatch, getMatchRequests } from "../controllers/match.controller";
import { authenticate, checkBlocked } from "../middleware/auth.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

const matchRequestValidation = [
  body("lostItemId").notEmpty().withMessage("Lost item ID is required"),
  body("foundItemId").notEmpty().withMessage("Found item ID is required"),
];

router.post("/request", authenticate, checkBlocked, matchRequestValidation, validate, sendMatchRequest);
router.get("/requests", authenticate, getMatchRequests);
router.post("/:id/approve", authenticate, checkBlocked, approveMatch);
router.post("/:id/reject", authenticate, checkBlocked, rejectMatch);

export default router;
