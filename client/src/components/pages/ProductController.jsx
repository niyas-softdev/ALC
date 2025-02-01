import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductController() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const categories = ["Bracelets", "Earrings", "Chains", "Rings", "Necklaces"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5174/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!editingProduct) return;

    const id = editingProduct._id;
    const updatedProduct = {
      name,
      price,
      description,
      image,
      category,
      stock,
    };

    try {
      await axios.put(`http://localhost:5174/api/products/${id}`, updatedProduct);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5174/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const newProduct = {
      name,
      price,
      description,
      image,
      category,
      stock,
    };

    try {
      await axios.post("http://localhost:5174/api/products/addProduct", newProduct);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setAddingProduct(false);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory("");
    setStock("");
    setAddingProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Product Management</h1>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow" onClick={() => { setAddingProduct(true); setEditingProduct(null); }}>
          Add Product
        </button>
      </div>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t hover:bg-gray-100 transition">
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3 space-x-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditClick(product)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(addingProduct || editingProduct) && (
        <form onSubmit={addingProduct ? handleAddProduct : handleUpdate} className="mt-6 p-6 bg-white shadow rounded-lg space-y-4">
          {image && <img src={image} alt="Product" className="w-32 h-32 object-cover rounded-lg" />}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="border p-3 w-full rounded" />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="border p-3 w-full rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="border p-3 w-full rounded" />
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required className="border p-3 w-full rounded" />
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required className="border p-3 w-full rounded" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required className="border p-3 w-full rounded">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">{editingProduct ? "Update Product" : "Add Product"}</button>
          <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>
        </form>
      )}
    </div>
  );
}

export default ProductController;
