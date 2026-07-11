import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill all fields");
    setSending(true);
    try {
      await api.post("/contact", { ...form, date: new Date().toISOString() });
      toast.success("Message sent! Our support team will reach out soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Contact Us</h3>
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button className="btn btn-primary" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
        </form>
      </div>
      <div className="mt-4 text-muted small">
        <p>📧 support@electromart.com</p>
        <p>📞 +91 90000 00000</p>
        <p>📍 HITEC City, Madhapur, Hyderabad</p>
      </div>
    </div>
  );
};

export default Contact;
