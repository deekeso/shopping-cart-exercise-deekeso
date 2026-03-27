class ThreeForTwoUnlimited1GBRule {
  apply(context) {
    const targetItems = context.items.filter((item) => item.code === "ult_small");
    const freeCount = Math.floor(targetItems.length / 3);

    for (let i = 0; i < freeCount; i += 1) {
      targetItems[i].price = 0;
    }
  }
}

class BulkDiscountUnlimited5GBRule {
  constructor({ threshold = 3, discountedPrice = 39.9 } = {}) {
    this.threshold = threshold;
    this.discountedPrice = discountedPrice;
  }

  apply(context) {
    const targetItems = context.items.filter((item) => item.code === "ult_large");
    if (targetItems.length > this.threshold) {
      targetItems.forEach((item) => {
        item.price = this.discountedPrice;
      });
    }
  }
}

class FreeDataPackWithUnlimited2GBRule {
  apply(context) {
    const mediumCount = context.items.filter((item) => item.code === "ult_medium").length;
    for (let i = 0; i < mediumCount; i += 1) {
      context.items.push({
        code: "1gb",
        name: "1 GB Data-pack",
        basePrice: 9.9,
        price: 0
      });
    }
  }
}

class PromoCodeDiscountRule {
  constructor({ promoCode = "I<3AMAYSIM", discountRate = 0.1 } = {}) {
    this.promoCode = promoCode;
    this.discountRate = discountRate;
  }

  apply(context) {
    if (context.cart.activePromoCode === this.promoCode) {
      return context.subtotal * (1 - this.discountRate);
    }
    return context.subtotal;
  }
}

module.exports = {
  ThreeForTwoUnlimited1GBRule,
  BulkDiscountUnlimited5GBRule,
  FreeDataPackWithUnlimited2GBRule,
  PromoCodeDiscountRule
};
