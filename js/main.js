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
    } else if(operator === "/") {
        return divideOp(a, b);
    } else if(operator === "%") {
        return moduleOp(a, b);
    }
}

console.log(operate("%", 10, 4));