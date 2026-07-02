import React, { useState, useEffect } from "react";

const emptyForm = { name: "", price: "", category: "", description: "", rating: "", productLink: "" };

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price ?? "",
        category: initialData.category || "",
        description: initialData.description || "",
        rating: initialData.rating ?? "",
        productLink: initialData.productLink || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (formData.price === "" || isNaN(formData.price) || Number(formData.price) < 0)
      newErrors.price = "Enter a valid, non-negative price";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.rating !== "" && (isNaN(formData.rating) || Number(formData.rating) < 0 || Number(formData.rating) > 5))
      newErrors.rating = "Rating must be between 0 and 5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      rating: formData.rating === "" ? 0 : Number(formData.rating),
      productLink: formData.productLink,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-title">{initialData ? "Edit Product" : "Add Product"}</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Wireless Mouse" />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 499" step="0.01" />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Electronics" />
            {errors.category && <div className="form-error">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Short product description" />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label>Rating (0 - 5)</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="e.g. 4" step="1" min="0" max="5" />
            {errors.rating && <div className="form-error">{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label>Product Link (Buy Now URL)</label>
            <input type="text" name="productLink" value={formData.productLink} onChange={handleChange} placeholder="https://example.com/product" />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;