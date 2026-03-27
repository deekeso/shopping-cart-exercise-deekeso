const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const { createCart } = require("./index");
const { CATALOG } = require("./catalog");

function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}

function summarizeItems(itemNames) {
  return itemNames.reduce((acc, name) => {
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
}

function printCatalog() {
  console.log("\n=== Amaysim Product Catalogue ===");
  CATALOG.forEach((product, idx) => {
    console.log(
      `${idx + 1}. ${product.name} (${product.code}) - ${formatMoney(product.price)}`
    );
  });
  console.log("=================================\n");
}

function printCartResult(cart) {
  const itemSummary = summarizeItems(cart.items());
  const total = cart.total();

  console.log("\n=== Cart Result ===");
  Object.keys(itemSummary)
    .sort((a, b) => a.localeCompare(b))
    .forEach((name) => {
      console.log(`- ${itemSummary[name]} x ${name}`);
    });
  console.log(`Expected Cart Total: ${formatMoney(total)}`);
  console.log("===================\n");
}

async function runCli() {
  const rl = readline.createInterface({ input, output });
  let cart = createCart();

  console.log("Welcome to the Amaysim Shopping Cart.");
  printCatalog();

  while (true) {
    const productAnswer = await rl.question(
      "Select product number/code (e.g. 1 or ult_small): "
    );
    const normalized = productAnswer.trim();
    const byIndex = Number(normalized);
    const product =
      CATALOG[byIndex - 1] || CATALOG.find((entry) => entry.code === normalized);

    if (!product) {
      console.log("Invalid product selection. Please try again.");
      continue;
    }

    const qtyAnswer = await rl.question(`Enter quantity for ${product.name}: `);
    const quantity = Number(qtyAnswer.trim());
    if (!Number.isInteger(quantity) || quantity <= 0) {
      console.log("Quantity must be a positive whole number.");
      continue;
    }

    for (let i = 0; i < quantity; i += 1) {
      cart.add(product.code);
    }

    const actionAnswer = await rl.question(
      "Choose next action (proceed to payment / add item / cancel): "
    );
    const action = actionAnswer.trim().toLowerCase();

    if (action === "add item") {
      console.log("Item added. Continue shopping.");
      continue;
    }

    if (action === "cancel") {
      cart = createCart();
      console.log("Cart cancelled and reset.");
      printCatalog();
      continue;
    }

    if (action !== "proceed to payment") {
      console.log("Invalid action. Use: proceed to payment, add item, or cancel.");
      continue;
    }

    const promoAnswer = await rl.question(
      "Enter promo code for checkout (press Enter to skip): "
    );
    const promoCode = promoAnswer.trim();
    if (promoCode) {
      cart.applyPromoCode(promoCode);
    }

    console.log("Final cart for payment:");
    printCartResult(cart);
    break;
  }

  rl.close();
}

if (require.main === module) {
  runCli().catch((error) => {
    console.error("CLI failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  runCli,
  summarizeItems
};
