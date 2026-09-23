import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice
  } = useShop();

  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.image);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);
  const discountPercent = Math.round(
    ((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="quickview-grid">
          {/* Left Column: Gallery */}
          <div className="quickview-gallery-col">
            <div className="quickview-main-image-wrap">
              <img
                src={activeImage || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="quickview-main-image"
              />
              {quickViewProduct.badge && (
                <span className="product-badge">{quickViewProduct.badge}</span>
              )}
            </div>

            {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
              <div className="quickview-thumbnails">
                {quickViewProduct.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${quickViewProduct.name} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Actions */}
          <div className="quickview-info-col">
            <div className="quickview-category-row">
              <span className="product-category-tag">{quickViewProduct.category}</span>
              <div className="product-rating">
                <span className="star-icon">★</span>
                <span className="rating-num">{quickViewProduct.rating}</span>
                <span className="rating-count">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="quickview-title">{quickViewProduct.name}</h2>
            <p className="quickview-tagline">{quickViewProduct.tagline}</p>

            <div className="quickview-pricing-row">
              <span className="current-price large-price">{formatPrice(quickViewProduct.price)}</span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <>
                  <span className="original-price large-orig">{formatPrice(quickViewProduct.originalPrice)}</span>
                  <span className="discount-tag">Save {discountPercent}%</span>
                </>
              )}
            </div>

            <p className="quickview-description">{quickViewProduct.description}</p>

            {/* Specifications */}
            {quickViewProduct.specs && (
              <div className="quickview-specs-box">
                <h4 className="specs-title">Technical Specifications</h4>
                <div className="specs-list">
                  {Object.entries(quickViewProduct.specs).map(([label, val]) => (
                    <div key={label} className="spec-item">
                      <span className="spec-label">{label}:</span>
                      <span className="spec-value">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="quickview-stock-status">
              <span className="stock-pulse-dot"></span>
              <span>In Stock — Ready to ship via Express Courier ({quickViewProduct.stockLeft} left)</span>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="quickview-actions-row">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(q => Math.min(quickViewProduct.stockLeft, q + 1))}
                  disabled={quantity >= quickViewProduct.stockLeft}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary quickview-add-cart-btn"
                onClick={handleAddToCart}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add To Cart • {formatPrice(quickViewProduct.price * quantity)}
              </button>

              <button
                type="button"
                className={`quickview-wishlist-toggle ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct)}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? '#ef4444' : 'none'} stroke={wishlisted ? '#ef4444' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
