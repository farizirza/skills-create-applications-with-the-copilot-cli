// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), and exponentiation (^ or **).
function modulo(dividend, divisor) {
  if (divisor === 0) {
    throw new Error("Cannot modulo by zero.");
  }
  return dividend % divisor;
}

function power(base, exponent) {
  const result = base ** exponent;
  if (!Number.isFinite(result)) {
    throw new Error("Exponentiation must produce a finite number.");
  }
  return result;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(value);
}

function calculate(left, operator, right) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return left / right;
    case "%":
      return modulo(left, right);
    case "^":
    case "**":
      return power(left, right);
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function main(args) {
  if (args.length === 2 && args[0] === "sqrt") {
    const value = Number(args[1]);
    if (!Number.isFinite(value)) {
      throw new Error("The operand must be a valid finite number.");
    }
    console.log(squareRoot(value));
    return;
  }

  if (args.length !== 3) {
    throw new Error("Usage: node src/calculator.js <number> <+|-|*|/|%|^|**> <number> | sqrt <number>");
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid finite numbers.");
  }

  console.log(calculate(left, operator, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
