import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../redux/slices/productSlice";
import Banner from "../components/home/Banner";
import CategoryList from "../components/home/CategoryList";
import OffersBanner from "../components/home/OffersBanner";
import FeaturedProducts from "../components/home/FeaturedProducts";
import LatestProducts from "../components/home/LatestProducts";
import Loader from "../components/common/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading" || status === "idle") return <Loader />;

  return (
    <div className="container py-4">
      <Banner />
      <CategoryList />
      <OffersBanner />
      <FeaturedProducts />
      <LatestProducts />
    </div>
  );
};

export default Home;
