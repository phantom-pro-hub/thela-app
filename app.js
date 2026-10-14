/**
 * Thela App: Smart Basket Builder & Checkout Intervention
 * Interactive Working Prototype Logic
 * Bet #1: ₹199 Threshold Bridge & AOV Optimizer
 */

// 1. Comprehensive Dark-Store Catalog with Multi-Category Tags & Inventory Buffers
const CATALOG = [
  // --- MILK, BREAD, DAIRY & EGGS (Core Staples) ---
  {
    id: 'prod_milk',
    name: 'Nandini GoodLife Milk',
    brand: 'Nandini',
    category: 'dairy',
    weight: '500 ml',
    price: 28,
    mrp: 30,
    emoji: '🥛',
    stock: 45,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_bread', 'prod_biscuit', 'prod_rusk'],
    margin: 0.12
  },
  {
    id: 'prod_amul_milk',
    name: 'Amul Taaza Homogenised Toned Milk',
    brand: 'Amul',
    category: 'dairy',
    weight: '1 L',
    price: 54,
    mrp: 56,
    emoji: '🥛',
    stock: 30,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_bread', 'prod_brown_bread', 'prod_muesli'],
    margin: 0.14
  },
  {
    id: 'prod_bread',
    name: 'Britannia Whole Wheat Bread',
    brand: 'Britannia',
    category: 'bakery',
    weight: '400 g',
    price: 35,
    mrp: 40,
    emoji: '🍞',
    stock: 28,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_butter', 'prod_eggs', 'prod_milk'],
    margin: 0.15
  },
  {
    id: 'prod_brown_bread',
    name: 'English Oven 100% Whole Wheat Brown Bread',
    brand: 'English Oven',
    category: 'bakery',
    weight: '400 g',
    price: 45,
    mrp: 50,
    emoji: '🍞',
    stock: 24,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_butter', 'prod_eggs', 'prod_amul_milk'],
    margin: 0.18
  },
  {
    id: 'prod_white_bread',
    name: 'Modern Soft White Sliced Bread',
    brand: 'Modern',
    category: 'bakery',
    weight: '400 g',
    price: 30,
    mrp: 35,
    emoji: '🍞',
    stock: 20,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_butter', 'prod_milk'],
    margin: 0.15
  },
  {
    id: 'prod_pav_buns',
    name: 'Modern Soft Fresh Pav Buns',
    brand: 'Modern',
    category: 'bakery',
    weight: '6 units',
    price: 25,
    mrp: 30,
    emoji: '🥯',
    stock: 30,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_butter', 'prod_potato', 'prod_onion'],
    margin: 0.20
  },
  {
    id: 'prod_rusk',
    name: 'Britannia Toastea Premium Bake Rusk',
    brand: 'Britannia',
    category: 'bakery',
    weight: '200 g',
    price: 30,
    mrp: 35,
    emoji: '🥖',
    stock: 35,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_milk', 'prod_amul_milk'],
    margin: 0.22
  },
  {
    id: 'prod_eggs',
    name: 'Farm Fresh White Eggs (6 pcs)',
    brand: 'Eggoz',
    category: 'dairy',
    weight: '6 units',
    price: 55,
    mrp: 65,
    emoji: '🥚',
    stock: 22,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_bread', 'prod_butter', 'prod_brown_bread'],
    margin: 0.18
  },
  {
    id: 'prod_butter',
    name: 'Amul Salted Table Butter',
    brand: 'Amul',
    category: 'dairy',
    weight: '100 g',
    price: 48,
    mrp: 52,
    emoji: '🧈',
    stock: 19,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_bread', 'prod_biscuit', 'prod_pav_buns'],
    margin: 0.16
  },
  {
    id: 'prod_curd',
    name: 'Milky Mist Farm Fresh Curd',
    brand: 'Milky Mist',
    category: 'dairy',
    weight: '400 g',
    price: 32,
    mrp: 36,
    emoji: '🥣',
    stock: 35,
    isStaple: true,
    isMilkBread: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_tomato', 'prod_onion'],
    margin: 0.14
  },

  // --- FRESH VEGETABLES & PRODUCE ---
  {
    id: 'prod_tomato',
    name: 'Fresh Organically Grown Tomatoes',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '500 g',
    price: 39,
    mrp: 48,
    emoji: '🍅',
    stock: 32,
    isStaple: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_onion', 'prod_lemon', 'prod_chillies', 'prod_coriander'],
    margin: 0.22
  },
  {
    id: 'prod_onion',
    name: 'Fresh Red Onions (Dungdi)',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '1 kg',
    price: 66,
    mrp: 75,
    emoji: '🧅',
    stock: 40,
    isStaple: true,
    isPreviouslyBought: true,
    affinityWith: ['prod_tomato', 'prod_potato', 'prod_chillies'],
    margin: 0.20
  },
  {
    id: 'prod_potato',
    name: 'Fresh Mountain Potatoes (Aloo)',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '1 kg',
    price: 38,
    mrp: 45,
    emoji: '🥔',
    stock: 35,
    isStaple: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_onion', 'prod_tomato', 'prod_pav_buns'],
    margin: 0.22
  },
  {
    id: 'prod_chillies',
    name: 'Spicy Green Chillies (Hari Mirch)',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '100 g',
    price: 12,
    mrp: 18,
    emoji: '🌶️',
    stock: 25,
    isStaple: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_coriander', 'prod_lemon', 'prod_onion'],
    margin: 0.35
  },
  {
    id: 'prod_lemon',
    name: 'Fresh Juicy Lemons (Nimbu)',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '4 pcs',
    price: 24,
    mrp: 30,
    emoji: '🍋',
    stock: 26,
    isStaple: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_onion', 'prod_coriander', 'prod_chillies'],
    margin: 0.25
  },
  {
    id: 'prod_coriander',
    name: 'Fresh Coriander Bunch (Dhaniya)',
    brand: 'FarmFresh',
    category: 'produce',
    weight: '100 g',
    price: 15,
    mrp: 20,
    emoji: '🌿',
    stock: 18,
    isStaple: true,
    isPreviouslyBought: false,
    affinityWith: ['prod_tomato', 'prod_onion', 'prod_lemon'],
    margin: 0.30
  },

  // --- IMPULSE & HIGH-MARGIN CONSUMABLES ("Specials") ---
  {
    id: 'prod_biscuit',
    name: 'Taali Digestive High Fibre Biscuits',
    brand: 'Taali',
    category: 'snacks',
    weight: '100 g',
    price: 29,
    mrp: 35,
    emoji: '🍪',
    stock: 50,
    isStaple: false,
    isPreviouslyBought: false,
    affinityWith: ['prod_milk', 'prod_amul_milk'],
    isSpecial: true,
    margin: 0.35
  },
  {
    id: 'prod_chips',
    name: 'Lay\'s Gourmet Vintage Cheddar',
    brand: 'Lay\'s',
    category: 'snacks',
    weight: '55 g',
    price: 30,
    mrp: 30,
    emoji: '🍟',
    stock: 60,
    isStaple: false,
    isPreviouslyBought: false,
    affinityWith: [],
    isSpecial: true,
    margin: 0.38
  },
  {
    id: 'prod_choc',
    name: 'Melt Fruit & Nut Milk Chocolate',
    brand: 'MMMelt',
    category: 'snacks',
    weight: '30 g',
    price: 59,
    mrp: 79,
    emoji: '🍫',
    stock: 34,
    isStaple: false,
    isPreviouslyBought: false,
    affinityWith: [],
    isSpecial: true,
    margin: 0.40
  },
  {
    id: 'prod_bhujia',
    name: 'Haldiram Aloo Bhujia Namkeen',
    brand: 'Haldiram',
    category: 'snacks',
    weight: '150 g',
    price: 45,
    mrp: 50,
    emoji: '🥨',
    stock: 25,
    isStaple: false,
    isPreviouslyBought: false,
    affinityWith: ['prod_milk'],
    isSpecial: true,
    margin: 0.36
  },
  {
    id: 'prod_muesli',
    name: 'Yogabar OG Dark Chocolate Muesli',
    brand: 'Yogabar',
    category: 'snacks',
    weight: '400 g',
    price: 299,
    mrp: 400,
    emoji: '🥣',
    stock: 15,
    isStaple: false,
    isPreviouslyBought: false,
    affinityWith: ['prod_milk', 'prod_amul_milk'],
    isSpecial: true,
    margin: 0.30
  }
];

