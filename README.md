# Amaysim Shopping Cart Exercise

Native JavaScript implementation of a rule-driven shopping cart that supports:

- Multi-item cart additions in any order
- Catalog-based product pricing
- Flexible pricing/promotion rules
- Promo-code based discounting

## Product Catalog

- `ult_small` -> Unlimited 1GB ($24.90)
- `ult_medium` -> Unlimited 2GB ($29.90)
- `ult_large` -> Unlimited 5GB ($44.90)
- `1gb` -> 1 GB Data-pack ($9.90)

## Implemented Pricing Rules

1. `3 for 2` on `ult_small`
2. `ult_large` bulk discount to `$39.90` each when quantity is greater than `3`
3. One free `1gb` data-pack per `ult_medium`
4. Promo code `I<3AMAYSIM` gives `10%` off total

## Project Structure

- `src/shopping-cart.js` -> core cart implementation
- `src/pricing-rules.js` -> promotion and discount rules
- `src/catalog.js` -> catalog definition
- `src/index.js` -> cart factory setup
- `src/cli.js` -> interactive terminal cart prompt
- `tests/scenarios.test.js` -> scenario verification script

## How To Run

### Prerequisites

- Node.js 18+ (or any modern Node version)

### Install

No external runtime dependencies are used.

```bash
npm install
```

### Run The Application (Interactive Prompt)

```bash
npm start
```

What you will get:

- The catalog is displayed first
- You can select a product by number or product code
- You can enter quantity
- After quantity, you choose one action:
  - `proceed to payment` -> prompt asks promo code, then computes final expected cart total
  - `add item` -> lets you add another product to the same cart
  - `cancel` -> resets cart and restarts from catalog
- Checkout response shows:
  - expected cart items
  - expected cart total
- Pricing and computation follow the same scenario rules (3-for-2, bulk discount, free 1GB, promo code discount)

### Execute Tests (Required Scenarios)

```bash
npm test
```

or:

```bash
npm run scenarios
```

Both commands execute the 4 required scenarios and assert expected totals and cart items.

## Notes On Flexibility

Rules are isolated classes and injected into `ShoppingCart`, so you can:

- Replace rule thresholds/prices with constructor config
- Add/remove rules without changing cart internals
- Add new promo code logic independently of item rules
