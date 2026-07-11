import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    toast.success("User deleted");
    load();
  };

  return (
    <div>
      <h5 className="mb-3">Manage Users</h5>
      <table className="table table-bordered table-sm">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className={`badge bg-${u.role === "admin" ? "primary" : "secondary"}`}>{u.role}</span></td>
              <td>
                {u.role !== "admin" && (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
