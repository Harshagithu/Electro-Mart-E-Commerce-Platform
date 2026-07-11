import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import RatingStars from "../components/common/RatingStars";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const items = useSelector((s) => s.wishlist.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Your wishlist is empty</h4>
        <Link to="/products" className="btn btn-primary mt-3">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">My Wishlist</h3>
      <div className="row g-3">
        {items.map((item) => (
          <div className="col-md-3 col-6" key={item.id}>
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.name} style={{ height: "180px", objectFit: "cover" }} />
              <div className="card-body">
                <h6>{item.name}</h6>
                <RatingStars rating={item.rating} size={12} />
                <p className="price-new mt-2">₹{item.discountPrice}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm flex-grow-1"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(removeFromWishlist(item.id))}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
