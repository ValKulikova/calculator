const inputResult = document.querySelector(".result");
const buttons = document.querySelectorAll("button");
const buttonClear = document.querySelector(".clear");

let number = null; 
let mathAction = null; 
let isNewNumber = false; 

buttonClear.addEventListener("click", () => {
    inputResult.value = "0"; 
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
            // mathAction = null;
            isNewNumber = true;
        }
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        action("number", key);
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
        action("operator", key);
    }

    if (key === ".") {
        action("decimal", key);
    }

    if (key === "Enter" || key === "=") {
        action("equals", "=");
    }

    if (key === "Backspace") {
        inputResult.value = inputResult.value.slice(0, -1) || "0";
    }

    if (key === "Escape") {
        buttonClear.click();
    }
});
