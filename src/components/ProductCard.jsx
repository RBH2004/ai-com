import React from 'react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
    formatPrice
  } = useShop();

  const wishlisted = isWishlisted(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className={`product-card ${viewMode === 'list' ? 'product-card-list' : ''}`}>
      {/* Thumbnail Area */}
      <div className="product-thumb-container">
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={`card-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Toggle wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#ef4444' : 'none'} stroke={wishlisted ? '#ef4444' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        <div className="quickview-overlay">
          <button
            type="button"
            className="quickview-btn"
            onClick={() => setQuickViewProduct(product)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="product-info-container">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.category}</span>
          <div className="product-rating">
            <span className="star-icon">★</span>
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          className="product-title"
          onClick={() => setQuickViewProduct(product)}
          role="button"
          tabIndex={0}
        >
          {product.name}
        </h3>
        <p className="product-tagline">{product.tagline}</p>

        {viewMode === 'list' && (
          <p className="product-description-snippet">{product.description}</p>
        )}

        {/* Low stock warning */}
        {product.stockLeft <= 8 && (
          <div className="stock-alert">
            <span className="stock-dot"></span> Only {product.stockLeft} units remaining
          </div>
        )}

        <div className="product-footer-row">
          <div className="product-pricing">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                <span className="discount-tag">-{discountPercent}%</span>
              </>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm add-cart-btn"
            onClick={() => addToCart(product, 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
