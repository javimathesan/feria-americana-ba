// Referencia al contenedor donde se van los productos
const contenedorCatalogo = document.getElementById('catalogo');

// Guarda en memoria los productos traídos del JSON, para poder
// buscarlos luego al agregar al carrito
let productosDisponibles = [];

// Carrito de compras: se inicializa leyendo lo que haya guardado en localStorage
let carrito = cargarCarrito();

// Trae los productos desde el archivo JSON
async function obtenerProductos() {
  try {
    const respuesta = await fetch('data/productos.json');
    const productos = await respuesta.json();
    productosDisponibles = productos;
    renderizarProductos(productos);
  } catch (error) {
    mostrarErrorEnDOM();
  }
}

// Genera el HTML de cada producto y lo inyecta en el catálogo
function renderizarProductos(productos) {
  contenedorCatalogo.innerHTML = productos.map(producto => `
    <article class="tarjeta-producto" data-id="${producto.id}">
      <img src="img/${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio">${formatearPrecio(producto.precio)}</p>
      <button class="btn-agregar">Agregar al carrito</button>
    </article>
  `).join('');
}

// Formatea un número como moneda argentina, ej: 10000 -> $10.000,00
function formatearPrecio(numero) {
  return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

// Muestra un mensaje de error dentro del DOM si falla la carga del JSON
function mostrarErrorEnDOM() {
  contenedorCatalogo.innerHTML = '<p class="error">No se pudieron cargar los productos. Intentá más tarde.</p>';
}

// Delegación de eventos: un solo listener en el contenedor padre,
// detecta clics en cualquier botón "Agregar al carrito" aunque
// las tarjetas se hayan creado dinámicamente
contenedorCatalogo.addEventListener('click', function (evento) {
  if (evento.target.classList.contains('btn-agregar')) {
    const tarjeta = evento.target.closest('.tarjeta-producto');
    const id = Number(tarjeta.dataset.id);
    agregarAlCarrito(id);
  }
});

// Busca el producto por id y lo agrega al carrito (o suma cantidad si ya estaba)
function agregarAlCarrito(id) {
  const producto = productosDisponibles.find(p => p.id === id);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarNotificacionAgregado(producto.nombre);
}

// Guarda el carrito actual en localStorage como JSON
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Recupera el carrito guardado en localStorage (o un array vacío si no hay nada)
function cargarCarrito() {
  const datosGuardados = localStorage.getItem('carrito');
  return datosGuardados ? JSON.parse(datosGuardados) : [];
}

// Muestra una notificación tipo "toast" cuando se agrega un producto
function mostrarNotificacionAgregado(nombreProducto) {
  Toastify({
    text: `${nombreProducto} agregado al carrito 🛒`,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: {
      background: '#4a7c59'
    }
  }).showToast();
}

// Inicia la carga del catálogo al cargar la página
obtenerProductos();
