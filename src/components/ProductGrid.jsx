import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const { filteredProducts, viewMode, setSearchQuery, setSelectedCategory, setPriceRange, setMinRating, setOnlyInStock } = useShop();

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setPriceRange(400);
    setMinRating(0);
    setOnlyInStock(false);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="empty-catalog-state">
        <div className="empty-icon-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 className="empty-title">No products match your criteria</h3>
        <p className="empty-desc">
          Try expanding your price range, clearing your search query, or selecting another category.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleReset}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className={`products-container ${viewMode === 'list' ? 'products-list-layout' : 'products-grid-layout'}`}>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};
