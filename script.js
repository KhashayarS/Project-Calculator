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


function updateScreen(displayValue) {
    screen.innerText = displayValue;
}


function resetOperation() {
    num1 = null;
    num2 = null;
    operator = null;
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
        (targetValue === 'addDecimal' && num2 === null)
    ) {
       
        num1 = correctNumberForm(num1, targetValue, decimalBtn);

        console.log('num1 =>', num1);
        currentResult = num1;
        updateScreen(num1);

    } else if (
        targetMathRole === 'operator' &&
        targetValue !== 'equal' &&
        targetValue !== 'addDecimal'
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

        operator = targetValue;

    } else if (
        (targetMathRole === 'operand' && operator !== null) ||
        targetValue === 'addDecimal'
    ) {

        num2 = correctNumberForm(num2, targetValue, decimalBtn);
        updateScreen(num2);
        console.log('num2 =>', num2);

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
    }
 
})


let startFunction = (function () {
    updateScreen(0);
})();
