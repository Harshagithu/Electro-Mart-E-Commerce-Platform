import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post("/categories", { name });
    setName("");
    toast.success("Category added");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    toast.success("Category deleted");
    load();
  };

  return (
    <div>
      <h5 className="mb-3">Manage Categories</h5>
      <form onSubmit={handleAdd} className="d-flex mb-3 gap-2">
        <input className="form-control" placeholder="New category name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn btn-primary">Add</button>
      </form>
      <table className="table table-bordered table-sm">
        <thead><tr><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
