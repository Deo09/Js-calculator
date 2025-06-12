// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation
let justCalculated = false;

function appendToDisplay(value) {
  console.log('Button pressed:', value);

  let currentValue = display.value;

  if (justCalculated && !isNaN(value)) {
    display.value = value;
    justCalculated = false;
    return;
  }

  // If current display shows 0 and user enters a number, replace the 0
  if (currentValue === "0" && !isNaN(value)) {
    display.value = value;
  } else if (currentValue === "0" && value === '.') {
    display.value = currentValue + value;
  } else (value ==='.'); {
  //Get the last number in the display 
  let lastNumber = currentValue.split('*/[+\.*/]').pop();
  //Onlyadd the decimal if the current number doesnt have ont
  if(!lastNumber.includes('.')) {
    display.value = currentValue + value
  }
    display.value = currentValue + value;
  }

  // Reset the justCalculated flag when user starts typing
  justCalculated = false;

  alert('You pressed: ' + value);
}

function clearDisplay() {
  console.log('Clear button pressed.');

  display.value = '0';
  justCalculated = false;

  display.style.backgroundColor =rgb(245, 240, 240);
  setTimeout(() => {
    display.style.backgroundColor ='';
  }, 150);

  alert('Clear button was clicked');
}

function deleteLast() {
  console.log('Backspace button pressed.');


  let currentValue = display.value;

  // If there's only one character or it's 0, reset to 0
  if (currentValue.length <= 1 || currentValue === '0') {
    display.value = '0';
  } else {
    display.value = currentValue.slice(0, -1);
  }

  alert('Backspace button was clicked');
}

function calculate() {
  console.log('Equals button pressed');
  try {
    display.value = eval(display.value);
    justCalculated = true;
  } catch (e) {
    display.value = 'Error';
  }

  alert('Equals button was clicked');

}

//keydown handler  allow users to use the keyboard instead of clicking buttons with a mouse. 
// calculator more user-friendly and accessible.

document.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event.key);

  if (event.key >= '0' && event.key <= '9') {
    appendToDisplay(event.key);

  } else if (event.key === '.') {
    appendToDisplay('.');

  } else if (event.key === '+') {
    appendToDisplay('+');

  } else if (event.key === '-') {
    appendToDisplay('-');

  } else if (event.key === '*') {
    appendToDisplay('*');

  } else if (event.key === '/') {
    appendToDisplay('/');

  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();

  } else if (event.key === 'Backspace') {
    deleteLast();

  } else if (event.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

 


document.addEventListener('DOMContentLoaded', function () {
  console.log('Calculator loaded successfully');
  console.log('Display element:', display);

  if (display) {
    console.log('Current display value:', display.value);
  } else {
    console.log('Display element not found');
  }
})