// App State
const state = {
  cart: {}, // { prod_id: quantity }
  currentScreen: 'checkout', // 'feed' | 'checkout' | 'success'
  userHistory: ['prod_bread', 'prod_eggs', 'prod_butter', 'prod_tomato', 'prod_onion'],
  activeFilter: 'all'
};

// 2. Core State Management & Cart Helpers
function getCartItemCount() {
  return Object.values(state.cart).reduce((sum, q) => sum + q, 0);
}

function getCartSubtotal() {
  let subtotal = 0;
  for (const [id, qty] of Object.entries(state.cart)) {
    const item = CATALOG.find(p => p.id === id);
    if (item) subtotal += item.price * qty;
  }
  return subtotal;
}

function addToCart(productId, qty = 1) {
  state.cart[productId] = (state.cart[productId] || 0) + qty;
  renderApp();
}

function updateCartQuantity(productId, delta) {
  if (!state.cart[productId]) return;
  state.cart[productId] += delta;
  if (state.cart[productId] <= 0) {
    delete state.cart[productId];
  }
  renderApp();
}

// 3. Multi-Section 1-Tap Fillers Generator
// Implements Two-Phase Value Layer: Price Sensitivity kicks in at cart >= ₹150
function getThreeFillerSections() {
  const cartSubtotal = getCartSubtotal();
  const threshold = 199;
  const deficit = Math.max(0, threshold - cartSubtotal);
  const currentCartIds = Object.keys(state.cart);
  const isPriceSensitive = (cartSubtotal >= 150 && cartSubtotal < 199);
  const isUnlocked = (cartSubtotal >= 199);

  // Eligible pool: stock >= 5 and item not currently in cart
  const eligibleItems = CATALOG.filter(item => {
    return item.stock >= 5 && !currentCartIds.includes(item.id);
  });

  // Base Pool 1: "For You" (Personalized past purchases & frequent orders; Cold-Start fallback to Popular Staples)
  let forYouPool = eligibleItems.filter(item => state.userHistory.includes(item.id) || item.isStaple);
  if (forYouPool.length < 5) {
    const additional = eligibleItems.filter(item => !forYouPool.some(p => p.id === item.id));
    forYouPool = [...forYouPool, ...additional];
  }

  // Base Pool 2: "You might also like" (Frequently bought together / Cart Basket Affinity)
  let affinityPool = eligibleItems.filter(item => {
    return currentCartIds.some(cartId => {
      const cartItem = CATALOG.find(p => p.id === cartId);
      return cartItem && cartItem.affinityWith && cartItem.affinityWith.includes(item.id);
    });
  });
  if (affinityPool.length < 5) {
    const additional = eligibleItems.filter(item => 
      !affinityPool.some(p => p.id === item.id) && (item.category === 'produce' || item.category === 'dairy' || item.category === 'bakery')
    );
    affinityPool = [...affinityPool, ...additional];
  }
  if (affinityPool.length < 5) {
    const remaining = eligibleItems.filter(item => !affinityPool.some(p => p.id === item.id));
    affinityPool = [...affinityPool, ...remaining];
  }

  // Base Pool 3: "Specials" (High-margin impulse items)
  let specialsPool = eligibleItems.filter(item => item.isSpecial || item.category === 'snacks');
  if (specialsPool.length < 5) {
    const additional = eligibleItems.filter(item => 
      !specialsPool.some(p => p.id === item.id) && (item.margin >= 0.20)
    );
    specialsPool = [...specialsPool, ...additional];
  }
  if (specialsPool.length < 5) {
    const remaining = eligibleItems.filter(item => !specialsPool.some(p => p.id === item.id));
    specialsPool = [...specialsPool, ...remaining];
  }

  // Two-Phase Value Layer Selector with Full Shelf Guarantee (Never Shrinks)
  function selectItemsForCarousel(pool, defaultBadge) {
    let candidates = [...pool];

    if (!isPriceSensitive || deficit === 0) {
      // Phase 1 (Cart < ₹150) OR Phase 3 (Cart >= ₹199):
      // Price sensitivity is OFF. Rank purely by category relevance & popularity.
      return candidates.slice(0, 5).map(item => ({
        ...item,
        isBridgeItem: false,
        customBadge: defaultBadge
      }));
    }

    // Phase 2: Price Sensitivity is ACTIVE (₹150 <= Cart < ₹199, Deficit 1 to 49)
    // Slot 1: Golden Bridge Item (Item whose price is >= deficit and closest to deficit)
    let bridgeCandidates = candidates.filter(item => item.price >= deficit);
    let bridgeItem = null;

    if (bridgeCandidates.length > 0) {
      // Sort by price ascending (closest to deficit from above)
      bridgeCandidates.sort((a, b) => (a.price - deficit) - (b.price - deficit));
      bridgeItem = bridgeCandidates[0];
    } else {
      // If no item is >= deficit, pick the highest priced item to bridge as much as possible
      candidates.sort((a, b) => b.price - a.price);
      bridgeItem = candidates[0];
    }

    // Remaining slots (Slots 2, 3, 4, 5): Top candidates excluding bridgeItem
    const remaining = candidates.filter(item => item.id !== bridgeItem.id);
    const regularItems = remaining.slice(0, 4).map(item => ({
      ...item,
      isBridgeItem: false,
      customBadge: defaultBadge
    }));

    return [
      {
        ...bridgeItem,
        isBridgeItem: true,
        customBadge: '⚡ Unlocks FREE Delivery'
      },
      ...regularItems
    ].slice(0, 5);
  }

  const forYouItems = selectItemsForCarousel(forYouPool, 'Habit Staple');
  const affinityItems = selectItemsForCarousel(affinityPool, 'Pairs Well');
  const specialsItems = selectItemsForCarousel(specialsPool, 'Special Deal');

  return [
    {
      id: 'for_you',
      title: 'For You',
      subtitle: isPriceSensitive ? 'Staples to bridge your free delivery threshold' : 'Personalised based on previous habits & staples',
      badgeClass: 'for-you',
      badgeLabel: 'Habit Staple',
      items: forYouItems
    },
    {
      id: 'affinity',
      title: 'You might also like',
      subtitle: isPriceSensitive ? 'Pairs well & completes your ₹199 basket' : 'Frequently bought together with your cart items',
      badgeClass: 'affinity',
      badgeLabel: 'Pairs Well',
      items: affinityItems
    },
    {
      id: 'specials',
      title: 'Specials',
      subtitle: isPriceSensitive ? 'Impulse treats to skip the ₹35 delivery fee' : 'High-margin quick treats & impulse bites',
      badgeClass: 'specials',
      badgeLabel: 'Special Deal',
      items: specialsItems
    }
  ];
}

