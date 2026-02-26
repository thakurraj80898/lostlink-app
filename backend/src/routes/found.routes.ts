import { Router } from "express";
import { createFoundItem, getFoundItems, getFoundItemById, updateFoundItem, deleteFoundItem } from "../controllers/found.controller";
import { getPotentialMatches } from "../controllers/matching.controller";
import { authenticate, checkBlocked } from "../middleware/auth.middleware";
import { uploadMultiple } from "../middleware/upload.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

const foundItemValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("dateFound").notEmpty().withMessage("Date found is required"),
  body("description").isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
];

router.post("/", authenticate, checkBlocked, uploadMultiple.array("images", 5), foundItemValidation, validate, createFoundItem);
router.get("/", getFoundItems);
router.get("/:id", getFoundItemById);
router.get("/:id/matches", getPotentialMatches);
router.put("/:id", authenticate, checkBlocked, uploadMultiple.array("images", 5), foundItemValidation, validate, updateFoundItem);
router.delete("/:id", authenticate, checkBlocked, deleteFoundItem);

export default router;
