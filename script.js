// Reference display element
const display = document.getElementById('display');

// Track if we have performed a calculation
let justCalculated = false;



function isOperator(char) {
    return['+', '-' ,'*', '/'].includes(char);
}

function getLastChar() {
    return display.value.slice(-1);

}
function safeEval (expression){
    try {
        let jsExpression = expression
        .replace(/x/g,'*')
        .replace(/+/g '/' );
        if(!/^[0-9+\-*.()]+$/.test(jsExpression)){
            throw new Error('Invalid characters in expression');
        }
        const result = Function('"use strict"; return (' + jsExpression + ')')();
        
        if(!isFinite(result)) {
            throw new Error('Invalid calculation result');

        }
        return result;

    }catch(error){
       console .error('calculation error:', error);
       return 'Error';
    }
}

function appendToDisplay(value) {
  let currentValue = display.value;
}
  if (justCalculated && !isNaN(value)) {
    display.value = value;
    justCalculated = false;
    return;
  }

  //Handles operators
  if (isOperator(value)) {
    // Dont allow operator as first char (eception for minus)
        if (currentValue === '0' && value !== '-') {
           return; //do nothing 
        }

     
        //if the last character is already an operator, replace it
      if(isOperator(getChar())) {
        display.value = currentValue.slice(0,-1) + value;
      } else {
        display.value = currentvalue + value;
      }
       } else if (!isNaN(value)) {
        if (currentValue ==='0' || justCalculated) {
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
       
    


 if (justCalculated && isOperator(value)) {
    display.value = currentValue +value;
    justCalculated = false;
    return;
  
  }

  // If current display shows 0 and user enters a number, replace the 0
  if (currentValue === "0" && !isNaN(value)) {
    display.value = value;
  } else if (currentValue === "0" && value === '.') {
    display.value = currentValue + value;
      } else {
        // Get the last number in the display (after last operator)
        let parts = currentValue.split('/[+\-*/');
        let lastNumber = parts[parts.length -1];

        //only add decimal if number doesnt already have one
        if(!lastNumber.includes('.')){
            display.value = currentValue + value
        }


      } else if (value === '.') {
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
     let (expression = '0' || expression ==='')
        return;
     }
// Dont cal if expression ends with operator
if (isOperator(getLastChar())) {
    return;

    }
     let result = safeEval(expression);

     if (result ==='Errror') {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay()
        } , 2000);
     }else {
        if (Number.isInteger(result)) {
            display.value = result.toString();

        }else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }
          justCalculated = true;
        }
        display.style.backgroundColor = '#e8fe8';
        setTimeout(() =>  {
           display.style.background = '';
        }, 300);
     {
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
