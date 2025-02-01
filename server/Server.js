require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Ensure this file properly connects to MongoDB
const productRoutes = require("./routes/ProductRoute");

const app = express();



// Middleware to parse incoming JSON requests
app.use(express.json()); // Replaces bodyParser.json(), as it's built-in from Express 4.16+
app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded data

// Set up CORS to allow requests from specific origins
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ], // Allow specific origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies to be sent cross-origin
  })
);

// Define routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