// 4. UI Rendering Functions

// FLOW 1: Bottom Floating Cart Bar (ONLY on Feed during browsing; never on Checkout)
function renderFloatingCartBar() {
  const floatingBar = document.getElementById('floatingCartBar');
  if (!floatingBar) return;

  const count = getCartItemCount();
  const subtotal = getCartSubtotal();
  const threshold = 199;
  const deficit = Math.max(0, threshold - subtotal);
  const isUnlocked = subtotal >= threshold;

  // Single progress bar at the bottom: visible ONLY on feed when cart has items
  if (count === 0 || state.currentScreen !== 'feed') {
    floatingBar.style.display = 'none';
    return;
  }

  floatingBar.style.display = 'flex';
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (isUnlocked) {
    floatingBar.innerHTML = `
      <div class="floating-cart-info">
        <div class="floating-cart-status" style="color: var(--accent-green);">
          <span>🎉</span> FREE delivery unlocked!
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: 100%; background: var(--accent-green);"></div>
        </div>
      </div>
      <button class="floating-view-cart-btn" onclick="navigateTo('checkout')">
        <span>Cart</span>
        <span class="floating-badge-val">${count}</span>
        <span>→</span>
      </button>
    `;
  } else {
    floatingBar.innerHTML = `
      <div class="floating-cart-info">
        <div class="floating-cart-status">
          <span>⚡</span> ₹${deficit} away from FREE delivery (Save ₹35)
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
      <button class="floating-view-cart-btn" onclick="navigateTo('checkout')">
        <span>Cart</span>
        <span class="floating-badge-val">${count}</span>
        <span>→</span>
      </button>
    `;
  }
}

