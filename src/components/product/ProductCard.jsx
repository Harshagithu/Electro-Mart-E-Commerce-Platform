import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import RatingStars from "../common/RatingStars";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const wishlist = useSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);

  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireLogin()) return;
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const toggleWishlist = () => {
    if (!requireLogin()) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="card product-card h-100 shadow-sm">
      <button
        className="btn btn-sm position-absolute top-0 end-0 m-2 bg-white rounded-circle"
        onClick={toggleWishlist}
        style={{ zIndex: 2 }}
      >
        {isWishlisted ? <FaHeart className="text-danger" /> : <FaRegHeart />}
      </button>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
      </Link>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1">
          <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </h6>
        <div className="mb-2"><RatingStars rating={product.rating} /></div>
        <div className="mb-2">
          <span className="price-new me-2">₹{product.discountPrice}</span>
          <span className="price-old">₹{product.price}</span>
        </div>
        <button className="btn btn-primary btn-sm mt-auto" onClick={handleAddToCart}>
          <FaCartPlus className="me-1" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
