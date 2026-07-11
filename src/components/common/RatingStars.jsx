import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating = 0, size = 14 }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <span className="text-warning">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} size={size} />
      ))}
      {hasHalf && <FaStarHalfAlt size={size} />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} size={size} />
      ))}
      <span className="text-muted ms-1" style={{ fontSize: "0.8rem" }}>
        ({rating})
      </span>
    </span>
  );
};

export default RatingStars;
