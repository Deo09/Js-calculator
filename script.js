// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation
let justCalculated = false;

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function getLastChar() {
  return display.value.slice(-1);
}

function safeEval(expression) {
  try {
    let jsExpression = expression
      .replace(/x/g, '*')
      .replace(/\u00F7/g, '/'); // Optional: replace '÷'

    if (!/^[0-9+\-*/.()]+$/.test(jsExpression)) {
      throw new Error('Invalid characters in expression');
    }

    const result = Function('"use strict"; return (' + jsExpression + ')')();

    if (!isFinite(result)) {
      throw new Error('Invalid calculation result');
    }

    return result;
  } catch (error) {
    console.error('Calculation error:', error);
    return 'Error';
  }
}

function appendToDisplay(value) {
  let currentValue = display.value;

  if (justCalculated && !isNaN(value)) {
    display.value = value;
    justCalculated = false;
    return;
  }

  // Handle operators
  if (isOperator(value)) {
    if (currentValue === '0' && value !== '-') return;

    if (isOperator(getLastChar())) {
      display.value = currentValue.slice(0, -1) + value;
    } else {
      display.value = currentValue + value;
    }
  } else if (!isNaN(value)) {
    if (currentValue === '0' || justCalculated) {
      display.value = value;
    } else {
      display.value = currentValue + value;
    }
  } else if (value === '.') {
    let lastNumber = currentValue.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes('.')) {
      display.value = currentValue + value;
    }
  }

  justCalculated = false;
}

function clearDisplay() {
  display.value = '0';
  justCalculated = false;

  display.style.backgroundColor = 'rgb(245, 240, 240)';
  setTimeout(() => {
    display.style.backgroundColor = '';
  }, 150);
}

function deleteLast() {
  let currentValue = display.value;

  if (currentValue.length <= 1 || currentValue === '0') {
    display.value = '0';
  } else {
    display.value = currentValue.slice(0, -1);
  }
}

function calculate() {
  let expression = display.value;

  if (!expression || isOperator(getLastChar())) return;

  let result = safeEval(expression);

  if (result === 'Error') {
    display.value = 'Error';
    setTimeout(() => clearDisplay(), 2000);
  } else {
    display.value = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(10)).toString();
    justCalculated = true;
  }

  display.style.backgroundColor = '#e8ffe8';
  setTimeout(() => {
    display.style.backgroundColor = '';
  }, 300);
}

// Enable keyboard input
document.addEventListener('keydown', function (event) {
  if (event.key >= '0' && event.key <= '9') {
    appendToDisplay(event.key);
  } else if (event.key === '.') {
    appendToDisplay('.');
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    appendToDisplay(event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === 'Backspace') {
    deleteLast();
  } else if (event.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

// DOM ready log
document.addEventListener('DOMContentLoaded', function () {
  console.log('Calculator loaded successfully');
  if (display) {
    console.log('Current display value:', display.value);
  } else {
    console.log('Display element not found');
  }
});
