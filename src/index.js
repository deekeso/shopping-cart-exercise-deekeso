const { CATALOG } = require("./catalog");
const { ShoppingCart } = require("./shopping-cart");
const {
  ThreeForTwoUnlimited1GBRule,
  BulkDiscountUnlimited5GBRule,
  FreeDataPackWithUnlimited2GBRule,
  PromoCodeDiscountRule
} = require("./pricing-rules");

function createCart() {
  const pricingRules = [
    new ThreeForTwoUnlimited1GBRule(),
    new BulkDiscountUnlimited5GBRule(),
    new FreeDataPackWithUnlimited2GBRule()
  ];
  const promoCodeRules = [new PromoCodeDiscountRule()];
  return new ShoppingCart(CATALOG, pricingRules, promoCodeRules);
}

module.exports = {
  createCart
};
