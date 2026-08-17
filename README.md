# Entre Perchas — Feria Americana BA

Proyecto final del curso de JavaScript de Coderhouse. Es una tienda web
de ropa usada estilo "feria americana", donde el usuario puede ver un
catálogo de productos, agregarlos a un carrito de compras y finalizar
una simulación de compra.

## Funcionalidades

- [x] Catálogo de productos cargado dinámicamente desde un archivo JSON externo (Fetch API + async/await)
- [x] Renderizado del catálogo en el DOM
- [x] Agregar productos al carrito
- [x] Ver listado del carrito con persistencia en localStorage
- [x] Cálculo automático del precio total
- [x] Eliminar productos del carrito
- [x] Botón "Realizar compra" con confirmación y vaciado del carrito
- [x] Notificaciones con librería externa (Toastify)

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+, Fetch API, async/await)
- [Toastify JS](https://apvarun.github.io/toastify-js/)
- LocalStorage API

## Estructura del proyecto

feria-americana-ba/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── carrito.js
├── data/
│   └── productos.json
├── img/
└── README.md

## Cómo correr el proyecto localmente

1.Cloná el repositorio: git clone <https://github.com/javimathesan/feria-americana-ba.git>
2.Abrí la carpeta del proyecto.
3.Abrí `index.html` en el navegador (se recomienda usar la extensión "Live Server" de VS Code para evitar problemas con Fetch y archivos locales).

## Demo

 <https://javimathesan.github.io/feria-americana-ba/>

## Repositorio

<https://github.com/javimathesan/feria-americana-ba>

## Reflexión final

Este fue mi proyecto Final de JavaScript de punta a punta, y me sirvió
para entender cómo se conecta todo: datos, DOM, eventos y persistencia.

Lo más difícil fue, sin duda, el carrito. Entre manejar el estado, agregar
y eliminar productos, calcular el total, y sincronizar todo con
`localStorage` sin romper nada, tuve que reescribir varias veces la lógica
hasta que quedó prolija. También me costó separar bien las
responsabilidades entre `script.js` (catálogo) y `carrito.js` (carrito),
pero al final entendí que esa separación era justamente lo que me
facilitaba debuggear cada parte por separado.

Trabajar con Fetch y JSON externo, y reemplazar los `alert()` nativos por
Toastify, también fue un cambio de mentalidad: pensar en cómo se ve la
experiencia del usuario, no solo en que "funcione".

El deploy en GitHub Pages: tuve que revisar
rutas y confirmar que todo cargara bien fuera de mi máquina.

En resumen, me llevo aprendido que planificar antes de codear (estructura,
archivos, nombres) ahorra mucho tiempo después, y que el carrito, aunque
parezca "simple", es donde realmente se pone a prueba todo lo aprendido.

## Autor

Javier Matheus — Curso de JavaScript, Coderhouse
