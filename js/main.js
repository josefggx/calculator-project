// Functions with basic operations
const addOp = (a, b) => {
    const num = a + b;
    return Math.round((num + Number.EPSILON) * 100) / 100;
};
const subtractOp = (a, b) => {
    const num = a - b;
    return Math.round((num + Number.EPSILON) * 100) / 100;
};
const multiplyOp = (a, b) => {
    const num = a * b;
    return Math.round((num + Number.EPSILON) * 100) / 100;
};
const divideOp = (a, b) => {
    const num = a / b;
    return Math.round((num + Number.EPSILON) * 100) / 100;
};
const moduleOp = (a, b) => {
    const num = a % b;
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

// Operate function
const operate = (operator, a, b) => {
    if(operator === "+") {
        return addOp(a, b);
    } else if(operator === "-") {
        return subtractOp(a, b);
    } else if(operator === "x") {
        return multiplyOp(a, b);
    } else if(operator === "÷") {
        return divideOp(a, b);
    } else if(operator === "%") {
        return moduleOp(a, b);
    }
}

const mainDisplay = document.querySelector("#current-number");
const secDisplay = document.querySelector("#last-operation")

let numberOne = "";
let numberTwo = "";
let operation;
let numberPressed = false;
let operationPressed = false;
let decimalPressed = false;
let zeroPressed = false;

// Selecting All buttons
const numberButtons = document.querySelectorAll('.number-btn');
const decimalButton = document.querySelector('.decimal-btn');
const zeroButton = document.querySelector('#zero')
// @ts-ignore
zeroButton.disabled = true;

const functionality = () => {
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            numberOne = `${numberOne}${button.textContent}`
            mainDisplay.innerHTML = numberOne;
            numberPressed = true;
            operationPressed = false;
            if(numberOne !== "0") {
                // @ts-ignore
                zeroButton.disabled = false;
                // @ts-ignore
            } else if(numberOne === "0" && decimalButton.disabled === false) {
                // @ts-ignore
                zeroButton.disabled = true;
            }
            if(mainDisplay.innerHTML === ".") {
                decimalPressed = true;
                if(decimalPressed) {
                    // @ts-ignore
                    decimalButton.disabled = true;
                    numberOne = `0${button.textContent}`
                    mainDisplay.innerHTML = numberOne;
                }
            }
            decimalButton.addEventListener('click', () => {
                decimalPressed = true;
                if(decimalPressed) {
                    // @ts-ignore
                    decimalButton.disabled = true;
                }
            })
            // @ts-ignore
            if(decimalButton.disabled === true) {
                zeroButton.addEventListener('click', () => {
                    if(zeroPressed) {
                        // @ts-ignore
                        zeroButton.disabled = true;
                    }
                })
            }
        });
    });
}

functionality();

const operationButtons = document.querySelectorAll('.operation-btn');
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // if(secDisplay.innerHTML !== '') { 
        numberOne = mainDisplay.innerHTML;
        //     operation = button.textContent;
        //     secDisplay.innerHTML = `${numberOne} ${operation}`;
        // }
        operation = button.textContent;
        secDisplay.innerHTML = `${numberOne} ${operation}`;
        // @ts-ignore
        if(decimalButton.disabled === true) {
            zeroButton.addEventListener('click', () => {
                if(zeroPressed) {
                    // @ts-ignore
                    zeroButton.disabled = true;
                }
            })
        }
        if(numberOne == "0") {
            // @ts-ignore
            zeroButton.disabled = false;
        }
        secNumber();
        numberPressed = false;
        operationPressed = true;
        // @ts-ignore
        decimalButton.disabled = false;
    });
});

const secNumber = () => {
    let numberTwo = "";
    if(secDisplay.innerHTML !== '') {
        numberButtons.forEach((button) => {
            // @ts-ignore
            button.addEventListener('click', () => {
                if(numberTwo === "0") {
                    numberTwo = numberTwo.substring(1);
                    mainDisplay.innerHTML = numberTwo;
                    numberPressed = true;
                    operationPressed = false;
                }
                numberTwo = `${numberTwo}${button.textContent}`
                mainDisplay.innerHTML = numberTwo;
                if(mainDisplay.innerHTML === ".") {
                    decimalPressed = true;
                    if(decimalPressed) {
                        // @ts-ignore
                        decimalButton.disabled = true;
                        numberTwo = `0${button.textContent}`
                        mainDisplay.innerHTML = numberTwo;
                    }
                }
            });
        });
    }
}

const resetDisplayAfterEqual = () => {
    numberOne = "";
    let newNumber = "";
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(newNumber == ".") {
                newNumber = `0${newNumber}`;
            }
            if(newNumber == "0") {
                newNumber = ``;
            }
            newNumber = `${newNumber}${button.textContent}`
            mainDisplay.innerHTML = newNumber;
        });
    });
}

const resultFunction = () => {
    if(numberPressed) {
        // @ts-ignore
        numberOne = parseFloat(secDisplay.innerHTML);
        // @ts-ignore
        numberTwo = parseFloat(mainDisplay.innerHTML);
        let result = operate(operation, numberOne, numberTwo);
        // console.log(numberOne, operation, numberTwo, "=", result);
        secDisplay.innerHTML = "";
        // secDisplay.innerHTML = `${secDisplay.innerHTML} ${numberTwo}`;
        if(mainDisplay.innerHTML.endsWith(".")) {
            // @ts-ignore
            mainDisplay.innerHTML = numberOne;
            // @ts-ignore
            decimalButton.disabled = false;
        }
        if(typeof result !== "number") {
            numberOne = "";
            // @ts-ignore
            decimalButton.disabled = false;
        } else if(result == 0) {
            numberOne = "";
            mainDisplay.innerHTML = "0";
        } else {
            // @ts-ignore
            mainDisplay.innerHTML = result;
            // @ts-ignore
            decimalButton.disabled = false;
            resetDisplayAfterEqual();
            // console.log(numberOne, operation, numberTwo, "=", result);
        }
        if(mainDisplay.innerHTML == "NaN") {
            mainDisplay.innerHTML = numberTwo;
        }
    } else {
        if(mainDisplay.innerHTML == "0") {
            mainDisplay.innerHTML = "0";
        } else {
            mainDisplay.innerHTML = numberOne;
        }
    }
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(mainDisplay.innerHTML === ".") {
                decimalPressed = true;
                if(decimalPressed) {
                    // @ts-ignore
                    decimalButton.disabled = true;
                    numberOne = `0${button.textContent}`
                    mainDisplay.innerHTML = numberOne;
                }
            }
        });
    });
}

const btnResult = document.querySelector("#equal");
btnResult.addEventListener('click', () => {
    resultFunction();
});

// Reload / Clear Function
const reloadFunction = () => {
    mainDisplay.innerHTML = "0";
    secDisplay.innerHTML = "";
    numberOne = "";
    numberTwo = "";
    return;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', () => {
    reloadFunction();
})