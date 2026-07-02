import React from "react";
import { FaEdit, FaTrash, FaStar, FaRegStar, FaExternalLinkAlt } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} color="#f5b301" />);
    } else {
      stars.push(<FaRegStar key={i} color="#d3d3d3" />);
    }
  }
  return stars;
};

const ProductList = ({ products, onEdit, onDelete, deletingId }) => {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Buy Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr className="empty-row">
              <td colSpan="8">No products found. Click "Add Product" to create one.</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id} className={deletingId === product._id ? "row-exit" : ""}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>₹{Number(product.price).toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {product.rating ? renderStars(product.rating) : "N/A"}
                </td>
                <td>
                  {product.productLink ? (
                    <a href={product.productLink} target="_blank" rel="noopener noreferrer">
                      Buy <FaExternalLinkAlt size={12} />
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => onEdit(product)} title="Edit">
                    <FaEdit />
                  </button>
                  <button className="action-btn delete-btn" onClick={() => onDelete(product._id)} title="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;