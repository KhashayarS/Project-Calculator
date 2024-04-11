/*==========================================================*
 *                Code written by: Khashayar                *
 *                Github account: KhashayarS                *
 *==========================================================*/

/* Global variables and constants */
// let num1 = null;
// let num2 = null;
let operator = null;
let inputNumber = "";
let currentResult = "";
let isFirstNumEntered = false;

const allBtnContainer = document.querySelector("#allBtnContainer");
const clearBtn = document.querySelector("#clearBtn");
const decimalBtn = document.querySelector("#decimalBtn");
const topScreen = document.querySelector("#topScreen");
const screen = document.querySelector("#screen");

let naughtyImg = null;

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
    
    outputStr = String(output);

    return outputStr
}


function isNumber(value) {
    let isNotNaN = !isNaN(value);
    return isNotNaN
}


function removeLeftZeros(numString) {
    let trimmedNumString = String(numString);
    let regexPattern = /^0+/;
    
    if (!trimmedNumString.startsWith("0.")) trimmedNumString = trimmedNumString.replace(regexPattern, "");

    if (trimmedNumString === "") trimmedNumString = "0";

    return trimmedNumString
}


function updateScreen(displayValue) {

    if (displayValue === 'Infinity' || !isFinite(displayValue)) {
        naughtyImg = document.createElement("img");
        naughtyImg.setAttribute("src", "./static/naughty_naughty.gif");
        naughtyImg.id = "naughtyImg";
        topScreen.appendChild(naughtyImg);
        displayValue = "Naughty! Never divide a number by zero!";
    } else {
        displayValue = removeLeftZeros(displayValue);
    }
    
    if (displayValue.includes(".")) displayValue = roundLongDecimals(displayValue);
    screen.innerText = displayValue;
}


function removeNaughty() {
    if (topScreen.hasChildNodes(naughtyImg)) topScreen.removeChild(naughtyImg);
}

function clearAll() {
    inputNumber = "";
    currentResult = "";
    operator = null;
    isFirstNumEntered = false;
    screen.innerText = "0";
    removeNaughty();
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


function roundLongDecimals(numString, decimalPlaces=7) {
    let numStringDoubleChecked = String(numString);
    let seperatedParts = numStringDoubleChecked.split('.');
    let integerPart = seperatedParts[0];
    let decimalPart = seperatedParts[1].slice(0, 7);

    let trimmedOutput = `${integerPart}.${decimalPart}`;
    
    return trimmedOutput
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

    removeNaughty();
    
    if (
        (targetMathRole === 'operand') ||
        (targetValue === 'addDecimal') &&
        (!isFirstNumEntered)
    ) {
       
        inputNumber = correctNumberForm(inputNumber, targetValue, decimalBtn);

        updateScreen(inputNumber);

    } else if (
        targetMathRole === 'operator' &&
        targetValue !== 'equal' &&
        targetValue !== 'addDecimal' &&
        targetValue !== 'del'
    ) {
        
        activateBtn(decimalBtn);   
        
        if (!isFirstNumEntered) {
            currentResult = inputNumber;
            isFirstNumEntered = true;
        } else if (operator !== null) {
            currentResult = operate(currentResult, inputNumber, operator);
        }
        
        operator = targetValue;
        inputNumber = "";

        updateScreen(currentResult);
        

    } else if (
        (targetMathRole === 'operand' && operator !== null) ||
        targetValue === 'addDecimal'
    ) {
        
        if (inputNumber === "") inputNumber = "0";
        inputNumber = correctNumberForm(inputNumber, targetValue, decimalBtn);
        updateScreen(inputNumber);

    } 

    if (targetValue === 'equal' && currentResult !=="") {

        activateBtn(decimalBtn);

        if (inputNumber && currentResult && operator) {
            currentResult = operate(currentResult, inputNumber, operator);
        }

        if (currentResult !== null) updateScreen(currentResult);
        
        inputNumber = "";
        operator = null;

    } else if (targetValue === 'clearAll') {

        clearAll();

    } else if (targetValue === 'del') {
        
        if (inputNumber !== "") {

            inputNumber = deleteLastCharacter(inputNumber, decimalBtn);
            updateScreen(inputNumber);
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
