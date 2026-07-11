import { useSelector } from "react-redux";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const products = useSelector((s) => s.products.items);
  const featured = products.filter((p) => p.featured);

  return (
    <div className="mb-5">
      <h4 className="mb-3">Featured Products</h4>
      <div className="row g-3">
        {featured.map((p) => (
          <div className="col-6 col-md-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
