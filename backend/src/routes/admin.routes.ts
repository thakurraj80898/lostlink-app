import { Router } from "express";
import { getUsers, deleteUser, deleteItem, blockUser, getDashboardStats } from "../controllers/admin.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate, requireRole("ADMIN"));

router.get("/users", getUsers);
router.get("/stats", getDashboardStats);
router.delete("/user/:id", deleteUser);
router.delete("/item/:id", deleteItem);
router.post("/user/:id/block", blockUser);

export default router;
