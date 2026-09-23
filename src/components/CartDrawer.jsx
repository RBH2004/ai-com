import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    cartTotal,
    discountAmount,
    discountRate,
    couponCode,
    applyCoupon,
    removeCoupon,
    shippingFee,
    updateQuantity,
    removeFromCart,
    formatPrice,
    setIsCheckoutOpen
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3 className="drawer-title">Shopping Cart</h3>
            <span className="drawer-count-pill">{cartCount} items</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-text">
            {remainingForFreeShipping === 0 ? (
              <span className="unlocked-badge">🎉 Congratulations! You have unlocked FREE Express Shipping!</span>
            ) : (
              <span>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more to get <strong>FREE Express Shipping</strong></span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${shippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-drawer-box">
              <div className="empty-cart-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h4>Your cart is empty</h4>
              <p>Explore our catalog of precision acoustics, wearables and workspace essentials.</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ product, quantity }) => (
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
                        onClick={() => removeFromCart(product.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="cart-item-title">{product.name}</h4>
                    <div className="cart-item-price-unit">{formatPrice(product.price)} each</div>

                    <div className="cart-item-bottom">
                      <div className="quantity-stepper stepper-sm">
                        <button
                          type="button"
                          className="step-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span className="qty-number">{quantity}</span>
                        <button
                          type="button"
                          className="step-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-line-total">
                        {formatPrice(product.price * quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="coupon-box">
              {couponCode ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-info">
                    <span className="coupon-icon">🏷️</span>
                    <strong>{couponCode}</strong> ({discountRate * 100}% off)
                  </div>
                  <button
                    type="button"
                    className="coupon-remove-btn"
                    onClick={removeCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon-input-wrap">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. NOVA20)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-apply-btn">
                    Apply
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="drawer-summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-line discount-line">
                  <span>Promo Discount ({discountRate * 100}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-green">FREE</strong>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="summary-line total-line">
                <span>Estimated Total</span>
                <span className="total-amount">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              id="proceed-checkout-btn"
              type="button"
              className="btn btn-primary w-full checkout-trigger-btn"
              onClick={handleProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <span className="checkout-btn-arrow">→</span>
            </button>

            <p className="checkout-guarantee-note">
              🔒 Guaranteed safe checkout • Powered by 256-bit encryption
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
