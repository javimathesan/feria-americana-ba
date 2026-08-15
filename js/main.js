// Referencia al contenedor donde se van los productos
const contenedorCatalogo = document.getElementById('catalogo');

// Trae los productos desde el archivo JSON 
async function obtenerProductos() {
  try {
    const respuesta = await fetch('data/productos.json');
    const productos = await respuesta.json();
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

// Inicia la carga del catálogo al cargar la página
obtenerProductos();
