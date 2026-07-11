import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const icons = ["📱", "💻", "🎧", "🔌"];

const CategoryList = () => {
  const categories = useSelector((s) => s.products.categories);

  return (
    <div className="mb-5">
      <h4 className="mb-3">Shop by Category</h4>
      <div className="row g-3">
        {categories.map((c, idx) => (
          <div className="col-6 col-md-3" key={c.id}>
            <Link to={`/products?category=${c.id}`} className="text-decoration-none">
              <div className="card text-center py-4 shadow-sm product-card">
                <div style={{ fontSize: "2rem" }}>{icons[idx % icons.length]}</div>
                <div className="text-dark fw-semibold">{c.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
