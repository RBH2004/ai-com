export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aether Pro ANC Headphones',
    tagline: 'Pure lossless acoustics with adaptive ambient cancellation',
    category: 'Audio',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 328,
    badge: 'Best Seller',
    inStock: true,
    stockLeft: 7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for audio purists. The Aether Pro delivers studio-grade 40mm titanium drivers, 45-hour battery life, and spatial audio calibration tailored to your ear geometry.',
    specs: {
      'Battery Life': 'Up to 45 Hours',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Hi-Res',
      'Noise Cancelling': 'Hybrid Adaptive ANC (up to 42dB)',
      'Weight': '248g'
    }
  },
  {
    id: 'prod-2',
    name: 'Horizon Chrono Smartwatch',
    tagline: 'Titanium chassis with sapphire crystal & always-on AMOLED',
    category: 'Wearables',
    price: 279,
    originalPrice: 320,
    rating: 4.8,
    reviewCount: 194,
    badge: 'Popular',
    inStock: true,
    stockLeft: 12,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision forged aerospace titanium casing with biometric sensors tracking HRV, VO2 Max, ECG, and sleep staging with 14 days standby.',
    specs: {
      'Display': '1.43" Ultra-Retina AMOLED',
      'Water Resistance': '5ATM / 50 Meters',
      'Materials': 'Grade 5 Titanium & Sapphire',
      'Battery': '14-Day Battery Life'
    }
  },
  {
    id: 'prod-3',
    name: 'Lumina Minimalist Desk Lamp',
    tagline: 'Glare-free magnetic counterbalanced warm LED light',
    category: 'Workspace',
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewCount: 88,
    badge: 'New',
    inStock: true,
    stockLeft: 15,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A sculptural addition to any creative workspace. Touch-sensitive dimming with 98+ CRI natural daylight spectrum to reduce eye strain during deep focus sessions.',
    specs: {
      'Color Temperature': '2700K - 6500K Stepless',
      'CRI Rating': 'Ra ≥ 98',
      'Power Source': 'USB-C PD 30W',
      'Base Material': 'Anodized Matte Aluminum'
    }
  },
  {
    id: 'prod-4',
    name: 'Vortex Mechanical Keyset 75%',
    tagline: 'Gasket-mounted pre-lubed silent switches with brass weight',
    category: 'Workspace',
    price: 189,
    originalPrice: 219,
    rating: 4.9,
    reviewCount: 412,
    badge: 'Staff Pick',
    inStock: true,
    stockLeft: 4,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Delightful thock acoustics with triple-layer sound dampening foam, hot-swappable sockets, PBT dye-sub keycaps, and customizable per-key RGB backlighting.',
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Linear Lubricated Milky Yellows',
      'Connectivity': 'Tri-mode (2.4G / BT / Type-C)',
      'Plate': 'Polycarbonate with Flex Cuts'
    }
  },
  {
    id: 'prod-5',
    name: 'Nomad Carbon Sling Bag',
    tagline: 'Weatherproof Cordura fabric with magnetic Fidlock buckle',
    category: 'Lifestyle',
    price: 89,
    originalPrice: 110,
    rating: 4.6,
    reviewCount: 167,
    badge: 'Trending',
    inStock: true,
    stockLeft: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed for city explorers and digital nomads. Expandable 4.5L capacity, dedicated tablet sleeve, RFID-blocking passport slot, and self-locking YKK zippers.',
    specs: {
      'Capacity': 'Expandable 2.5L - 5L',
      'Material': '500D Recycled Cordura & Hypalon',
      'Zippers': 'Waterproof YKK AquaGuard',
      'Weight': '360g'
    }
  },
  {
    id: 'prod-6',
    name: 'Pulse Soundbar 360 Spatial',
    tagline: 'Compact high-output desktop acoustic beamforming soundbar',
    category: 'Audio',
    price: 219,
    originalPrice: 269,
    rating: 4.8,
    reviewCount: 95,
    badge: '20% OFF',
    inStock: true,
    stockLeft: 8,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immersive cinematic audio directly underneath your monitor. Integrated dual subwoofers, quad neodymium tweeters, and custom DSP sound modes for gaming and music.',
    specs: {
      'Total Output': '80W Peak RMS',
      'Drivers': '2x Subwoofers + 4x Full-Range',
      'Inputs': 'Optical / HDMI eARC / BT 5.2 / Aux',
      'Dimensions': '520 x 70 x 85 mm'
    }
  },
  {
    id: 'prod-7',
    name: 'Omni MagCharge 3-in-1 Station',
    tagline: 'Fast wireless charging foldout for iPhone, Watch & AirPods',
    category: 'Accessories',
    price: 99,
    originalPrice: 120,
    rating: 4.7,
    reviewCount: 241,
    badge: 'Essential',
    inStock: true,
    stockLeft: 18,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Streamline your nightstand or workspace. Machined aluminum stand delivers 15W Qi2 certified wireless charging with strong N52 neodymium magnetic alignment.',
    specs: {
      'Phone Output': '15W MagSafe Fast Charge',
      'Watch Output': '5W Fast Charge Module',
      'Earbuds Output': '5W Qi Pad',
      'Finish': 'Space Gray Matte Anodized'
    }
  },
  {
    id: 'prod-8',
    name: 'Apex Precision Wireless Mouse',
    tagline: 'Ultralight 49g ergonomic gaming & creative mouse with 8K polling',
    category: 'Workspace',
    price: 119,
    originalPrice: 140,
    rating: 4.9,
    reviewCount: 153,
    badge: 'Popular',
    inStock: true,
    stockLeft: 11,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Zero latency Nordic 52840 MCU with 8000Hz polling rate and PAW3395 optical sensor. Ergonomic sculpt crafted for all-day comfort and pinpoint cursor accuracy.',
    specs: {
      'Sensor': 'PAW3395 26,000 DPI Optical',
      'Polling Rate': 'Up to 8,000Hz True Wireless',
      'Battery': '80 Hours continuous play',
      'Weight': '49 grams ultra-light'
    }
  }
];

export const CATEGORIES = [
  'All Products',
  'Audio',
  'Wearables',
  'Workspace',
  'Lifestyle',
  'Accessories'
];

export const PROMO_CODES = {
  'NOVA20': 0.20,
  'WELCOME10': 0.10,
  'FLASH50': 0.50
};
