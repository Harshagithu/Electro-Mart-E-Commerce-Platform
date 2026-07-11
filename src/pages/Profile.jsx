import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/authService";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateCurrentUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, form);
      updateCurrentUser(form);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.current !== user.password) return toast.error("Current password is incorrect");
    if (passwords.next.length < 6) return toast.error("New password must be at least 6 characters");
    if (passwords.next !== passwords.confirm) return toast.error("Passwords do not match");
    try {
      await updateUser(user.id, { password: passwords.next });
      updateCurrentUser({ password: passwords.next });
      setPasswords({ current: "", next: "", confirm: "" });
      toast.success("Password changed successfully");
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">My Profile</h3>

      <div className="card p-3 mb-4">
        <h5>Edit Profile</h5>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="mb-2">
            <label className="form-label">Phone</label>
            <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="mb-2">
            <label className="form-label">Address</label>
            <textarea className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-sm">Save Changes</button>
        </form>
      </div>

      <div className="card p-3">
        <h5>Change Password</h5>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-2">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          </div>
          <div className="mb-2">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={passwords.next} onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} />
          </div>
          <div className="mb-2">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-sm">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
