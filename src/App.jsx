import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TrustBar } from './components/TrustBar';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <ShopProvider>
      <div className="app-layout">
        {/* Navigation & Announcement */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Showcase with Flash Deal Timer */}
          <HeroBanner />

          {/* Core Guarantees & Trust Elements */}
          <TrustBar />

          {/* Filter Bar & Category Controls */}
          <FilterBar />

          {/* Product Catalog Display */}
          <ProductGrid />
        </main>

        {/* Floating & Overlay Elements */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <CheckoutModal />
        <ToastNotification />

        {/* Footer with Newsletter */}
        <Footer />
      </div>
    </ShopProvider>
  );
}

export default App;
