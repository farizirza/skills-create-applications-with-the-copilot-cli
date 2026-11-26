const assert = require("node:assert/strict");
const test = require("node:test");
const { calculate, modulo, power, squareRoot } = require("../calculator");

test("supports the four basic arithmetic operations", async (t) => {
  const examples = [
    ["addition from the example", 2, "+", 3, 5],
    ["subtraction from the example", 10, "-", 4, 6],
    ["multiplication from the example", 45, "*", 2, 90],
    ["division from the example", 20, "/", 5, 4],
  ];

  for (const [name, left, operator, right, expected] of examples) {
    await t.test(name, () => {
      assert.equal(calculate(left, operator, right), expected);
    });
  }
});

test("handles zero, negative, and decimal operands", async (t) => {
  const examples = [
    ["adds decimal values", 1.5, "+", 2.25, 3.75],
    ["subtracts to a negative result", 4, "-", 9, -5],
    ["multiplies by zero", 45, "*", 0, 0],
    ["multiplies negative values", -3, "*", 2, -6],
    ["divides to a decimal result", 1, "/", 2, 0.5],
    ["divides a negative value", -12, "/", 3, -4],
  ];

  for (const [name, left, operator, right, expected] of examples) {
    await t.test(name, () => {
      assert.equal(calculate(left, operator, right), expected);
    });
  }
});

test("rejects division by zero", () => {
  assert.throws(() => calculate(10, "/", 0), {
    message: "Cannot divide by zero.",
  });
});

test("supports modulo and rejects a zero divisor", async (t) => {
  await t.test("matches the example 5 % 2", () => {
    assert.equal(modulo(5, 2), 1);
    assert.equal(calculate(5, "%", 2), 1);
  });

  await t.test("handles another remainder", () => {
    assert.equal(modulo(10, 3), 1);
    assert.equal(calculate(10, "%", 3), 1);
  });

  await t.test("preserves the dividend sign for negative operands", () => {
    assert.equal(modulo(-10, 3), -1);
  });

  await t.test("rejects a zero divisor", () => {
    assert.throws(() => modulo(10, 0), {
      message: "Cannot calculate modulo with a zero divisor.",
    });
  });
});

test("supports exponentiation", async (t) => {
  const examples = [
    ["matches the example 2 ^ 3", 2, 3, 8],
    ["supports a zero exponent", 5, 0, 1],
    ["supports a negative exponent", 2, -2, 0.25],
    ["raises a base to a larger exponent", 3, 4, 81],
  ];

  for (const [name, base, exponent, expected] of examples) {
    await t.test(name, () => {
      assert.equal(power(base, exponent), expected);
    });
  }
  assert.equal(calculate(2, "^", 3), 8);
});

test("supports square roots and rejects negative values", async (t) => {
  await t.test("matches the example square root of 16", () => {
    assert.equal(squareRoot(16), 4);
  });

  await t.test("calculates the square root of zero", () => {
    assert.equal(squareRoot(0), 0);
  });

  await t.test("rejects a negative value", () => {
    assert.throws(() => squareRoot(-1), {
      message: "Cannot calculate the square root of a negative number.",
    });
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "?", 3), {
    message: "Unsupported operation: ?",
  });
});
