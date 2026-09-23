import React from 'react';
import { useShop } from '../context/ShopContext';

export const Header = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    CURRENCIES
  } = useShop();

  return (
    <header className="header-wrapper">
      {/* Top Notification Announcement */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-badge">FLASH SALE</span>
          <span>Use code <strong>NOVA20</strong> for 20% off all flagship gear • Free express shipping on orders over $150</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="nav-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="logo-symbol">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="brand-name">NOVA</span>
            <span className="brand-sub">STUDIO</span>
          </a>

          {/* Search Box */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search premium headphones, watches, desks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Currency Selector */}
            <div className="currency-selector">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="currency-select"
                aria-label="Select Currency"
              >
                {Object.entries(CURRENCIES).map(([code, cur]) => (
                  <option key={code} value={code}>
                    {cur.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-trigger-btn"
              type="button"
              className="action-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="action-badge wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-trigger-btn"
              type="button"
              className="action-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="action-badge cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
