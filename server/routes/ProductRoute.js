const express = require("express");
const {
  getAllProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Add a new product
router.post("/addProduct", addProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