// Home Feed Products Shelf with Category Support for "Milk & Bread"
function renderProductsShelf() {
  const shelf = document.getElementById('productsGrid');
  const titleSpan = document.getElementById('shelfTitleText');
  if (!shelf) return;

  let items = CATALOG;
  if (state.activeFilter === 'milk_bread') {
    // Richness requirement: Milk & Bread displays milk, breads, buns, rusk, butter, curd, eggs
    items = CATALOG.filter(item => 
      item.category === 'dairy' || item.category === 'bakery' || item.isMilkBread === true
    );
    if (titleSpan) titleSpan.textContent = 'Milk & Bread Daily Essentials';
  } else if (state.activeFilter === 'dairy') {
    items = CATALOG.filter(item => item.category === 'dairy');
    if (titleSpan) titleSpan.textContent = 'Dairy & Eggs';
  } else if (state.activeFilter === 'produce') {
    items = CATALOG.filter(item => item.category === 'produce');
    if (titleSpan) titleSpan.textContent = 'Fresh Vegetables & Produce';
  } else if (state.activeFilter === 'snacks') {
    items = CATALOG.filter(item => item.category === 'snacks');
    if (titleSpan) titleSpan.textContent = 'Snacks & Quick Bites';
  } else {
    if (titleSpan) titleSpan.textContent = 'Popular Groceries';
  }

  shelf.innerHTML = items.map(product => {
    const qty = state.cart[product.id] || 0;
    const isBoughtEarlier = state.userHistory.includes(product.id);
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

    return `
      <div class="product-card">
        <div class="card-img-wrap">
          <span class="prod-emoji">${product.emoji}</span>
          ${isBoughtEarlier ? `<span class="bought-earlier-tag">Bought Earlier</span>` : ''}
          ${discount > 5 ? `<span class="discount-tag">${discount}% OFF</span>` : ''}
        </div>
        <span class="prod-brand">${product.brand}</span>
        <h4 class="prod-title">${product.name}</h4>
        <span class="prod-weight">${product.weight}</span>
        <div class="prod-footer">
          <div class="price-box">
            <span class="price-current">₹${product.price}</span>
            <span class="price-mrp">₹${product.mrp}</span>
          </div>
          ${qty === 0 ? `
            <button class="add-btn" onclick="addToCart('${product.id}')">+ ADD</button>
          ` : `
            <div class="qty-stepper">
              <button class="stepper-btn" onclick="updateCartQuantity('${product.id}', -1)">−</button>
              <span class="stepper-val">${qty}</span>
              <button class="stepper-btn" onclick="updateCartQuantity('${product.id}', 1)">+</button>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Screen 2: Checkout Screen with 3 Stacked Carousels & Delivery Fee Row Guidance
function renderCheckoutScreen() {
  const itemsContainer = document.getElementById('checkoutItemsContainer');
  const fillersStackContainer = document.getElementById('fillersStackContainer');
  const billContainer = document.getElementById('checkoutBillContainer');
  const stickyTotal = document.getElementById('checkoutStickyTotal');
  const itemCountTag = document.getElementById('checkoutItemCountTag');

  if (!itemsContainer || !fillersStackContainer || !billContainer) return;

  const cartEntries = Object.entries(state.cart);
  const totalCount = getCartItemCount();
  const subtotal = getCartSubtotal();
  const threshold = 199;
  const isFreeDelivery = subtotal >= threshold;
  const deficit = Math.max(0, threshold - subtotal);
  const deliveryFee = isFreeDelivery ? 0 : 35;
  const handlingFee = 5;
  const grandTotal = subtotal + deliveryFee + handlingFee;

  if (itemCountTag) {
    itemCountTag.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  }

  // 1. Render Cart Items List
  if (cartEntries.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 24px 0; color: var(--text-secondary);">
        <p style="font-size: 32px; margin-bottom: 8px;">🛒</p>
        <p style="font-size: 14px; font-weight: 700;">Your cart is empty</p>
        <p style="font-size: 12px; margin-top: 4px;">Add items to build your 15-min delivery order!</p>
        <button class="add-btn" style="margin: 16px auto 0;" onclick="navigateTo('feed')">Browse Groceries</button>
      </div>
    `;
  } else {
    itemsContainer.innerHTML = cartEntries.map(([id, qty]) => {
      const item = CATALOG.find(p => p.id === id);
      if (!item) return '';
      return `
        <div class="cart-item-row">
          <div class="item-left">
            <div class="item-thumb">${item.emoji}</div>
            <div class="item-meta">
              <h5>${item.name}</h5>
              <span>${item.weight} • ₹${item.price} each</span>
            </div>
          </div>
          <div class="item-right">
            <div class="qty-stepper">
              <button class="stepper-btn" onclick="updateCartQuantity('${item.id}', -1)">−</button>
              <span class="stepper-val">${qty}</span>
              <button class="stepper-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
            </div>
            <span class="item-price">₹${item.price * qty}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Render FLOW 2: Three Stacked 1-Tap Fillers Micro-Carousels (Option B)
  const sections = getThreeFillerSections();
  fillersStackContainer.innerHTML = sections.map(sec => {
    if (sec.items.length === 0) return '';
    return `
      <div class="filler-subgroup ${sec.badgeClass}">
        <div class="filler-subgroup-header">
          <div class="filler-subgroup-title">
            <span>✨</span> ${sec.title}
          </div>
          <div class="filler-subgroup-subtitle">${sec.subtitle}</div>
        </div>
        <div class="fillers-carousel">
          ${sec.items.map(product => `
            <div class="filler-card ${product.isBridgeItem ? 'bridge-card' : ''}">
              <span class="filler-badge ${product.isBridgeItem ? 'bridge-badge' : ''}">${product.customBadge || sec.badgeLabel}</span>
              <div class="filler-img">
                <span>${product.emoji}</span>
                <button class="filler-add-btn" title="1-Tap Add" onclick="addToCart('${product.id}')">+</button>
              </div>
              <h5 class="filler-name">${product.name}</h5>
              <span class="filler-weight">${product.weight}</span>
              <span class="filler-price">₹${product.price}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  // 3. Render Bill Summary with Inline Delivery Fee Guidance
  billContainer.innerHTML = `
    <div class="bill-row">
      <span>Items Total</span>
      <span style="font-weight: 700;">₹${subtotal}</span>
    </div>
    
    <div class="bill-row delivery-row">
      <div class="delivery-label-col">
        <span>Delivery Fee</span>
        ${!isFreeDelivery && deficit > 0 ? `
          <span class="delivery-hint-text">Add items worth ₹${deficit} to avail free delivery</span>
        ` : ''}
      </div>
      <div>
        ${isFreeDelivery ? `
          <span class="fee-waived"><span class="fee-original">₹35</span> FREE</span>
        ` : `
          <strong style="color: #DC2626;">₹35</strong>
        `}
      </div>
    </div>

    <div class="bill-row">
      <span>Dark Store Handling & Packaging</span>
      <span>₹${handlingFee}</span>
    </div>

    <div class="bill-row grand-total">
      <span>To Pay</span>
      <span>₹${grandTotal}</span>
    </div>

    ${isFreeDelivery ? `
      <div class="savings-pill">
        <span>🎉</span> You saved ₹35 on delivery fees!
      </div>
    ` : ''}
  `;

  // 4. Update Docked Checkout Bar
  const checkoutBar = document.getElementById('checkoutStickyBar');
  if (checkoutBar) {
    checkoutBar.style.display = (state.currentScreen === 'checkout') ? 'flex' : 'none';
  }
  if (stickyTotal) {
    stickyTotal.textContent = `₹${grandTotal}`;
  }
}

// Helper: Smooth scroll to bill summary
function scrollToBillDetails() {
  const billCard = document.querySelector('.bill-card');
  if (billCard) {
    billCard.scrollIntoView({ behavior: 'smooth' });
  }
}

// 5. Global Render
function renderApp() {
  const subtotal = getCartSubtotal();
  const threshold = 199;
  const deficit = Math.max(0, threshold - subtotal);
  const count = getCartItemCount();

  // Update Left PM Sidebar live metrics
  const pmCartVal = document.getElementById('pmSidebarCartVal');
  if (pmCartVal) {
    if (subtotal >= threshold) {
      pmCartVal.innerHTML = `<span style="color: #10B981;">₹${subtotal} (FREE Delivery Unlocked 🎉)</span>`;
    } else {
      pmCartVal.innerHTML = `₹${subtotal} <span style="color: #F59E0B; font-weight: normal;">(Deficit: ₹${deficit})</span>`;
    }
  }

  // Update Header Cart Badge Dot
  const headerCartBadge = document.getElementById('headerCartBadge');
  if (headerCartBadge) {
    headerCartBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // Update floating bar on browsing feed
  renderFloatingCartBar();

  // Update active screen components
  if (state.currentScreen === 'feed') {
    renderProductsShelf();
  } else if (state.currentScreen === 'checkout') {
    renderCheckoutScreen();
  }
}

// 6. Navigation & View Toggles
function navigateTo(screenId) {
  state.currentScreen = screenId;
  document.querySelectorAll('.view-screen').forEach(el => el.classList.remove('active'));

  const checkoutBar = document.getElementById('checkoutStickyBar');

  if (screenId === 'feed') {
    document.getElementById('screenFeed').classList.add('active');
    document.getElementById('appHeaderBack').style.display = 'none';
    if (checkoutBar) checkoutBar.style.display = 'none';
  } else if (screenId === 'checkout') {
    document.getElementById('screenCheckout').classList.add('active');
    document.getElementById('appHeaderBack').style.display = 'flex';
    if (checkoutBar) checkoutBar.style.display = 'flex';
  } else if (screenId === 'success') {
    document.getElementById('screenSuccess').classList.add('active');
    document.getElementById('appHeaderBack').style.display = 'none';
    if (checkoutBar) checkoutBar.style.display = 'none';
    renderOrderSuccess();
  }

  renderApp();
  const viewport = document.querySelector('.app-viewport');
  if (viewport) {
    viewport.scrollTop = 0;
  }
}

function renderOrderSuccess() {
  const container = document.getElementById('orderSummaryBox');
  if (!container) return;

  const subtotal = getCartSubtotal();
  const isFreeDelivery = subtotal >= 199;
  const count = getCartItemCount();

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: var(--text-secondary);">Items Ordered:</span>
      <strong>${count} items</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: var(--text-secondary);">Basket Value:</span>
      <strong>₹${subtotal}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
      <span style="color: var(--text-secondary);">Delivery Fee:</span>
      <strong>${isFreeDelivery ? '₹0 (Free Delivery Unlocked)' : '₹35'}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1px dashed #D1D5DB;">
      <span>Contribution Margin:</span>
      <strong style="color: var(--accent-green);">Healthy (+₹8.20)</strong>
    </div>
  `;
}

// 7. Default 1 State: ₹145 Essentials Cart (Bread + 2 Eggs)
function resetToDefault() {
  state.cart = {
    prod_bread: 1, // ₹35
    prod_eggs: 2   // ₹55 x 2 = ₹110 -> Total ₹145
  };
  navigateTo('checkout');
}

// 8. Event Listeners & Initial Load
document.addEventListener('DOMContentLoaded', () => {
  // Setup category pill filters on home feed
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-cat') || 'all';
      renderProductsShelf();
    });
  });

  // Default initial load: Opens directly with Default 1 (₹145 cart on Checkout)
  resetToDefault();
});
