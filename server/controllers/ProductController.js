const Product = require("../models/ProductModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category: ${category}` });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Failed to fetch products by category", error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
    const products = req.body;
    console.log(req.body);
     // Accepts data from the request body
    try {
      if (Array.isArray(products)) {
        // Check if the input is an array of products
        for (const product of products) {
          const { name, price, category, image, description, stock } = product;
  
          if (!name || !price || !category || !image || !description || stock === undefined) {
            return res.status(400).json({ message: "All fields are required for each product" });
          }
        }
  
        const newProducts = await Product.insertMany(products); // Add multiple products
        res.status(201).json({ message: "Products added successfully", products: newProducts });
      } else {
        // If it's a single product
        const { name, price, category, image, description, stock } = products;
  
        if (!name || !price || !category || !image || !description || stock === undefined) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        const newProduct = new Product(products); // Add single product
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
      }
    } catch (error) {
      console.error("Error adding products:", error);
      res.status(500).json({ message: "Failed to add product(s)", error: error.message });
    }
  };
  

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
