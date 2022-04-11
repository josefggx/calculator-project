// Functions with basic operations
const addOp = (a, b) => a + b;
const subtractOp = (a, b) => a - b;
const multiplyOp = (a, b) => a * b;
const divideOp = (a, b) => a / b;
const moduleOp = (a, b) => a % b;

// Operate function
const operate = (operator, a, b) => {
    if(operator === "+") {
        return addOp(a, b);
    } else if(operator === "-") {
        return subtractOp(a, b);
    } else if(operator === "x") {
        return multiplyOp(a, b);
    } else if(operator === "&#247;") {
        return divideOp(a, b);
    } else if(operator === "%") {
        return moduleOp(a, b);
    }
}

const mainDisplay = document.querySelector("#current-number");
const secDisplay = document.querySelector("#last-operation")

// Selecting All buttons
const numberButtons = document.querySelectorAll('.number-btn');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector('span').remove()
        mainDisplay.innerHTML = `${mainDisplay.innerHTML}${button.textContent}`;
    });
});

let numberOne;
let numberTwo;
let operation;

const operationButtons = document.querySelectorAll('.operation-btn');
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numberOne = mainDisplay.innerHTML;
        operation = button.textContent;
        secDisplay.innerHTML = `${numberOne} ${operation}`;
        secNumber();
    });
});

const secNumber = () => {
    if(secDisplay.innerHTML !== '') {
        let numberTwo = "";
        numberButtons.forEach((button) => {
            button.addEventListener('click', () => {
                numberTwo = `${numberTwo}${button.textContent}`
                mainDisplay.innerHTML = numberTwo;
            });
        });
    }
}

const btnResult = document.querySelector("#equal");
btnResult.addEventListener('click', () => {
    numberTwo = mainDisplay.innerHTML;
    secDisplay.innerHTML = `${numberOne} ${operation} ${numberTwo}`;
    const result = operate(operation, parseInt(numberOne), parseInt(numberTwo));
    mainDisplay.innerHTML = result;
});
