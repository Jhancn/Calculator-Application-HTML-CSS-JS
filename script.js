let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let expression = ""; // Renamed for clarity
let arr = Array.from(buttons);

function evaluateExpression() {
    try {
        // Replace any '%' with '/100' to handle percentage calculations
        expression = expression.replace(/%/g, '/100');
        expression = eval(expression).toString(); // Evaluate and convert the result to a string
        input.value = expression;
    } catch (error) {
        input.value = "Error";
        expression = ""; // Reset the expression if there's an error
    }
}

function handleInput(value) {
    if (value === '=') {
        evaluateExpression();
    } else if (value === 'AC') {
        expression = "";
        input.value = expression;
    } else if (value === 'DEL') {
        expression = expression.slice(0, -1);
        input.value = expression;
    } else {
        expression += value;
        input.value = expression;
    }
}

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.textContent);
    });
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();

    const keyMap = {
        'Enter': '=',
        '=': '=',
        'Backspace': 'DEL',
        'Escape': 'AC',
        '%': '%'
    };

    if (keyMap[e.key]) {
        handleInput(keyMap[e.key]);
    } else if (/[0-9+\-*/.]/.test(e.key)) {
        handleInput(e.key);
    }
});
