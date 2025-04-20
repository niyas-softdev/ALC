const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove extra spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is non-negative
  },
  category: {
    type: String,
    required: true,
    enum: ["Bracelets", "Earrings", "Chains", "Rings", "Necklaces"], // Restrict to predefined categories
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000, // Limit description length
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Ensure stock is non-negative
  }
 
  
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);

module.exports = Product;