import { useSelector } from "react-redux";
import ProductCard from "../product/ProductCard";

const LatestProducts = () => {
  const products = useSelector((s) => s.products.items);
  const latest = products.filter((p) => p.latest);

  return (
    <div className="mb-5">
      <h4 className="mb-3">Latest Arrivals</h4>
      <div className="row g-3">
        {latest.map((p) => (
          <div className="col-6 col-md-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
