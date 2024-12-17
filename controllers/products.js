import { Product } from "../models/Product.js";
import { Result, PaginationResult } from "../utils/Result.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllProducts = async (req, res) => {
  const { sort, pageNum, limitNum, skip, fields, ...queryFilter } =
    req.queryFilter;

  const [products, total] = await Promise.all([
    Product.find(queryFilter)
      .sort(req.queryFilter.sort)
      .limit(req.queryFilter.limitNum)
      .skip(req.queryFilter.skip)
      .select(req.queryFilter.fields ? req.queryFilter.fields : "")
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
