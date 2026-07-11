import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const emptyForm = { name: "", brand: "", categoryId: "", price: "", discountPrice: "", rating: 4, stock: "", image: "", description: "", featured: false, latest: false };

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const [p, c] = await Promise.all([api.get("/products"), api.get("/categories")]);
    setProducts(p.data);
    setCategories(c.data);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      price: Number(form.price),
      discountPrice: Number(form.discountPrice),
      rating: Number(form.rating),
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        toast.success("Product updated");
      } else {
        await api.post("/products", payload);
        toast.success("Product added");
      }
      resetForm();
      load();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  return (
    <div>
      <h5 className="mb-3">Manage Products</h5>
      <div className="card p-3 mb-4">
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-4"><input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /></div>
          <div className="col-md-4"><input className="form-control" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required /></div>
          <div className="col-md-4">
            <select className="form-select" name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-md-3"><input className="form-control" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required /></div>
          <div className="col-md-3"><input className="form-control" name="discountPrice" type="number" placeholder="Discount Price" value={form.discountPrice} onChange={handleChange} required /></div>
          <div className="col-md-3"><input className="form-control" name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required /></div>
          <div className="col-md-3"><input className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /></div>
          <div className="col-12"><textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} /></div>
          <div className="col-auto form-check ms-2">
            <input className="form-check-input" type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" />
            <label className="form-check-label" htmlFor="featured">Featured</label>
          </div>
          <div className="col-auto form-check">
            <input className="form-check-input" type="checkbox" name="latest" checked={form.latest} onChange={handleChange} id="latest" />
            <label className="form-check-label" htmlFor="latest">Latest</label>
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-sm me-2">{editingId ? "Update Product" : "Add Product"}</button>
            {editingId && <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <table className="table table-bordered table-sm">
        <thead>
          <tr><th>Name</th><th>Brand</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>₹{p.discountPrice}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
