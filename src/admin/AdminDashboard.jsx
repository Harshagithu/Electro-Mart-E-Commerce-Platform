import { Link, Routes, Route, useLocation } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import ManageCategories from "./ManageCategories";
import ManageUsers from "./ManageUsers";
import ManageOrders from "./ManageOrders";

const AdminDashboard = () => {
  const location = useLocation();

  const links = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="container py-4">
      <h3 className="mb-4">Admin Dashboard</h3>
      <div className="row">
        <div className="col-md-2 mb-3">
          <div className="list-group">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`list-group-item list-group-item-action ${
                  location.pathname === link.to ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-md-10">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="orders" element={<ManageOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => (
  <div className="card p-4">
    <h5>Welcome, Admin</h5>
    <p className="text-muted">Use the sidebar to manage products, categories, users, and orders.</p>
  </div>
);

export default AdminDashboard;
