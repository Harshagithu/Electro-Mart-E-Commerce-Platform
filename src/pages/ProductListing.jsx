import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../redux/slices/productSlice";
import ProductCard from "../components/product/ProductCard";
import FilterSidebar from "../components/product/FilterSidebar";
import Loader from "../components/common/Loader";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const products = useSelector((s) => s.products.items);
  const categories = useSelector((s) => s.products.categories);
  const status = useSelector((s) => s.products.status);

  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    categoryId: categoryParam ? Number(categoryParam) : "",
    brand: "",
    maxPrice: 70000,
    minRating: 0,
    availableBrands: [],
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      const brands = [...new Set(products.map((p) => p.brand))];
      setFilters((f) => ({ ...f, availableBrands: brands }));
    }
  }, [products]);

  useEffect(() => {
    if (categoryParam) {
      setFilters((f) => ({ ...f, categoryId: Number(categoryParam) }));
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (p.discountPrice > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      return true;
    });
  }, [products, filters, searchQuery]);

  if (status === "loading" || status === "idle") return <Loader />;

  return (
    <div className="container py-4">
      <h3 className="mb-4">
        {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
      </h3>
      <div className="row">
        <div className="col-md-3 mb-4">
          <FilterSidebar categories={categories} filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-md-9">
          {filtered.length === 0 ? (
            <p className="text-muted">No products match your filters.</p>
          ) : (
            <div className="row g-3">
              {filtered.map((p) => (
                <div className="col-6 col-lg-4" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
