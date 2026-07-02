import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050/api/products";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/");
export const createProduct = (product) => api.post("/", product);
export const updateProduct = (id, product) => api.put(`/${id}`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);

export default api;




