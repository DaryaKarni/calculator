import "./styles/main.css";
import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  changeSign,
} from "./modules/operations";

let currentInput = "0";
let previousInput = "";
let operation = null;
let shouldResetScreen = false;

const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll(".btn-symbol");
const operationButtons = document.querySelectorAll(".btn-operation");

const equalsButton = document.querySelector(".btn-equals");
const clearButton = document.querySelector(".btn-clear");

const percentButton = document.querySelector(".btn-percent");
const signButton = document.querySelector(".btn-sign");

function updateScreen() {
  screen.textContent = currentInput;

  const length = currentInput.length;

  if (length > 14) {
    screen.style.fontSize = "2rem";
  } else if (length > 10) {
    screen.style.fontSize = "3rem";
  } else {
    screen.style.fontSize = "4rem";
  }
}

function appendSymbol(symbol) {
  if (!shouldResetScreen && currentInput.length >= 42) {
    return;
  }
  if (symbol !== "." && (currentInput === "0" || shouldResetScreen)) {
    currentInput = symbol;
    shouldResetScreen = false;
  } else {
    if (symbol === "." && currentInput.includes(".")) return;
    currentInput += symbol;
  }
  updateScreen();
}

function setOperation(operator) {
  if (operation !== null) compute();
  previousInput = currentInput;
  operation = operator;
  shouldResetScreen = true;
}
function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = add(prev, current);
      break;
    case "-":
      computation = subtract(prev, current);
      break;
    case "×":
      computation = multiply(prev, current);
      break;
    case "÷":
      computation = divide(prev, current);
      break;
    default:
      return;
  }

  currentInput = parseFloat(computation.toFixed(8)).toString();
  operation = undefined;
  previousInput = "";
  updateScreen();
}

function calculatePercentage() {
  const current = parseFloat(currentInput);
  if (isNaN(current)) return;
  currentInput = percentage(current).toString();
  updateScreen();
}

function toggleSign() {
  const current = parseFloat(currentInput);
  if (isNaN(current)) return;
  currentInput = changeSign(current).toString();
  updateScreen();
}

function clear() {
  currentInput = "0";
  previousInput = "";
  operation = null;
  updateScreen();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendSymbol(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  shouldResetScreen = true;
});

clearButton.addEventListener("click", clear);
percentButton.addEventListener("click", calculatePercentage);
signButton.addEventListener("click", toggleSign);
