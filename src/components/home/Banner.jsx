const Banner = () => (
  <div id="heroCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="bg-primary text-white text-center py-5 rounded">
          <h1>Big Electronics Sale</h1>
          <p>Up to 20% off on smartphones, laptops & more</p>
        </div>
      </div>
      <div className="carousel-item">
        <div className="bg-dark text-white text-center py-5 rounded">
          <h1>New Arrivals</h1>
          <p>Check out the latest gadgets in store</p>
        </div>
      </div>
      <div className="carousel-item">
        <div className="bg-success text-white text-center py-5 rounded">
          <h1>Free Delivery</h1>
          <p>On all orders above ₹999</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon"></span>
    </button>
  </div>
);

export default Banner;
