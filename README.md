# Calculadora-Multinivel
proyecto web
[` 🚀 Ejecutar Calculadora en Vivo `]( https://roberto-araujo-98.github.io/Calculadora-Multinivel/)

# 📝 Bitácora Técnica: Proyecto Calculadora Multinivel

Este documento sirve como registro de diseño y decisiones arquitectónicas tomadas durante el desarrollo para su futura consulta, mantenimiento o escalabilidad.

---

## 🧭 Decisiones de Arquitectura y Estructura

* **Enfoque Modular**: Se rechazó la idea de una sola calculadora gigante. En su lugar, se dividió el proyecto en 3 subcarpetas independientes (`nivel-basico`, `nivel-avanzado`, `nivel-cientifico`). 
* **Beneficio**: Permite aislar los scripts de JavaScript. Un error en la lógica de conversión del nivel científico no romperá la calculadora básica de producción.
* **Enrutamiento Estático**: Al usar subcarpetas con sus propios archivos `index.html`, aprovechamos el sistema de rutas nativo de **GitHub Pages**. La URL raíz carga el menú y las subrutas (`/nivel-basico/`) cargan los módulos.

---

## 🧠 Lógica Clave a Recordar (JavaScript)

Al retomar el proyecto en el futuro, tener en cuenta los siguientes enfoques de programación:

### 1. Manejo de Operaciones Aritméticas
Para evaluar las pantallas de las calculadoras Básica y Avanzada, evitar el uso de `eval()` por razones de seguridad. Implementar un **analizador de expresiones simple** o utilizar una máquina de estados que procese los operandos (`A` y `B`) y el operador activo secuencialmente.

### 2. Módulo de Conversión (Científico)
Para el conversor de unidades, la arquitectura óptima es utilizar un **Pivote Central** en lugar de programar fórmulas para cada combinación.
* *Ejemplo (Temperatura)*: Convertir siempre la unidad de entrada a **Celsius** (Pivote) y, desde Celsius, convertir a la unidad de destino. Esto reduce las funciones matemáticas de $N^2$ a solo $2N$.

---

## 🚀 Hoja de Ruta para el Futuro (Siguientes Pasos)

Si en unos meses o años decido retomar este repositorio para mejorar mi portafolio, estas son las extensiones lógicas planificadas:

* [ ] **Persistencia con LocalStorage**: Guardar el historial de cálculos de la calculadora avanzada y las últimas conversiones del nivel científico para que no se borren al recargar la página.
* [ ] **Soporte PWA (Progressive Web App)**: Añadir un archivo `manifest.json` y un *Service Worker* básico para que la calculadora multinivel se pueda instalar en el celular y funcione **sin conexión a internet**.
* [ ] **Migración a Tauri**: Si deseo transformar este proyecto web en una aplicación de escritorio ultraligera para Windows/Mac/Linux, la estructura actual limpia de HTML/CSS/JS se puede montar directamente sobre un backend de **Rust** usando Tauri sin rediseñar la interfaz.
* [ ] **Pruebas Unitarias (Jest)**: Crear un set de pruebas para las funciones matemáticas críticas (especialmente trigonometría y factores de conversión) para asegurar que los redondeos decimales sean exactos.
