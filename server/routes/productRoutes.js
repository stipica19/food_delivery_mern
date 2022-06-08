import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById);

export default router;
