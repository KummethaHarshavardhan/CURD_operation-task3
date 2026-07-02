const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const validateProduct = (body) => {
  const { name, price, category, description, rating } = body;
  if (!name || !name.trim()) return "Product name is required";
  if (price === undefined || price === null || price === "") return "Price is required";
  if (isNaN(price) || Number(price) < 0) return "Price must be a valid positive number";
  if (!category || !category.trim()) return "Category is required";
  if (!description || !description.trim()) return "Description is required";
  if (rating !== undefined && rating !== "" && (isNaN(rating) || Number(rating) < 0 || Number(rating) > 5)) {
    return "Rating must be a number between 0 and 5";
  }
  return null;
};

// Create a new product
router.post("/", async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const { name, price, category, description, rating, productLink } = req.body;

    const product = new Product({
      name,
      price,
      category,
      description,
      rating: rating || 0,
      productLink: productLink || "",
    });
    const savedProduct = await product.save();

    res.status(201).json({ success: true, message: "Product stored successfully", data: savedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while creating product", error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while fetching products", error: err.message });
  }
});

// Get a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while fetching product", error: err.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const error = validateProduct(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const { name, price, category, description, rating, productLink } = req.body;
    const updateData = {
      name,
      price,
      category,
      description,
      rating: rating || 0,
      productLink: productLink || "",
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while updating product", error: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error while deleting product", error: err.message });
  }
});

module.exports = router;