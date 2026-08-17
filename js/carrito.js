// Carrito de compras: se inicializa leyendo lo que haya guardado en localStorage
let carrito = cargarCarrito();

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
