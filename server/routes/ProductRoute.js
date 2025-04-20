const express = require("express");
const {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productCount,
  getProductsByCategory
} = require("../controllers/ProductController");

const router = express.Router();

// Get all products
router.get("/", getProduct);

// Get product by ID
router.get("/:id", getProductById);

router.get("/category/:category", getProductsByCategory);


// Create a new product
router.post("/", createProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Get product count
router.get("/count/products", productCount);

module.exports = router;
