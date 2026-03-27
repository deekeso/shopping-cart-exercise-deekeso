class ShoppingCart {
  constructor(catalog, pricingRules = [], promoCodeRules = []) {
    this.catalog = new Map(catalog.map((product) => [product.code, { ...product }]));
    this.pricingRules = pricingRules;
    this.promoCodeRules = promoCodeRules;
    this.cartItems = [];
    this.activePromoCode = null;
  }

  add(itemCode, promoCode) {
    if (!this.catalog.has(itemCode)) {
      throw new Error(`Unknown item code: ${itemCode}`);
    }

    this.cartItems.push(itemCode);

    if (promoCode) {
      this.activePromoCode = promoCode;
    }
  }

  applyPromoCode(promoCode) {
    this.activePromoCode = promoCode;
  }

  items() {
    const workingItems = this._buildWorkingItems();

    this.pricingRules.forEach((rule) => {
      rule.apply({ cart: this, items: workingItems });
    });

    return workingItems
      .map((entry) => this.catalog.get(entry.code).name)
      .sort((a, b) => a.localeCompare(b));
  }

  total() {
    const workingItems = this._buildWorkingItems();

    this.pricingRules.forEach((rule) => {
      rule.apply({ cart: this, items: workingItems });
    });

    let subtotal = workingItems.reduce((acc, item) => acc + item.price, 0);

    this.promoCodeRules.forEach((rule) => {
      subtotal = rule.apply({
        cart: this,
        subtotal
      });
    });

    return Number(subtotal.toFixed(2));
  }

  _buildWorkingItems() {
    return this.cartItems.map((code) => {
      const product = this.catalog.get(code);
      return {
        code: product.code,
        name: product.name,
        basePrice: product.price,
        price: product.price
      };
    });
  }
}

module.exports = {
  ShoppingCart
};
