import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      alert("Failed to load products. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        alert("Product updated successfully");
      } else {
        await createProduct(formData);
        alert("Product stored successfully");
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      alert(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);

    setTimeout(async () => {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
      } finally {
        setDeletingId(null);
      }
    }, 300);
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app-container">
      <div className="page-title">Product Management</div>

      <div className="card">
        <div className="toolbar">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add Product <FaPlus />
          </button>

          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <div className="spinner-text">Loading products...</div>
          </div>
        ) : (
          <ProductList products={filteredProducts} onEdit={handleEditClick} onDelete={handleDelete} deletingId={deletingId} />
        )}
      </div>

      {showForm && (
        <ProductForm initialData={editingProduct} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default App;