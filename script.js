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

let allBtnContainer = document.querySelector("#allBtnContainer");
let screen = document.querySelector("#screen");


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
    if (operator === 'add') output = addNumbers(num1, num2);
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


allBtnContainer.addEventListener("click", (event) => {
    let target = event.target;
    let targetValue = target.value;
    let isTargetANumber = isNumber(targetValue);
    let targetMathRole = target.getAttribute('mathrole');

    if (targetMathRole === 'operand' && operator === null) {
        

        num1 = (num1 === null) ? targetValue : String(num1) + targetValue;
        num1 = Number(num1);
        currentResult = num1;
        updateScreen(num1);

    } else if (targetMathRole === 'operator' && targetValue !== 'equal') {
        
        
        if (currentResult !== null) num1 = currentResult;

        if (num2 === null) {
            currentResult = num1;
        } else {
            currentResult = operate(num1, num2, operator);
            updateScreen(currentResult);
            num2 = null;
        }

        operator = targetValue;

    } else if (targetMathRole === 'operand' && operator !== null) {
        num2 = (num2 === null) ? targetValue : String(num2) + targetValue;
        num2 = Number(num2);
        updateScreen(num2);

    }

    if (targetValue === 'equal') {
        if (num1 && num2 && operator) {
            currentResult = operate(num1, num2, operator);
        }

        updateScreen(currentResult);
        resetOperation();
    }

})


let startFunction = (function () {
    updateScreen(0);
})();
