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

window.addEventListener('keydown', function (event) {
    if(event.key == "Enter") event.preventDefault();
});

const mainDisplay = document.querySelector("#current-number");
const secDisplay = document.querySelector("#last-operation");

let numberOne = "";
let numberTwo = "";
let operation;
let numberPressed = false;
let operationPressed = false;
let decimalPressed = false;
let zeroPressed = false;
let deleteThisNumber;
let deletedNumber;
const deleteBtn = document.querySelector("#delete");


// Selecting All buttons
const numberButtons = document.querySelectorAll('.number-btn');
const decimalButton = document.querySelector('.decimal-btn');
const zeroButton = document.querySelector('#zero')
// @ts-ignore
zeroButton.disabled = true;

const functionality = () => {
    deleteBtn.addEventListener("click", () => {
        if(mainDisplay.innerHTML.length <= 1) {
            mainDisplay.innerHTML = "0";
            numberOne = "";
        }
        else if(mainDisplay.innerHTML !== "0") {
            deleteThisNumber = mainDisplay.innerHTML;
            deletedNumber = deleteThisNumber.slice(0, -1);
            numberOne = deleteThisNumber.slice(0, -1);
            mainDisplay.innerHTML = deletedNumber;
        }
        if(!mainDisplay.innerHTML.includes(".")) {
            // @ts-ignore
            decimalButton.disabled = false;
        }
    })
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // @ts-ignore
            deleteBtn.disabled = false;
            numberOne = `${numberOne}${button.textContent}`
            mainDisplay.innerHTML = numberOne;
            limitDisplay();
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

const limitDisplay = () => {
    if(mainDisplay.innerHTML.length >= 34) {
        mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
    } else if(mainDisplay.innerHTML.length >= 17) {
        mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
    }
}

const operationButtons = document.querySelectorAll('.operation-btn');
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // @ts-ignore
        if(!secDisplay.innerHTML == "") {
            resultFunction();
        }
        // @ts-ignore
        deleteBtn.disabled = true;
        numberOne = mainDisplay.innerHTML;
        operation = button.textContent;
        if(mainDisplay.innerHTML !== "What are you doing?") {
            secDisplay.innerHTML = `${numberOne} ${operation}`;
        }
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
    deleteBtn.addEventListener("click", () => {
        if(mainDisplay.innerHTML === "0") {
            mainDisplay.innerHTML = "0";
            numberTwo = "";
        }
        else if(mainDisplay.innerHTML !== "0") {
            deletedNumber = mainDisplay.innerHTML;
            numberTwo = deletedNumber;
        }
    })
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
                if(numberTwo.length >= 34) {
                    mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
                } else if(numberTwo.length >= 17) {
                    mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
                }
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



const deleteButton = () => {
    deleteBtn.addEventListener("click", () => {
        deleteThisNumber = mainDisplay.innerHTML;
        deletedNumber = deleteThisNumber.slice(0, -1);
        numberOne = deleteThisNumber.slice(0, -1);
        numberTwo = deleteThisNumber.slice(0, -1);
        mainDisplay.innerHTML = deletedNumber;
    })
}


const resetDisplayAfterEqual = () => {
    numberOne = "";
    let newNumber = ""
    if(mainDisplay.innerHTML == "What are you doing?") {
        // @ts-ignore
        operationButtons.disabled = true;
    }
    deleteBtn.addEventListener("click", () => {
        if(mainDisplay.innerHTML === "0") {
            mainDisplay.innerHTML = "0";
            newNumber = "";
        }
        else if(mainDisplay.innerHTML !== "0") {
            deletedNumber = mainDisplay.innerHTML;
            newNumber = deletedNumber;
            // @ts-ignore
        }
    })
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
            if(newNumber.length >= 34) {
                mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
            } else if(newNumber.length >= 17) {
                mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
            }
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
            resetDisplayAfterEqual();
        } else if(result == Infinity) {
            mainDisplay.innerHTML = "What are you doing?";
            resetDisplayAfterEqual();
            // @ts-ignore
            operationButtons.disabled = true;
            // @ts-ignore
            decimalButton.disabled = false;
        }
        else if(mainDisplay.innerHTML == "What are you doing?") {
            numberOne = "";
            mainDisplay.innerHTML = "0";
            resetDisplayAfterEqual();
        } else {
            limitDisplay();
            // @ts-ignore
            mainDisplay.innerHTML = result;
            // @ts-ignore
            decimalButton.disabled = false;
            if(mainDisplay.innerHTML.length >= 34) {
                mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
            } else if(mainDisplay.innerHTML.length >= 17) {
                mainDisplay.innerHTML = parseFloat(mainDisplay.innerHTML).toExponential(4);
            }
            resetDisplayAfterEqual();
        }
        if(mainDisplay.innerHTML == "What are you doing?") {
            mainDisplay.innerHTML = "What are you doing?";
        } else if(mainDisplay.innerHTML == "NaN") {
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
    if(mainDisplay.innerHTML !== "What are you doing?") {
        limitDisplay();
    }
    // @ts-ignore
    deleteBtn.disabled = true;
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
    resetDisplayAfterEqual();
})

