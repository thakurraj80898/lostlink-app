import { Router } from "express";
import { createLostItem, getLostItems, getLostItemById, updateLostItem, deleteLostItem } from "../controllers/lost.controller";
import { authenticate, checkBlocked } from "../middleware/auth.middleware";
import { uploadMultiple } from "../middleware/upload.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

const lostItemValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("dateLost").notEmpty().withMessage("Date lost is required"),
  body("description").isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
];

router.post("/", authenticate, checkBlocked, uploadMultiple.array("images", 5), lostItemValidation, validate, createLostItem);
router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.put("/:id", authenticate, checkBlocked, uploadMultiple.array("images", 5), lostItemValidation, validate, updateLostItem);
router.delete("/:id", authenticate, checkBlocked, deleteLostItem);

export default router;
