import { Router } from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = Router();

router.route("/").post(protect, admin, addCategory).get(getAllCategories);
router
  .route("/:id([0-9a-fA-F]{24})")
  .delete(protect, admin, deleteCategory)
  .post(protect, admin, addCategory)
  .put(protect, admin, updateCategory)
  .get(protect, admin, getCategoryById);

export default router;
