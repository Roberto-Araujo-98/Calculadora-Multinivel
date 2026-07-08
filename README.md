# Calculadora-Multinivel
proyecto web
[` 🚀 Ejecutar Calculadora en Vivo `]( https://roberto-araujo-98.github.io/Calculadora-Multinivel/)

# 📝 Bitácora Técnica: Proyecto Calculadora Multinivel

Este documento sirve como registro de diseño y decisiones arquitectónicas tomadas durante el desarrollo para su futura consulta, mantenimiento o escalabilidad.

---

## 🧭 Decisiones de Arquitectura y Estructura

* **Enfoque Modular**: Se dividió el proyecto en subcarpetas independientes (`nivel-basico`, `nivel-avanzado`, `nivel-cientifico`). Esto aísla los scripts de JavaScript, asegurando que un cambio en la lógica avanzada no impacte la estabilidad de los módulos de producción esenciales.
* **Centralización de Recursos (`/assets`)**: Se migró a una arquitectura de almacenamiento estático unificado en la raíz del proyecto. Todos los módulos consumen las imágenes y animaciones (`fox.gif` / `fox.jpg`) de forma relativa (`../assets/`), optimizando el peso del repositorio y eliminando la duplicación innecesaria de archivos.
* **Optimización de Jerarquía DOM**: Se unificó la estructura de los contenedores principales bajo un único ID unívoco (`#calc-card`). Se eliminaron redundancias de anidación que provocaban colisiones visuales entre las sombras y bordes originales (Cyberpunk Azul) y los estados alterados.
* **Enrutamiento Estático**: Aprovechamos el sistema de rutas nativo de **GitHub Pages**. La URL raíz carga el portal de inicio y las subrutas (como `/nivel-cientifico/`) cargan los módulos correspondientes de manera limpia.

---

## 🧠 Lógica Clave de la Arquitectura (JavaScript)

Al retomar el proyecto en el futuro, tener en cuenta los siguientes enfoques de programación e hitos técnicos alcanzados:

### 1. Manejo de Operaciones Aritméticas
Para evaluar las expresiones en las calculadoras Básica y Avanzada se evita estrictamente el uso de `eval()` por razones de seguridad de inyección de código. Se procesan los operandos y el operador activo de forma secuencial controlada.

### 2. Módulo Científico, de Conversión y Bases Informáticas
* **Pivote Central**: El conversor de unidades utiliza un modelo de arquitectura de pivote (ej. convertir siempre a Celsius como punto medio y luego a la unidad destino). Esto reduce exponencialmente las funciones matemáticas necesarias de $N^2$ a solo $2N$.
* **Filtros de Entrada Dinámicos**: El teclado numérico muta en tiempo real según el sistema seleccionado (Binario, Octal, Decimal, Hexadecimal), deshabilitando los canales de entrada inválidos e inyectando dinámicamente bloques para los caracteres alfanuméricos (`A-F`).

### 3. Resolución de Colisiones de Comandos (`CLEAR`)
Se aisló por completo el comportamiento de la tecla de borrado. Originalmente, el caracter de limpieza `"C"` colisionaba con el dígito hexadecimal `"C"` (equivalente a 12). Se reestructuró el sistema de eventos migrando el token de control a `"CLEAR"`, otorgándole prioridad absoluta al borrado antes de la evaluación de cadenas.

### 4. Sincronización Global de Estado (Modo Overclock)
Se implementó un receptor universal persistente mediante `localStorage`. Cuando se activa la sobrecarga crítica, el estado se comparte síncronamente entre el Portal de Inicio y todos los submódulos. JS inyecta estilos directos en línea (`.style.boxShadow`, `.style.borderColor`) sobrepasando las clases base de Tailwind para pintar el ecosistema de rojo carmesí en caliente.

---

## 🚀 Hoja de Ruta para el Futuro (Siguientes Pasos)

Si decido retomar este repositorio más adelante para expandir mi portafolio, estas son las extensiones lógicas planificadas:

* [ ] **Historial de Operaciones con LocalStorage**: Implementar un panel desplegable que guarde el registro de los últimos 10 cálculos realizados en la calculadora avanzada, persistiendo los datos incluso al cerrar el navegador.
* [ ] **Soporte PWA (Progressive Web App)**: Añadir un archivo `manifest.json` y un *Service Worker* básico para que la aplicación sea instalable en dispositivos móviles y de escritorio, permitiendo su ejecución al 100% **sin conexión a internet**.
* [ ] **Migración a Tauri**: Transformar este entorno web en una aplicación de escritorio nativa y ultraligera para Windows/Mac/Linux, montando la estructura actual de HTML/CSS/JS sobre un backend eficiente en **Rust** sin necesidad de rediseñar la interfaz.
* [ ] **Pruebas Unitarias (Jest)**: Desarrollar un set de pruebas automatizadas para los factores de conversión críticos y funciones trigonométricas, garantizando que el redondeo de flotantes sea exacto en entornos científicos.