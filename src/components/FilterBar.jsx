import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const FilterBar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    onlyInStock,
    setOnlyInStock,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    formatPrice,
    filteredProducts,
    searchQuery,
    setSearchQuery
  } = useShop();

  const isFiltered =
    selectedCategory !== 'All Products' ||
    priceRange < 400 ||
    minRating > 0 ||
    onlyInStock ||
    searchQuery !== '';

  const resetFilters = () => {
    setSelectedCategory('All Products');
    setPriceRange(400);
    setMinRating(0);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div id="catalog-section" className="filter-bar-wrapper">
      <div className="filter-header">
        <div>
          <h2 className="catalog-heading">Explore Catalog</h2>
          <p className="catalog-subheading">
            Showing <strong>{filteredProducts.length}</strong> premium devices & workspace essentials
          </p>
        </div>

        {/* View Switcher & Sort */}
        <div className="filter-controls-right">
          <div className="sort-dropdown-wrap">
            <label htmlFor="sort-select" className="filter-label">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured & Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              type="button"
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Grid View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
              aria-label="List View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Controls Bar */}
      <div className="filter-secondary-bar">
        {/* Price Slider */}
        <div className="filter-item filter-price">
          <span className="filter-label">Max Price: <strong>{formatPrice(priceRange)}</strong></span>
          <input
            type="range"
            min="80"
            max="400"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="price-slider"
          />
        </div>

        {/* Rating Filter */}
        <div className="filter-item">
          <span className="filter-label">Minimum Rating:</span>
          <div className="rating-buttons">
            {[0, 4.6, 4.8].map(rate => (
              <button
                key={rate}
                type="button"
                className={`rating-pill ${minRating === rate ? 'active' : ''}`}
                onClick={() => setMinRating(rate)}
              >
                {rate === 0 ? 'All' : `${rate}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* In-Stock Toggle */}
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="filter-checkbox"
          />
          <span>In Stock Only</span>
        </label>

        {/* Reset button */}
        {isFiltered && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={resetFilters}
          >
            ✕ Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
