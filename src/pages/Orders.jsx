import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

const statusColors = {
  Pending: "warning",
  Shipped: "info",
  Delivered: "success",
  Cancelled: "danger",
};

const Orders = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.orders.list);
  const status = useSelector((s) => s.orders.status);

  useEffect(() => {
    if (user) dispatch(fetchOrders(user.id));
  }, [dispatch, user]);

  if (status === "loading") return <Loader />;

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>You haven't placed any orders yet</h4>
        <Link to="/products" className="btn btn-primary mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">My Orders</h3>
      {orders.slice().reverse().map((order) => (
        <div className="card mb-3 p-3" key={order.id}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">Order #{order.id}</span>
            <span className={`badge bg-${statusColors[order.status] || "secondary"}`}>{order.status}</span>
          </div>
          <p className="text-muted small mb-2">{new Date(order.date).toLocaleString()}</p>
          {order.items.map((i) => (
            <div className="d-flex justify-content-between small" key={i.id}>
              <span>{i.name} x {i.quantity}</span>
              <span>₹{i.discountPrice * i.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
          <p className="small text-muted mb-0">Payment: {order.paymentMethod}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
