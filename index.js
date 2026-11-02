const topPart = document.getElementById("topPart");
const bottomPart = document.getElementById("bottomPart");

let value = "";

function isOperator(operator) {
    let operators = "%/*-+";
    return operators.includes(operator);
}

function clearAll() {
    topPart.textContent = "";
    bottomPart.textContent = "";
    value = "";
}

function appendSymbol(symbol) {
    if (isOperator(symbol)) {
        if (value == "" && symbol !== "-") {
            return;
        }
        let lastSymbol = value[value.length - 1];
        if (isOperator(lastSymbol)) {
            value = value.slice(0, -1);
        }
    }
    if (symbol == ".") {
        for (let i = value.length - 1; i >= 0; i--) {
            if (value[i] == ".") {
                return;
            }
            if (isOperator(value[i])) {
                break;
            }
        }
    }

    value += symbol;
    bottomPart.textContent = value;
}

function deleteLast() {
    value = value.slice(0, -1);
    bottomPart.textContent = value;
}

function calculate() {
    let lastSymbol = value[value.length - 1];
    if (value == "" || (isOperator(lastSymbol) && lastSymbol != ("%"))) {
        return;
    }

    try {
        let exp = value;

        if (exp[exp.length - 1] == "%") {
            exp = exp.slice(0, -1);
            exp += "/100";
        }
        
        exp = exp.replaceAll("%", "/100*");
        let result = eval(exp);
        topPart.textContent = result;
    } catch (error) {
        topPart.textContent = "Error";
    }
}

function toggle(){
    if(document.body.classList.contains("light")){
        document.body.classList.remove("light");
    }
    else{
        document.body.classList.add("light");
    }
}