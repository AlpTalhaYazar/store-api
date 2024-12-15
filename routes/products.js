import express from "express";
import { parseQuery } from "../middleware/parse-query.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.route("/").get(parseQuery, getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export { router as productsRouter };
