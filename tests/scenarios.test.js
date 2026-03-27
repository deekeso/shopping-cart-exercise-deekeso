const assert = require("node:assert/strict");
const { createCart } = require("../src");

function countByName(names) {
  return names.reduce((acc, name) => {
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
}

function runScenarios() {
  const scenarios = [
    {
      id: 1,
      setup: (cart) => {
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_large");
      },
      expectedTotal: 94.7,
      expectedItems: {
        "Unlimited 1GB": 3,
        "Unlimited 5GB": 1
      }
    },
    {
      id: 2,
      setup: (cart) => {
        cart.add("ult_small");
        cart.add("ult_small");
        cart.add("ult_large");
        cart.add("ult_large");
        cart.add("ult_large");
        cart.add("ult_large");
      },
      expectedTotal: 209.4,
      expectedItems: {
        "Unlimited 1GB": 2,
        "Unlimited 5GB": 4
      }
    },
    {
      id: 3,
      setup: (cart) => {
        cart.add("ult_small");
        cart.add("ult_medium");
        cart.add("ult_medium");
      },
      expectedTotal: 84.7,
      expectedItems: {
        "Unlimited 1GB": 1,
        "Unlimited 2GB": 2,
        "1 GB Data-pack": 2
      }
    },
    {
      id: 4,
      setup: (cart) => {
        cart.add("ult_small");
        cart.add("1gb", "I<3AMAYSIM");
      },
      expectedTotal: 31.32,
      expectedItems: {
        "Unlimited 1GB": 1,
        "1 GB Data-pack": 1
      }
    }
  ];

  scenarios.forEach((scenario) => {
    const cart = createCart();
    scenario.setup(cart);

    const total = cart.total();
    const items = countByName(cart.items());

    assert.equal(total, scenario.expectedTotal, `Scenario ${scenario.id}: total mismatch`);
    assert.deepEqual(items, scenario.expectedItems, `Scenario ${scenario.id}: items mismatch`);
  });

  return scenarios.map((scenario) => {
    const cart = createCart();
    scenario.setup(cart);
    return {
      scenario: scenario.id,
      total: cart.total(),
      items: countByName(cart.items())
    };
  });
}

if (require.main === module) {
  const results = runScenarios();
  console.log("All scenarios passed.");
  results.forEach((entry) => {
    console.log(`Scenario ${entry.scenario}: total=$${entry.total.toFixed(2)} items=${JSON.stringify(entry.items)}`);
  });
}

module.exports = {
  runScenarios
};
