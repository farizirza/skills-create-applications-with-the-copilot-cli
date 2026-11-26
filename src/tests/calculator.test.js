const assert = require("node:assert/strict");
const test = require("node:test");
const { calculate } = require("../calculator");

test("supports arithmetic and extended operations", async (t) => {
  const examples = [
    ["addition from the example", 2, "+", 3, 5],
    ["subtraction from the example", 10, "-", 4, 6],
    ["multiplication from the example", 45, "*", 2, 90],
    ["division from the example", 20, "/", 5, 4],
    ["modulo", 10, "%", 3, 1],
    ["power", 2, "^", 3, 8],
    ["square root", 9, "sqrt", undefined, 3],
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
    ["modulo with a negative dividend", -10, "%", 3, -1],
    ["raises a number to a negative exponent", 2, "^", -2, 0.25],
    ["square root of zero", 0, "sqrt", undefined, 0],
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

test("rejects modulo by zero", () => {
  assert.throws(() => calculate(10, "%", 0), {
    message: "Cannot modulo by zero.",
  });
});

test("rejects square root of a negative number", () => {
  assert.throws(() => calculate(-1, "sqrt"), {
    message: "Cannot calculate the square root of a negative number.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "?", 3), {
    message: "Unsupported operation: ?",
  });
});
