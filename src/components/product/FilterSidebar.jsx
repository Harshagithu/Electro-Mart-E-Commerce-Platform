const FilterSidebar = ({ categories, filters, setFilters }) => {
  const handleCategoryChange = (id) => {
    setFilters((f) => ({
      ...f,
      categoryId: f.categoryId === id ? "" : id,
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters((f) => ({
      ...f,
      brand: f.brand === brand ? "" : brand,
    }));
  };

  return (
    <div className="card p-3">
      <h6>Category</h6>
      {categories.map((c) => (
        <div className="form-check" key={c.id}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={filters.categoryId === c.id}
            onChange={() => handleCategoryChange(c.id)}
            id={`cat-${c.id}`}
          />
          <label className="form-check-label" htmlFor={`cat-${c.id}`}>{c.name}</label>
        </div>
      ))}

      <hr />
      <h6>Brand</h6>
      {filters.availableBrands.map((b) => (
        <div className="form-check" key={b}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={filters.brand === b}
            onChange={() => handleBrandChange(b)}
            id={`brand-${b}`}
          />
          <label className="form-check-label" htmlFor={`brand-${b}`}>{b}</label>
        </div>
      ))}

      <hr />
      <h6>Max Price: ₹{filters.maxPrice}</h6>
      <input
        type="range"
        className="form-range"
        min="500"
        max="70000"
        step="500"
        value={filters.maxPrice}
        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
      />

      <hr />
      <h6>Min Rating</h6>
      <select
        className="form-select form-select-sm"
        value={filters.minRating}
        onChange={(e) => setFilters((f) => ({ ...f, minRating: Number(e.target.value) }))}
      >
        <option value={0}>Any</option>
        <option value={3}>3+ stars</option>
        <option value={4}>4+ stars</option>
        <option value={4.5}>4.5+ stars</option>
      </select>

      <button
        className="btn btn-outline-secondary btn-sm mt-3"
        onClick={() =>
          setFilters((f) => ({ ...f, categoryId: "", brand: "", maxPrice: 70000, minRating: 0 }))
        }
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
