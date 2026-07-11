import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    await api.patch(`/orders/${id}`, { status });
    toast.success("Order status updated");
    load();
  };

  return (
    <div>
      <h5 className="mb-3">Manage Orders</h5>
      <table className="table table-bordered table-sm">
        <thead><tr><th>Order ID</th><th>User ID</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.userId}</td>
              <td>₹{o.total}</td>
              <td>
                <select className="form-select form-select-sm" value={o.status} onChange={(e) => handleStatusChange(o.id, e.target.value)}>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
