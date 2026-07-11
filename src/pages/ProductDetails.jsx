import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import RatingStars from "../components/common/RatingStars";
import RelatedProducts from "../components/product/RelatedProducts";
import ReviewSection from "../components/product/ReviewSection";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const products = useSelector((s) => s.products.items);
  const status = useSelector((s) => s.products.status);
  const wishlist = useSelector((s) => s.wishlist.items);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  if (status === "loading" || status === "idle") return <Loader />;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Product not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    if (!user) return navigate("/login");
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const toggleWishlist = () => {
    if (!user) return navigate("/login");
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-7">
          <h3>{product.name}</h3>
          <p className="text-muted">{product.brand}</p>
          <RatingStars rating={product.rating} />
          <div className="my-3">
            <span className="price-new fs-4 me-2">₹{product.discountPrice}</span>
            <span className="price-old">₹{product.price}</span>
          </div>
          <p>{product.description}</p>
          <p className={product.stock > 0 ? "text-success" : "text-danger"}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleAddToCart} disabled={product.stock === 0}>
              Add to Cart
            </button>
            <button className="btn btn-outline-danger" onClick={toggleWishlist}>
              {isWishlisted ? <FaHeart /> : <FaRegHeart />} Wishlist
            </button>
          </div>
        </div>
      </div>

      <RelatedProducts currentProduct={product} />
      <ReviewSection productId={product.id} />
    </div>
  );
};

export default ProductDetails;
