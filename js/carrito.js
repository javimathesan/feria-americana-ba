// Carrito de compras: se inicializa leyendo lo que haya guardado en localStorage
let carrito = cargarCarrito();
renderizarCarrito(); // Pinta el estado inicial del carrito al cargar la página

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
  renderizarCarrito();
  mostrarNotificacionAgregado(producto.nombre);
}

// Elimina un producto del carrito por su id
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
  mostrarNotificacionEliminado();
}

// Calcula el total a pagar sumando precio * cantidad de cada item
function calcularTotal() {
  return carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
}

// Actualiza el número que se ve en el botón "Ver Carrito"
function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  contador.textContent = totalItems;
}

// Genera el HTML del carrito y actualiza total + contador
function renderizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    totalCarrito.textContent = formatearPrecio(0);
    actualizarContador();
    return;
  }

  listaCarrito.innerHTML = carrito.map(item => `
    <div class="item-carrito" data-id="${item.id}">
      <img src="img/${item.imagen}" alt="${item.nombre}" class="item-imagen">
      <div class="info-item">
        <p class="nombre-item">${item.nombre}</p>
        <p class="cantidad-item">Cantidad: ${item.cantidad}</p>
        <p class="subtotal-item">${formatearPrecio(item.precio * item.cantidad)}</p>
      </div>
      <button class="btn-eliminar" data-id="${item.id}">✕</button>
    </div>
  `).join('');

  totalCarrito.textContent = formatearPrecio(calcularTotal());
  actualizarContador();
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

// Muestra una notificación tipo "toast" cuando se elimina un producto
function mostrarNotificacionEliminado() {
  Toastify({
    text: 'Producto eliminado del carrito',
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: '#6b4226'
    }
  }).showToast();
}
// Alterna la visibilidad del panel del carrito al hacer click en "Ver Carrito"
const btnVerCarrito = document.getElementById('btn-ver-carrito');
const panelCarrito = document.getElementById('carrito');

btnVerCarrito.addEventListener('click', () => {
  panelCarrito.classList.toggle('oculto');
});

// Detecta clicks en los botones "eliminar" de cada item (event delegation)
const listaCarrito = document.getElementById('lista-carrito');

listaCarrito.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-eliminar')) {
    const id = Number(evento.target.dataset.id);
    eliminarDelCarrito(id);
  }
});

// Finaliza la compra: muestra agradecimiento y vacía el carrito
function realizarCompra() {
  if (carrito.length === 0) {
    Toastify({
      text: 'Tu carrito está vacío 🛍️',
      duration: 2000,
      gravity: 'top',
      position: 'right',
      style: { background: '#b33a3a' }
    }).showToast();
    return;
  }

  Toastify({
    text: '¡Gracias por tu compra! 💛',
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: { background: '#4a7c59' }
  }).showToast();

  carrito = [];
  guardarCarrito();
  renderizarCarrito();
}

// Escucha el click en el botón "Realizar compra"
const btnComprar = document.getElementById('btn-comprar');
btnComprar.addEventListener('click', realizarCompra);
