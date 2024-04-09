/*==========================================================*
 *                Code written by: Khashayar                *
 *                Github account: KhashayarS                *
 *==========================================================*/

/* Global variables and constants */
let num1 = null;
let num2 = null;
let operator = null;
let currentResult = null;
let displayOutput = 0;
let num1Entered = false;

const allBtnContainer = document.querySelector("#allBtnContainer");
const clearBtn = document.querySelector("#clearBtn");
const decimalBtn = document.querySelector("#decimalBtn");
const screen = document.querySelector("#screen");


function addNumbers(num1, num2) {
    let result = num1 + num2;
    return result
}


function subtractNumbers(num1, num2) {
    let result = num1 - num2;
    return result
}


function multiplyNumbers(num1, num2) {
    let result = num1 * num2;
    return result
}


function divideNumbers(num1, num2) {
    let result = num1 / num2;
    return result
}


function operate(num1, num2, operator) {
    // list of possible operators: add, subtract, multiply, divide
    let output;
    let numberedNum1 = Number(num1);
    let numberedNum2 = Number(num2);
    if (operator === 'add') output = addNumbers(numberedNum1, numberedNum2);
    else if (operator === 'subtract') output = subtractNumbers(num1, num2);
    else if (operator === 'multiply') output = multiplyNumbers(num1, num2);
    else if (operator === 'divide') output = divideNumbers(num1, num2);

    return output
}


function isNumber(value) {
    let isNotNaN = !isNaN(value);
    return isNotNaN
}


function removeLeftZeros(numString) {
    let trimmedNumString = String(numString);
    let regexPattern = /^0+/;
    
    trimmedNumString = trimmedNumString.replace(regexPattern, "");

    if (trimmedNumString === "") trimmedNumString = "0";

    return trimmedNumString
}


function updateScreen(displayValue) {
    displayValue = removeLeftZeros(displayValue);
    screen.innerText = displayValue;
}


function resetOperation() {
    num1 = null;
    num2 = null;
    operator = null;
    num1Entered = false;
}


function clearAll() {
    num1 = null;
    num2 = null;
    operator = null;
    screen.innerText = "0";
}


function correctNumberForm(number, targetValue, decimalBtn) {
    let correctForm;

    if (targetValue === 'addDecimal') {
        correctForm = number === null ? '0.' : String(number) + '.';
        deactivateBtn(decimalBtn);
    } else {
        correctForm = number === null ? targetValue : String(number) + targetValue;
    }

    return correctForm    
}


function deleteLastCharacter(numString, decimalBtn) {
    let trimmedNumString;
    let lastCharacter;
    
    if (numString === null) numString = "0";

    if (numString.length >= 1) {
        lastCharacter = numString.slice(-1);
    }

    if (numString.length > 1) {
        trimmedNumString = numString.slice(0, -1);
    } else {
        trimmedNumString = '0';
    }

    if (lastCharacter === '.') {
        activateBtn(decimalBtn);
    }

    return trimmedNumString
}



function activateBtn(btn) {
    btn.disabled = false;
}


function deactivateBtn(btn) {
    btn.disabled = true;
}


allBtnContainer.addEventListener("click", (event) => {
    let target = event.target;
    let targetValue = target.value;
    let isTargetANumber = isNumber(targetValue);
    let targetMathRole = target.getAttribute('mathrole');
    
    if (
        (targetMathRole === 'operand' && operator === null) ||
        (targetValue === 'addDecimal' && num2 === null) &&
        (!num1Entered)
    ) {
       
        num1 = correctNumberForm(num1, targetValue, decimalBtn);

        currentResult = num1;
        updateScreen(num1);

    } else if (
        targetMathRole === 'operator' &&
        targetValue !== 'equal' &&
        targetValue !== 'addDecimal' &&
        targetValue !== 'del'
    ) {

        activateBtn(decimalBtn);   
        
        if (currentResult !== null) num1 = currentResult;

        if (num2 === null) {
            currentResult = num1;
        } else {
            currentResult = operate(num1, num2, operator);
            updateScreen(currentResult);
            num2 = null;
        }
        
        num1Entered = true;
        operator = targetValue;

    } else if (
        (targetMathRole === 'operand' && operator !== null) ||
        targetValue === 'addDecimal'
    ) {

        num2 = correctNumberForm(num2, targetValue, decimalBtn);
        updateScreen(num2);

    } 

    if (targetValue === 'equal') {

        activateBtn(decimalBtn);

        if (num1 && num2 && operator) {
            currentResult = operate(num1, num2, operator);
        }

        updateScreen(currentResult);
        resetOperation();
    } else if (targetValue === 'clearAll') {
        clearAll();
    } else if (targetValue === 'del') {
        if (num2 === null) {
            num1 = deleteLastCharacter(num1, decimalBtn);
            updateScreen(num1);
        } else {
            num2 = deleteLastCharacter(num2, decimalBtn);
            updateScreen(num2);
        }
    }
        
 
})


function handleKeyboardEvent(event) {
    let pertinentBtn = null;
    const key = event.key;
    
    switch (true) {

        case (key >= '0' && key <= '9'):
            pertinentBtn = document.querySelector(`button[value="${key}"]`);
            break;
        
        case (key === 'Enter' || key === '='):
            pertinentBtn = document.querySelector('button[value="equal"]');
            break;
            
        case (key === 'Delete' || key === 'Backspace'):
            pertinentBtn = document.querySelector('button[value="del"');
            break;

        case (key === '+'):
            pertinentBtn = document.querySelector('button[value="add"');
            break;

        case (key === '-'):
            pertinentBtn = document.querySelector('button[value="subtract"');
            break;

        case (key === '*'):
            pertinentBtn = document.querySelector('button[value="multiply"');
            break;

        case (key === '/'):
            pertinentBtn = document.querySelector('button[value="divide"');
            break;

        case (key === '.'):
            pertinentBtn = document.querySelector('button[value="addDecimal"');
            break;

    }


    if (pertinentBtn) {
        pertinentBtn.click();
    }
}


document.addEventListener('keydown', handleKeyboardEvent);


let startFunction = (function () {
    updateScreen(0);
})();
