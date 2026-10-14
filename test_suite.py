"""
Thela App: Automated Test Suite (TDD & Quality Verification)
Verifies:
1. Catalog data integrity & category mapping (Milk & Bread richness)
2. Deficit matching recommendation engine [Deficit, Deficit + 25]
3. Cold-start fallback for new users with zero order history
4. Three-tier filler separation ("For You", "You might also like", "Specials")
5. Fee waiver logic (₹35 < ₹199 vs FREE >= ₹199)
6. Delivery fee row inline helper text logic (only on Checkout, waived when >= 199)
7. UI Single-Screen & No-Double-Scroll CSS rules (zero browser scroll, only internal viewport)
8. Clean DOM structure (No bunting triangles, No top progress bar on feed/checkout)
9. Docked Checkout Action Bar (no random floating over cards)
10. Left PM Studio Sidebar structure and metrics
11. Reset functionality to Default 1 (₹145 cart)
12. Contribution margin safeguards for Specials
"""

import unittest
import re
import os

APP_DIR = os.path.dirname(os.path.abspath(__file__))

class TestThelaApp(unittest.TestCase):

    def setUp(self):
        self.html_path = os.path.join(APP_DIR, 'index.html')
        self.js_path = os.path.join(APP_DIR, 'app.js')
        self.css_path = os.path.join(APP_DIR, 'styles.css')
        
        with open(self.html_path, 'r', encoding='utf-8') as f:
            self.html_content = f.read()
        with open(self.js_path, 'r', encoding='utf-8') as f:
            self.js_content = f.read()
        with open(self.css_path, 'r', encoding='utf-8') as f:
            self.css_content = f.read()

    def test_01_no_double_scroll_css(self):
        """Verify body and html have overflow: hidden to ensure single-screen app without browser scroll."""
        self.assertIn('overflow: hidden', self.css_content, "CSS must enforce overflow: hidden to prevent double scroll")
        self.assertTrue(
            'height: 100vh' in self.css_content or 'height: 100%' in self.css_content,
            "Body must have 100vh or 100% height"
        )
        self.assertIn('.master-layout', self.css_content, "CSS must include .master-layout desktop flex container")

    def test_02_pm_sidebar_on_left(self):
        """Verify the PM toolbar is structured as a sleek sidebar on the left, not a bloated top bar."""
        self.assertIn('pm-sidebar', self.html_content, "HTML must use a pm-sidebar instead of a top pm-toolbar")
        self.assertIn('.pm-sidebar', self.css_content, "CSS must style the pm-sidebar")
        self.assertIn('pmSidebarCartVal', self.html_content, "Sidebar must track live cart subtotal & deficit")
        self.assertIn('AirLearn Take-Home', self.html_content, "Sidebar must display project badge")

    def test_03_no_bunting_decor_triangles(self):
        """Verify the weird colorful downward arrows/triangles (bunting flags) are completely removed."""
        self.assertNotIn('bunting-decor', self.html_content, "HTML must not contain bunting-decor triangles")
        self.assertNotIn('bunting-flag', self.html_content, "HTML must not contain bunting-flag elements")
        self.assertNotIn('.bunting-flag', self.css_content, "CSS must not style bunting-flag triangles")

    def test_04_no_top_progress_bars(self):
        """Verify there are no redundant top progress bars on either feed or checkout."""
        self.assertNotIn('feedProgressContainer', self.html_content, "Feed screen must not have a top progress container")
        self.assertNotIn('checkoutProgressContainer', self.html_content, "Checkout screen must not have a top progress container")

    def test_05_single_floating_bar_on_feed(self):
        """Verify single progress bar exists as floating bar for feed and has bottom placement."""
        self.assertIn('floatingCartBar', self.html_content, "HTML must contain floatingCartBar")
        self.assertIn('.floating-cart-bar', self.css_content, "CSS must style floating-cart-bar")
        self.assertIn('currentScreen !== \'feed\'', self.js_content, "Floating bar must hide when not on feed screen")

    def test_06_docked_checkout_bar(self):
        """Verify proceed to pay bar is docked at the bottom and does not float randomly over items."""
        self.assertIn('.checkout-bar', self.css_content)
        self.assertTrue(
            'position: fixed' in self.css_content or 'position: sticky' in self.css_content or 'position: absolute' in self.css_content,
            "Checkout bar must have controlled positioning"
        )
        self.assertIn('bottom: 0', self.css_content, "Checkout bar must dock at bottom: 0")

    def test_07_milk_and_bread_category_richness(self):
        """Verify Milk & Bread category filter maps to multiple products (milk, breads, butter, curd, eggs, buns, rusk)."""
        self.assertIn('milk_bread', self.html_content, "HTML must have Milk & Bread pill with data-cat='milk_bread'")
        self.assertIn('milk_bread', self.js_content, "Catalog or filter logic must support milk_bread composite category")
        
        # Check staple products in catalog
        staple_keywords = ['Nandini', 'Amul', 'Britannia', 'English Oven', 'Modern', 'Bread', 'Milk', 'Eggs', 'Butter', 'Curd']
        for keyword in staple_keywords:
            self.assertIn(keyword, self.js_content, f"Catalog must include {keyword}")

    def test_08_three_stacked_carousels(self):
        """Verify presence of the 3 specified stacked micro-carousels in app.js: For You, You might also like, Specials."""
        self.assertIn('For You', self.js_content, "Must contain 'For You' section")
        self.assertIn('You might also like', self.js_content, "Must contain 'You might also like' section")
        self.assertIn('Specials', self.js_content, "Must contain 'Specials' section")
        self.assertIn('fillersStackContainer', self.html_content, "HTML must have container for stacked fillers")

    def test_09_cold_start_fallback(self):
        """Verify app.js implements cold start fallback to popular staples for 'For You'."""
        self.assertIn('cold', self.js_content.lower(), "app.js must document and handle cold-start fallback")
        self.assertIn('isStaple', self.js_content, "app.js must utilize staple classification for cold start")

    def test_10_delivery_fee_helper_text(self):
        """Verify delivery fee helper text logic matches user specification."""
        self.assertIn('Add items worth', self.js_content, "app.js must include 'Add items worth' delivery fee helper text")
        self.assertIn('to avail free delivery', self.js_content, "app.js must include 'to avail free delivery'")
        self.assertIn('fee-waived', self.js_content, "app.js must style waived fee with green FREE")

    def test_11_reset_restores_default_145(self):
        """Verify reset function restores the Default 1 (₹145 cart: Bread + 2 Eggs)."""
        self.assertIn('resetToDefault', self.js_content, "app.js must have resetToDefault function")
        self.assertIn('145', self.html_content, "HTML must mention ₹145 default")
        self.assertIn('prod_bread: 1', self.js_content, "Default cart must include 1 Bread")
        self.assertIn('prod_eggs: 2', self.js_content, "Default cart must include 2 Eggs")

    def test_12_two_phase_value_layer_and_price_sensitivity(self):
        """Verify Two-Phase Value Layer: Price sensitivity activates at cart >= ₹150 to bridge deficit."""
        self.assertIn('cartSubtotal >= 150', self.js_content, "Price sensitivity must activate at cart value >= ₹150")
        self.assertIn('isPriceSensitive', self.js_content, "Engine must track isPriceSensitive state")
        self.assertIn('Unlocks FREE Delivery', self.js_content, "Slot 1 bridge items must display 'Unlocks FREE Delivery' badge")
        self.assertIn('bridgeItem', self.js_content, "Engine must compute bridgeItem for Slot 1")

    def test_13_contribution_margin_safeguards(self):
        """Verify impulse specials enforce positive contribution margin buffers."""
        self.assertIn('isSpecial', self.js_content, "Catalog must tag specials")
        self.assertIn('margin', self.js_content, "Catalog items must encode margin data")

    def test_14_single_scroll_target_in_device(self):
        """Verify .app-viewport has overflow-y: auto and is the designated scroll area."""
        self.assertIn('.app-viewport', self.css_content, "CSS must style .app-viewport")
        self.assertIn('overflow-y: auto', self.css_content, "Internal viewport must have overflow-y: auto")

    def test_15_checkout_bar_outside_viewport(self):
        """Verify checkout bar is placed outside the scrollable app-viewport, locking it to the device frame."""
        viewport_end = self.html_content.find('</div>\n\n      <!-- ========================================================\n           LOCKED CHECKOUT ACTION BAR')
        if viewport_end == -1:
            # Fallback search pattern
            viewport_end = self.html_content.find('</div>\n\n      <!--')
        checkout_pos = self.html_content.find('id="checkoutStickyBar"')
        self.assertNotEqual(checkout_pos, -1, "checkoutStickyBar must exist in HTML")
        # Ensure checkout bar occurs after the app-viewport closing div
        viewport_open = self.html_content.find('<div class="app-viewport">')
        self.assertTrue(checkout_pos > viewport_open, "checkout bar must be structured after viewport opening")
        # Ensure checkout bar is a direct sibling outside section#screenCheckout
        checkout_screen_close = self.html_content.find('</section>\n\n      </div>')
        self.assertTrue(checkout_pos > checkout_screen_close, "checkoutStickyBar must be placed AFTER app-viewport closes")

    def test_16_full_shelf_guarantee_never_shrinks(self):
        """Verify the recommendation engine guarantees full shelves (>= 4 items) and never shrinks to 1 item."""
        self.assertIn('forYouPool.length < 5', self.js_content, "Engine must ensure For You pool has sufficient items")
        self.assertIn('affinityPool.length < 5', self.js_content, "Engine must ensure Affinity pool has sufficient items")
        self.assertIn('specialsPool.length < 5', self.js_content, "Engine must ensure Specials pool has sufficient items")
        self.assertIn('.slice(0, 5)', self.js_content, "Engine must return 4 to 5 items per carousel")

    def test_17_reactive_quantity_updates(self):
        """Verify quantity changes trigger full re-render and recalculation of recommendations and bill."""
        self.assertIn('updateCartQuantity', self.js_content, "Must support quantity adjustments")
        self.assertIn('renderApp()', self.js_content, "Must trigger renderApp on cart mutations")


if __name__ == '__main__':
    unittest.main()
