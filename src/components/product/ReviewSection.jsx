import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import RatingStars from "../common/RatingStars";

const ReviewSection = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const loadReviews = async () => {
    const res = await api.get(`/reviews?productId=${productId}`);
    setReviews(res.data);
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.info("Please login to leave a review");
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    await api.post("/reviews", {
      productId,
      userId: user.id,
      rating,
      comment,
      date: new Date().toISOString().slice(0, 10),
    });
    setComment("");
    setRating(5);
    toast.success("Review submitted");
    loadReviews();
  };

  return (
    <div className="mt-5">
      <h4 className="mb-3">Reviews ({reviews.length})</h4>
      {reviews.map((r) => (
        <div key={r.id} className="border-bottom py-2">
          <RatingStars rating={r.rating} size={12} />
          <p className="mb-0 mt-1">{r.comment}</p>
          <small className="text-muted">{r.date}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-2">
          <label className="form-label">Your Rating</label>
          <select className="form-select form-select-sm w-auto" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} stars</option>
            ))}
          </select>
        </div>
        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;
