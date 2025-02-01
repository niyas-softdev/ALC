import React, { useEffect, useState } from "react";
import AppNavbar from "../common/AppNavbar";
import Footer from "../common/Footer";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5174/api/products/");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setFilteredProducts(category === "All" ? products : products.filter((p) => p.category === category));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <div>
      <AppNavbar />

      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://example.com/banner.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Our Exclusive Collection</h1>
          <p className="text-lg mb-6">Explore the finest jewelry, crafted with care and precision.</p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">Shop Now</button>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Categories</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-semibold ${activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-200"} hover:bg-blue-600 hover:text-white transition`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mt-2">${product.price}</p>
                  <button onClick={() => openModal(product)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredProducts.length === 0 && <p className="text-center text-gray-500 mt-8">No products found in this category.</p>}
        </div>
      </div>

      {selectedProduct && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
          >
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold mt-4">{selectedProduct.name}</h3>
            <p className="text-gray-500 mt-2">{selectedProduct.description}</p>
            <p className="text-lg font-semibold text-blue-600 mt-2">${selectedProduct.price}</p>
            <div className="mt-4 flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex-1">Add to Cart</button>
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition flex-1">Close</button>
            </div>
          </motion.div>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default Collection;
