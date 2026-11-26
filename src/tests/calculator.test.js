const assert = require("node:assert/strict");
const test = require("node:test");
const { calculate } = require("../calculator");

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

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "%", 3), {
    message: "Unsupported operation: %",
  });
});
