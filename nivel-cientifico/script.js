// Estructura de Datos de Unidades Relativas al Pivote Central
const magnitudes = {
    longitud: {
        base: "m",
        units: {
            "m": { label: "Metros (m)", factor: 1 },
            "km": { label: "Kilómetros (km)", factor: 1000 },
            "cm": { label: "Centímetros (cm)", factor: 0.01 },
            "mm": { label: "Milímetros (mm)", factor: 0.001 },
            "in": { label: "Pulgadas (in)", factor: 0.0254 },
            "ft": { label: "Pies (ft)", factor: 0.3048 }
        }
    },
    masa: {
        base: "kg",
        units: {
            "kg": { label: "Kilogramos (kg)", factor: 1 },
            "g": { label: "Gramos (g)", factor: 0.001 },
            "lb": { label: "Libras (lb)", factor: 0.45359237 },
            "oz": { label: "Onzas (oz)", factor: 0.028349523 }
        }
    },
    volumen: {
        base: "L",
        units: {
            "L": { label: "Litros (L)", factor: 1 },
            "mL": { label: "Mililitros (mL)", factor: 0.001 },
            "m3": { label: "Metros Cúbicos (m³)", factor: 1000 },
            "gal": { label: "Galones (gal)", factor: 3.78541 },
            "cup": { label: "Tazas (cup)", factor: 0.236588 }
        }
    },
    temperatura: {
        base: "C", // Especial: Requiere funciones en lugar de factores multiplicativos directos
        units: {
            "C": { label: "Celsius (°C)" },
            "F": { label: "Grid Fahrenheit (°F)" },
            "K": { label: "Kelvin (K)" }
        }
    }
};

const categorySelect = document.getElementById("category-select");
const unitFrom = document.getElementById("unit-from");
const unitTo = document.getElementById("unit-to");
const displayInput = document.getElementById("display-input");
const displayOutput = document.getElementById("display-output");

let currentInputStr = "0";

/* --- Inicialización y Eventos de Interfaz --- */
categorySelect.addEventListener("change", populateUnits);
unitFrom.addEventListener("change", ejecutarConversion);
unitTo.addEventListener("change", ejecutarConversion);

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => handleKeypad(btn.dataset.key));
});

// Arrancar por defecto
populateUnits();

function populateUnits() {
    const cat = categorySelect.value;
    const unitsData = magnitudes[cat].units;
    
    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    Object.keys(unitsData).forEach((key, index) => {
        const optionFrom = new Option(unitsData[key].label, key);
        const optionTo = new Option(unitsData[key].label, key);
        unitFrom.add(optionFrom);
        unitTo.add(optionTo);
        
        // Hacer que por defecto la unidad de destino sea la segunda para no clonar la misma
        if(index === 1) optionTo.selected = true;
    });

    currentInputStr = "0";
    actualizarPantallas();
}

/* --- Captura y Control de Teclado --- */
function handleKeypad(key) {
    if (!isNaN(key) || key === ".") {
        if (currentInputStr === "0" && key !== ".") currentInputStr = "";
        if (key === "." && currentInputStr.includes(".")) return;
        currentInputStr += key;
    } else if (key === "C") {
        currentInputStr = "0";
    } else if (key === "Backspace") {
        currentInputStr = currentInputStr.slice(0, -1);
        if (currentInputStr === "" || currentInputStr === "-") currentInputStr = "0";
    } else if (key === "+/-") {
        if (currentInputStr !== "0") {
            if (currentInputStr.startsWith("-")) {
                currentInputStr = currentInputStr.slice(1);
            } else {
                currentInputStr = "-" + currentInputStr;
            }
        }
    }
    actualizarPantallas();
}

function actualizarPantallas() {
    displayInput.textContent = currentInputStr;
    ejecutarConversion();
}

/* --- MOTOR ARQUITECTÓNICO DE PIVOTE CENTRAL --- */
function ejecutarConversion() {
    const value = parseFloat(currentInputStr);
    if (isNaN(value)) {
        displayOutput.textContent = "0";
        return;
    }

    const cat = categorySelect.value;
    const from = unitFrom.value;
    const to = unitTo.value;

    if (from === to) {
        displayOutput.textContent = formatearResultado(value);
        return;
    }

    let resultado = 0;

    // Caso Especial de Temperatura (Ecuaciones lineales algorítmicas)
    if (cat === "temperatura") {
        let celsiusPivote = 0;
        
        // 1. Convertir origen al Pivote Central (Celsius)
        if (from === "C") celsiusPivote = value;
        else if (from === "F") celsiusPivote = (value - 32) * 5 / 9;
        else if (from === "K") celsiusPivote = value - 273.15;

        // 2. Convertir del Pivote Central al destino final
        if (to === "C") resultado = celsiusPivote;
        else if (to === "F") resultado = (celsiusPivote * 9 / 5) + 32;
        else if (to === "K") resultado = celsiusPivote + 273.15;
        
    } else {
        // Caso Estándar Mutacional (Multiplicadores Directos de Pivote)
        const dataUnits = magnitudes[cat].units;
        
        // 1. Convertir origen a la unidad Base Pivote (Multiplicando por su factor)
        const valorEnBase = value * dataUnits[from].factor;
        
        // 2. Convertir de la unidad Base al destino final (Dividiendo por su factor)
        resultado = valorEnBase / dataUnits[to].factor;
    }

    displayOutput.textContent = formatearResultado(resultado);
}

function formatearResultado(num) {
    // Si tiene demasiados decimales, los limita a 5 para no deformar la pantalla táctil
    if (num.toString().includes(".") && num.toString().split(".")[1].length > 5) {
        return parseFloat(num.toFixed(5)).toString();
    }
    return num.toString();
}