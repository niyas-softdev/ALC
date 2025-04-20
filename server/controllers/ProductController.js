const router = require("express").Router();
const Product = require("../models/ProductModel");

// GET all products
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products: products,
      message: "Products fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/product/:productId
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // ✅ use 'id' here
    if (!product) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// CREATE a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product: product // Return the created product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const productCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({
      productCount: productCount,
      message: "Product count fetched successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found in category: ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      products,
      message: `Products in category: ${category}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productCount,
  getProductsByCategory
};
