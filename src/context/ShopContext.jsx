import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, PROMO_CODES } from '../data/products';

const ShopContext = createContext();

const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' }
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1 }];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1].id];
    } catch {
      return [PRODUCTS[1].id];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code
  const [couponCode, setCouponCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  // Currency
  const [currency, setCurrency] = useState('USD');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [wishlist]);

  const addToast = (title, message = '', type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added to Cart`, `${product.name} (x${quantity}) added.`, 'cart');
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      addToast('Removed from Cart', `${item.product.name} removed.`, 'info');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountRate(0);
    setCouponCode('');
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed.`, 'info');
    } else {
      setWishlist(prev => [...prev, product.id]);
      addToast('Saved to Wishlist', `${product.name} added to your favorites.`, 'heart');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Promo code
  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted]) {
      setDiscountRate(PROMO_CODES[formatted]);
      setCouponCode(formatted);
      addToast('Promo Code Applied!', `${PROMO_CODES[formatted] * 100}% off your order.`, 'discount');
      return { success: true };
    } else {
      addToast('Invalid Code', 'Try using code "NOVA20" for 20% off.', 'error');
      return { success: false };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountRate(0);
    addToast('Coupon Removed', 'Discount removed from total.', 'info');
  };

  // Price formatting
  const formatPrice = (usdAmount) => {
    const current = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = usdAmount * current.rate;
    return `${current.symbol}${converted.toFixed(2)}`;
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = cartSubtotal * discountRate;
  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered & Sorted Products
  const filteredProducts = PRODUCTS.filter(prod => {
    if (selectedCategory !== 'All Products' && prod.category !== selectedCategory) {
      return false;
    }
    if (prod.price > priceRange) {
      return false;
    }
    if (minRating > 0 && prod.rating < minRating) {
      return false;
    }
    if (onlyInStock && !prod.inStock) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchTag = prod.tagline.toLowerCase().includes(q);
      const matchCat = prod.category.toLowerCase().includes(q);
      return matchName || matchTag || matchCat;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
    return 0; // featured default
  });

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        CURRENCIES,
        cart,
        cartCount,
        cartSubtotal,
        cartTotal,
        shippingFee,
        discountAmount,
        discountRate,
        couponCode,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        searchQuery,
        setSearchQuery,
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
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        addToast,
        removeToast,
        filteredProducts
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
