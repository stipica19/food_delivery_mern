import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  console.log("first");

  const keyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  console.log(keyword);
  const products = await Product.find({ ...keyword });

  res.json({ products });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, image, category, description, price, dodaci } = req.body;

  console.log(dodaci);
  console.log(dodaci.value);
  const newProduct = new Product({
    name,
    image,
    category,
    description,
    price,
    dodaci,
  });

  const createdProduct = await newProduct.save();
  res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
