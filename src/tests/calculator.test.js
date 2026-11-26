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

test("supports modulo and exponentiation", async (t) => {
  const examples = [
    ["modulo", 10, "%", 3, 1],
    ["exponentiation with caret", 2, "^", 3, 8],
    ["exponentiation with double asterisk", 2, "**", 3, 8],
  ];

  for (const [name, left, operator, right, expected] of examples) {
    await t.test(name, () => {
      assert.equal(calculate(left, operator, right), expected);
    });
  }
});

test("exports modulo, power, and square root functions", () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(power(2, 3), 8);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
});

test("rejects modulo by zero", () => {
  assert.throws(() => modulo(10, 0), {
    message: "Cannot modulo by zero.",
  });
});

test("rejects non-finite exponentiation results", () => {
  assert.throws(() => power(10, 10000), {
    message: "Exponentiation must produce a finite number.",
  });
  assert.throws(() => power(-1, 0.5), {
    message: "Exponentiation must produce a finite number.",
  });
});

test("rejects the square root of a negative number", () => {
  assert.throws(() => squareRoot(-1), {
    message: "Cannot calculate the square root of a negative number.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "$", 3), {
    message: "Unsupported operation: $",
  });
});