const buttonZero = document.querySelector("#zero")
const buttonOne = document.querySelector("#one");
const buttonTwo = document.querySelector("#two");
const buttonThree = document.querySelector("#three");
const buttonFour = document.querySelector("#four");
const buttonFive = document.querySelector("#five");
const buttonSix = document.querySelector("#six");
const buttonSeven = document.querySelector("#seven");
const buttonEigth = document.querySelector("#eigth");
const buttonNine = document.querySelector("#nine");
const buttonModule = document.querySelector("#module");
const buttonDelete = document.querySelector("#delete");
const buttonClear = document.querySelector("#clear");
const buttonDecimal = document.querySelector("#decimal-dot");
const buttonEqual = document.querySelector("#equal");
const buttonAdd = document.querySelector("#add");
const buttonSubtract = document.querySelector("#subtract");
const buttonMultiply = document.querySelector("#multiply");
const buttonDivide = document.querySelector("#divide");

window.addEventListener("keyup", function (event) {
    if(event.key === "*") {
        event.preventDefault();
        // @ts-ignore
        buttonMultiply.click();
    }
    if(event.key === "/") {
        event.preventDefault();
        // @ts-ignore
        buttonDivide.click();
    }
    if(event.key === "-") {
        event.preventDefault();
        // @ts-ignore
        buttonSubtract.click();
    }
    if(event.key === "+") {
        event.preventDefault();
        // @ts-ignore
        buttonAdd.click();
    }
    if(event.key === "=" || event.key === "Enter") {
        event.preventDefault();
        // @ts-ignore
        buttonEqual.click();
    }
    if(event.key === ".") {
        event.preventDefault();
        // @ts-ignore
        buttonDecimal.click();
    }
    if(event.key === "%") {
        event.preventDefault();
        // @ts-ignore
        buttonModule.click();
    }
    if(event.key === "Backspace") {
        event.preventDefault();
        // @ts-ignore
        buttonDelete.click();
    }
    if(event.key === "Escape") {
        event.preventDefault();
        // @ts-ignore
        buttonClear.click();
    }
    if(event.key === "1") {
        event.preventDefault();
        // @ts-ignore
        buttonOne.click();
    }
    if(event.key === "2") {
        event.preventDefault();
        // @ts-ignore
        buttonTwo.click();
    }
    if(event.key === "3") {
        event.preventDefault();
        // @ts-ignore
        buttonThree.click();
    }
    if(event.key === "4") {
        event.preventDefault();
        // @ts-ignore
        buttonFour.click();
    }
    if(event.key === "5") {
        event.preventDefault();
        // @ts-ignore
        buttonFive.click();
    }
    if(event.key === "6") {
        event.preventDefault();
        // @ts-ignore
        buttonSix.click();
    }
    if(event.key === "7") {
        event.preventDefault();
        // @ts-ignore
        buttonSeven.click();
    }
    if(event.key === "8") {
        event.preventDefault();
        // @ts-ignore
        buttonEigth.click();
    }
    if(event.key === "9") {
        event.preventDefault();
        // @ts-ignore
        buttonNine.click();
    }
    if(event.key === "0") {
        event.preventDefault();
        // @ts-ignore
        buttonZero.click();
    }
});