import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    PRODUCTS,
    formatPrice
  } = useShop();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <aside
        className="cart-drawer wishlist-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Wishlist Drawer"
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3 className="drawer-title">Saved Wishlist</h3>
            <span className="drawer-count-pill">{wishlistedProducts.length} items</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {wishlistedProducts.length === 0 ? (
            <div className="empty-drawer-box">
              <div className="empty-cart-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h4>Your wishlist is empty</h4>
              <p>Save items you love by tapping the heart icon on any product card.</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setIsWishlistOpen(false)}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {wishlistedProducts.map(product => (
                <div key={product.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <span className="cart-item-category">{product.category}</span>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => toggleWishlist(product)}
                        title="Remove from wishlist"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="cart-item-title">{product.name}</h4>
                    <div className="product-pricing mt-1">
                      <span className="current-price">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>

                    <div className="cart-item-bottom mt-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm w-full"
                        onClick={() => {
                          addToCart(product, 1);
                          toggleWishlist(product);
                        }}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
