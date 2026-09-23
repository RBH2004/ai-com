import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

export const HeroBanner = () => {
  const { setQuickViewProduct, addToCart, PRODUCTS, formatPrice } = useShop();
  const featuredHeroProduct = PRODUCTS[0]; // Aether Pro ANC Headphones

  // Flash deal countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headline and CTAs */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-sparkle">✨</span> 2026 FLAGSHIP RELEASE
          </div>
          <h1 className="hero-title">
            Engineering Pure <span className="gradient-text">Acoustic & Spatial</span> Perfection.
          </h1>
          <p className="hero-description">
            Discover a curated collection of ultra-precision audio, titanium wearables, and minimalist workspace gear engineered for creators and pioneers.
          </p>

          <div className="hero-cta-group">
            <button
              id="hero-explore-btn"
              type="button"
              className="btn btn-primary"
              onClick={scrollToCatalog}
            >
              Explore Collection
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button
              id="hero-quickview-btn"
              type="button"
              className="btn btn-secondary"
              onClick={() => setQuickViewProduct(featuredHeroProduct)}
            >
              Quick Specs
            </button>
          </div>

          {/* Flash Deal Countdown */}
          <div className="flash-timer-box">
            <div className="flash-timer-label">
              <span className="live-indicator"></span>
              <strong>Flash Deal Event Ends In:</strong>
            </div>
            <div className="timer-digits">
              <div className="timer-unit">
                <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-sub">HRS</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-unit">
                <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-sub">MIN</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-unit">
                <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timer-sub">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Showcase Card */}
        <div className="hero-visual">
          <div className="hero-card-glow"></div>
          <div className="hero-product-card">
            <div className="hero-product-badge">SPOTLIGHT DEAL</div>
            <div className="hero-img-container">
              <img
                src={featuredHeroProduct.image}
                alt={featuredHeroProduct.name}
                className="hero-product-img"
              />
            </div>
            <div className="hero-card-details">
              <div className="hero-card-header">
                <div>
                  <h3 className="hero-card-title">{featuredHeroProduct.name}</h3>
                  <p className="hero-card-sub">{featuredHeroProduct.tagline}</p>
                </div>
                <div className="hero-card-pricing">
                  <span className="hero-card-curr">{formatPrice(featuredHeroProduct.price)}</span>
                  <span className="hero-card-orig">{formatPrice(featuredHeroProduct.originalPrice)}</span>
                </div>
              </div>

              <div className="hero-card-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => addToCart(featuredHeroProduct, 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
