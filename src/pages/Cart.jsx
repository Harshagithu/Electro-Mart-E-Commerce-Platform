import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/slices/cartSlice";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.discountPrice * i.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Your cart is empty</h4>
        <Link to="/products" className="btn btn-primary mt-3">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">Shopping Cart</h3>
      <div className="row">
        <div className="col-md-8">
          {items.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body d-flex align-items-center">
                <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="me-3 rounded" />
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <p className="mb-1 text-muted">₹{item.discountPrice} each</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(decreaseQty(item.id))}>
                      <FaMinus size={10} />
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(increaseQty(item.id))}>
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <p className="fw-bold">₹{item.discountPrice * item.quantity}</p>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="d-flex justify-content-between"><span>Tax (5%)</span><span>₹{tax}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{total}</span></div>
            <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
