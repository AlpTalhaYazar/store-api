import { Product } from "../models/Product.js";
import { Result, PaginationResult } from "../utils/Result.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllProducts = async (req, res, next) => {
  const { page = 1, limit = 10, search, sort, ...queryFilter } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  if (pageNum < 1 || limitNum < 1) {
    throw createCustomError("Page and limit must be positive integers", 400);
  }

  if (search) {
    queryFilter.name = { $regex: search, $options: "i" };
  }

  const querySort = sort ? sort.split(",").join(" ") : "createdAt";

  const [products, total] = await Promise.all([
    Product.find()
      .where(queryFilter)
      .sort(querySort)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .lean()
      .exec(),
    Product.countDocuments(queryFilter),
  ]);

  const result = new PaginationResult(products, pageNum, limitNum, total);

  res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw createCustomError(`No product with id : ${id}`, 404);
  }

  const result = Result.success(product);

  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const product = new Product(req.body);

  const createdProduct = await product.save();

  const result = Result.success(createdProduct);

  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw createCustomError(`No product with id : ${id}`, 404);
  }

  var updateData = { updatedAt: Date.now(), ...req.body };

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  const result = Result.success(updatedProduct);

  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw createCustomError(`No product with id : ${id}`, 404);
  }

  await Product.findByIdAndDelete(id);

  const result = Result.success(null);

  res.status(200).json(result);
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
