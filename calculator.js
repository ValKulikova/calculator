const inputResult = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

let number = null; 
let mathAction = null; 
let isNewNumber = false; 

document.querySelector(".clear").addEventListener("click", () => {
    document.querySelector(".result").value = "0"; 
    number = null; 
    mathAction = null; 
    isNewNumber = true;
});

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const dataType = button.getAttribute("data-type");
        const dataValue = button.getAttribute("data-value");
        action(dataType, dataValue);
    });
});

function action(type, value) {
    if (type === "number") {
        if (inputResult.value === "0" || isNewNumber) {
            inputResult.value = value;
            isNewNumber = false;
        } else {
            inputResult.value += value;
        }
    }

    if (type === "operator") {
        number = parseFloat(inputResult.value);
        mathAction = value; 
        isNewNumber = true;
    }

    if (type === "decimal") {
        if (!inputResult.value.includes(".")) {
            inputResult.value += ".";
        }
    }

    if (type === "equals") {
        if (number !== null && mathAction) {
            let secondNumber = parseFloat(inputResult.value);
            let result;
            if (secondNumber === 0 && mathAction === "/") {
                alert("Ошибка! Деление на ноль запрещено.");
                inputResult.value = "0";
                return; 
            }
            switch (mathAction) {
                case "+":
                    result = number + secondNumber;
                    break;
                case "-":
                    result = number - secondNumber;
                    break;
                case "*":
                    result = number * secondNumber;
                    break;
                case "/":
                    result = number / secondNumber;
                    break;
                default:
                    return;
            }
            inputResult.value = result;
            number = result;
            mathAction = null;
            isNewNumber = true;
        }
    }
}
