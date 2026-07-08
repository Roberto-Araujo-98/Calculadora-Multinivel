const display = document.getElementById("display");
const history = document.getElementById("history");
let current = "";
let prev = "";

/* --- Click en botones --- */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        handleInput(btn.dataset.key);
    });
});

/* --- Teclado físico --- */
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
    handleInput(e.key);
});

/* --- Lógica de Control --- */
function handleInput(key) {

    // Manejo de números y punto decimal
    if (!isNaN(key) || key === ".") {
        if (key === "." && current.includes(".")) return;
        current += key;
        update();
        return;
    }

    // Manejo de operadores binarios
    if (["+", "-", "*", "/"].includes(key)) {
        if (current === "" && prev === "") return;
        
        if (current === "" && prev !== "") {
            prev = prev.slice(0, -2) + key + " ";
            update();
            return;
        }

        prev = current + " " + key + " ";
        current = "";
        update();
        return;
    }

    if (key === "Enter") {
        calcular();
        return;
    }

    if (key === "C") {
        current = "";
        prev = "";
        update();
        return;
    }

    if (key === "Backspace") {
        current = current.slice(0, -1);
        update();
    }
}

/* --- Actualizar Interfaz --- */
function update() {
    display.textContent = current || "0";
    history.textContent = prev;
}

/* --- Motor de Cálculo --- */
function calcular() {
    if (current === "" || prev === "") return;

    try {
        let resultado = eval(prev + current);

        if (!isFinite(resultado)) {
            display.textContent = "Error";
            return;
        }

        history.textContent = prev + " " + current + " =";
        current = resultado.toString();
        prev = "";
        display.textContent = current;

    } catch {
        display.textContent = "Error";
    }
}