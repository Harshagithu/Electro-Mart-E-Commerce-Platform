import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  const products = useSelector((s) => s.products.items);
  const related = products
    .filter((p) => p.categoryId === currentProduct.categoryId && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-5">
      <h4 className="mb-3">Related Products</h4>
      <div className="row g-3">
        {related.map((p) => (
          <div className="col-6 col-md-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
