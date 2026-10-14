# Thela: Smart Basket Builder & Checkout Intervention Prototype

> **Senior Product Manager Take-Home Assignment (AirLearn)**  
> **Bet #1 Working Prototype:** Eliminating the ₹199 Delivery Fee Retention Cliff  
> **GitHub Ready:** Self-contained, zero-dependency, runnable web application with automated test suite.

---

## 📌 Executive Context & Problem Solved
On 1 July 2026, Thela raised its free-delivery threshold from ₹99 to ₹199 (instituting a flat ₹35 fee below it). While turning unit contribution margin positive (+₹8.9/order), it created an abandonment cliff for sub-₹199 carts:
* **Checkout conversion for carts <₹199 collapsed from 78.9% to 61.1% (-17.1 pp)**.
* **Over 3.3 lakh monthly orders** are abandoned because users perceive a ₹35 fee on ₹110–₹150 essentials baskets as an unfair "dead tax".
* **Small-basket Day-28 (W4) retention collapsed by -12.5 pp** (from 31.1% to 18.6%).

**The Solution:** Rather than rolling back the threshold and destroying company profitability, **Bet #1 (Smart Basket Builder & Checkout Intervention)** bridges the deficit profitably. By presenting real-time threshold progress gamification during browsing and instant 1-tap staple fillers on the checkout screen, users get tangible groceries (milk, bread, butter) instead of paying a dead fee.

---

## 🚀 How to Run the Prototype

### Option 1: Direct File Open (Easiest)
1. Double-click `index.html` or drag it into any web browser (Google Chrome, Safari, Firefox, Edge).
2. No Node.js, npm, or build step required!

### Option 2: Local HTTP Server
Run from the `Thela App` directory:
```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option 3: Run Automated Test Suite (TDD Verification)
Run the 14 automated unit tests directly via Python:
```bash
python3 test_suite.py -v
```
All tests verify catalog integrity, deficit matching algorithm, cold-start fallback, fee calculations, and single-screen CSS constraints.

---

## 🎨 UI Architecture & Studio Design (Single-Screen, Zero Double-Scroll)

* **Left PM Studio Sidebar:** An executive product dashboard on the left side of the screen displaying:
  * AirLearn Take-Home Project Badge
  * Live experiment metrics (Target: +18% conversion lift; Guardrail: CM > +₹5.00/order; Threshold: ₹199)
  * Live Cart Tracker updating dynamically with active deficit & free delivery status
  * Screen navigation buttons (Checkout Cart, Home Browsing Feed, Order Confirmed)
  * Primary **"🔄 Reset to Default 1 (₹145 Cart)"** action button
* **Single-Screen Layout (Zero Double-Scroll):**
  * The outer browser window enforces `overflow: hidden` and `height: 100vh`. Evaluators never need to scroll the webpage.
  * Scrolling is strictly confined within the mobile phone's internal viewport (`.app-viewport`), replicating an authentic iOS / Android quick-commerce experience.
* **Docked Checkout Bar:** The "Proceed to Pay" action bar stays pinned and docked at the bottom of the device frame, never floating awkwardly over product cards.
* **Clean Visuals:** Zero decorative bunting triangles or amateur clutter; authentic Indian quick-commerce emerald branding (#024731, #0E8345).

---

## 📱 Key Features & User Flows (As Specified in `spec.md`)

### 1. Flow 1: Real-Time Dynamic Progress Bar & Inline Delivery Fee Guidance
* **Browsing State (Home & Shelves):** A single persistent floating progress bar sits at the bottom of the screen above the navigation bar once items are in cart ($>₹0$ and $<₹199$).
  * Copy: *"⚡ ₹{deficit} away from FREE delivery (Save ₹35)"* with live green progress fill and a 1-tap cart pill button.
* **Checkout Page (Bill Details Inline Guidance):** To eliminate visual clutter and redundant bars, the top progress bar does **not** appear on the Checkout Page.
  * Instead, guidance is embedded directly within the Delivery Fee row in the Bill Details:
    * When cart is $<₹199$: Delivery fee row shows **₹35** with adjacent helper text: *"Add items worth ₹{deficit} to avail free delivery"*.
    * When cart reaches $\ge$₹199: The helper text disappears, and the fee strikes through to **~~₹35~~ FREE** in positive green text.

### 2. Flow 2: Three Stacked 1-Tap Filler Micro-Carousels & Two-Phase Value Layer (Checkout Screen)
Positioned on the **Checkout Page**, directly beneath the cart items list and above the bill summary:
1. **"For You" Micro-Carousel:** Personalized based on previous purchase history and frequent repeat orders.
   * *Cold-Start Guardrail:* For first-time users on Order #1 with zero history, this automatically defaults to citywide high-velocity daily staples (Milk, Bread, Curd, Eggs).
2. **"You might also like" Micro-Carousel:** Dynamic cart basket affinity recommendations (items frequently bought together with the specific SKUs currently in the cart, e.g., Butter when Bread is present).
3. **"Specials" Micro-Carousel:** Merchandised with high-margin impulse consumables (chips, premium chocolates, biscuits, cold beverages; margin $\ge 30\%$).

#### Algorithmic Engine & Two-Phase Value Layer:
* **Phase 1: Sub-₹150 Cart Value (`Cart < ₹150` — Natural Basket Building):**
  * *Price Sensitivity is OFF:* Promotes habitual and complementary groceries without restricting to a narrow deficit window.
  * *Full Shelf Guarantee:* Every carousel always returns **4 to 5 items**, eliminating awkward single-card shrinking.
* **Phase 2: ₹150 to ₹198 Cart Value (`₹150 ≤ Cart < ₹199` — Threshold Closer Mode):**
  * *Price Sensitivity is ACTIVE:* At ₹150+, the user is within striking distance of free delivery.
  * *Slot 1 (Golden Bridge Item):* The #1 card dynamically computes the exact item whose price bridges the remaining deficit in a single tap (closest item where $\text{Price} \ge \text{Deficit}$), highlighted with an emerald badge: *"⚡ Unlocks FREE Delivery"*.
  * *Slots 2–5:* High-relevance category backups ensuring the carousel remains full of varied options.
* **Phase 3: Threshold Achieved (`Cart ≥ ₹199` — Last-Minute Treats):**
  * Delivery fee strikes out to `~~₹35~~ FREE`, and carousels provide routine top-ups and impulse munchies.
* **Real-Time Reactive Refresh:** Any cart change (adding, incrementing `+`, decrementing `-`, or removing items) triggers instant algorithmic re-ranking and re-evaluates the bridge item.

---

## 🛠️ Evaluator Experience & Reset Button

* **Default 1 Starting State:** The prototype automatically loads on the Checkout Page with a pre-loaded **₹145 essentials cart** (1 Bread ₹35 + 2 Farm Fresh Eggs ₹110 = ₹145; Deficit: ₹54; Delivery Fee: ₹35). Evaluators can immediately test 1-tap additions to see the delivery fee waive from ₹35 to FREE.
* **Reset Button:** Clicking **"🔄 Reset to Default 1 (₹145 Cart)"** in the left sidebar restores this exact ₹145 baseline cart at any time.

---

## 📂 File Structure

```
Thela App/
├── index.html            # Main application entry point & mobile device simulation
├── styles.css            # Studio-quality CSS (Single-screen layout, Left PM sidebar, docked bar)
├── app.js                # State management, 3-tier recommendation engine, & Default 1 cart
├── test_suite.py         # 14 automated unit tests verifying functionality & design constraints
├── sample_references/    # Bundled reference screenshots from user research
└── README.md             # Project documentation & evaluator guide
```
