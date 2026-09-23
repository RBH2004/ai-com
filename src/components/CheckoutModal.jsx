import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    discountAmount,
    shippingFee,
    clearCart,
    formatPrice,
    addToast
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    paymentMethod: 'card', // 'card', 'applepay', 'paypal'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = 'NOV-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrder);
      setStep(3);
      clearCart();
      addToast('Order Placed Successfully!', `Order ${randomOrder} is confirmed.`, 'success');
    }, 1200);
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="modal-backdrop" onClick={() => !isProcessing && setIsCheckoutOpen(false)}>
      <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-step-indicator">
            <span className={`step-dot ${step >= 1 ? 'active' : ''}`}>1. Shipping</span>
            <span className="step-divider">›</span>
            <span className={`step-dot ${step >= 2 ? 'active' : ''}`}>2. Payment</span>
            <span className="step-divider">›</span>
            <span className={`step-dot ${step === 3 ? 'active' : ''}`}>3. Complete</span>
          </div>

          {step !== 3 && (
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close checkout"
            >
              ✕
            </button>
          )}
        </div>

        {/* STEP 1: Shipping Details */}
        {step === 1 && (
          <form onSubmit={handleShippingSubmit} className="checkout-form-step">
            <div className="step-title-wrap">
              <h3 className="checkout-heading">Shipping Address</h3>
              <p className="checkout-sub">Enter where your NOVA devices should be dispatched.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div className="form-group full-width">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="name@company.com"
                />
              </div>

              <div className="form-group full-width">
                <label className="input-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="123 Innovation Parkway"
                />
              </div>

              <div className="form-group">
                <label className="input-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="input-label">State / Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group full-width">
                <label className="input-label">Postal / ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="checkout-action-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCheckoutOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Continue to Payment →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Details */}
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="checkout-form-step">
            <div className="step-title-wrap">
              <h3 className="checkout-heading">Payment Method</h3>
              <p className="checkout-sub">Total amount to charge: <strong>{formatPrice(cartTotal)}</strong></p>
            </div>

            {/* Payment method switcher */}
            <div className="payment-methods-selector">
              <label className={`payment-method-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                <span className="method-title">Credit / Debit Card</span>
                <span className="card-icons">💳 Visa / Master</span>
              </label>

              <label className={`payment-method-card ${formData.paymentMethod === 'applepay' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="applepay"
                  checked={formData.paymentMethod === 'applepay'}
                  onChange={handleInputChange}
                />
                <span className="method-title">Apple Pay / Google Pay</span>
                <span className="card-icons">⚡ 1-Tap</span>
              </label>

              <label className={`payment-method-card ${formData.paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <span className="method-title">PayPal</span>
                <span className="card-icons">🅿️ Express</span>
              </label>
            </div>

            {/* Mock Card Form */}
            {formData.paymentMethod === 'card' && (
              <div className="card-inputs-grid">
                <div className="form-group full-width">
                  <label className="input-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExp"
                    value={formData.cardExp}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">CVC / Security Code</label>
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Quick summary line */}
            <div className="checkout-mini-summary">
              <div className="mini-summary-row">
                <span>Deliver to:</span>
                <strong>{formData.fullName} ({formData.city}, {formData.zip})</strong>
              </div>
              <div className="mini-summary-row">
                <span>Total Due:</span>
                <strong className="text-glow">{formatPrice(cartTotal)}</strong>
              </div>
            </div>

            <div className="checkout-action-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
                disabled={isProcessing}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Secure Payment...' : `Confirm & Pay ${formatPrice(cartTotal)}`}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Placed Celebration */}
        {step === 3 && (
          <div className="checkout-success-view">
            <div className="success-icon-badge">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h2 className="success-heading">Order Confirmed!</h2>
            <p className="success-sub">
              Thank you, <strong>{formData.fullName}</strong>. Your order has been placed and our logistics team has commenced precision packaging.
            </p>

            <div className="order-receipt-card">
              <div className="receipt-row">
                <span>Order Reference:</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Confirmation Sent To:</span>
                <span>{formData.email}</span>
              </div>
              <div className="receipt-row">
                <span>Estimated Delivery:</span>
                <span>3 - 5 Business Days (Express)</span>
              </div>
              <div className="receipt-row">
                <span>Destination:</span>
                <span>{formData.address}, {formData.city}, {formData.zip}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleFinish}
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
