import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [address, setAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.discountPrice * i.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return toast.error("Please enter a delivery address");
    if (paymentMethod === "UPI" && !upiId.trim()) return toast.error("Enter your UPI ID");
    if (paymentMethod === "Card" && cardNumber.trim().length < 12) return toast.error("Enter a valid card number");

    setPlacing(true);
    try {
      const order = {
        userId: user.id,
        items,
        address,
        paymentMethod,
        subtotal,
        tax,
        total,
        status: "Pending",
        date: new Date().toISOString(),
      };
      const createdOrder = await dispatch(placeOrder(order)).unwrap();

      await api.post("/payments", {
        orderId: createdOrder.id,
        userId: user.id,
        method: paymentMethod,
        amount: total,
        status: "Completed",
      });

      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order. Try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Your cart is empty. Add items before checking out.</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">Checkout</h3>
      <form onSubmit={handlePlaceOrder}>
        <div className="row">
          <div className="col-md-7">
            <div className="card p-3 mb-3">
              <h5>Delivery Address</h5>
              <textarea
                className="form-control"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="card p-3">
              <h5>Payment Method</h5>
              {["COD", "UPI", "Card"].map((method) => (
                <div className="form-check" key={method}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <label className="form-check-label" htmlFor={method}>
                    {method === "COD" ? "Cash on Delivery" : method === "UPI" ? "UPI" : "Credit/Debit Card"}
                  </label>
                </div>
              ))}

              {paymentMethod === "UPI" && (
                <input
                  className="form-control mt-2"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}
              {paymentMethod === "Card" && (
                <input
                  className="form-control mt-2"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={16}
                />
              )}
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-3">
              <h5>Order Summary</h5>
              {items.map((i) => (
                <div className="d-flex justify-content-between small" key={i.id}>
                  <span>{i.name} x {i.quantity}</span>
                  <span>₹{i.discountPrice * i.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="d-flex justify-content-between"><span>Tax</span><span>₹{tax}</span></div>
              <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{total}</span></div>
              <button type="submit" className="btn btn-primary w-100 mt-3" disabled={placing}>
                {placing ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
