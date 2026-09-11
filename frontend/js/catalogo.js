async function mostrarProductos() {
  const contenedor = document.getElementById('lista-productos');

  try {
    const productos = await obtenerProductos();

    if (productos.length === 0) {
      contenedor.innerHTML = '<p class="mensaje-vacio">Todavía no hay productos disponibles.</p>';
      return;
    }

    contenedor.innerHTML = productos.map(producto => `
      <div class="producto-card">
        <img src="${producto.imagen_url || 'https://via.placeholder.com/220x160?text=Sin+imagen'}" alt="${producto.nombre}">
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="categoria">${producto.categoria ? producto.categoria.nombre : 'Sin categoría'}</p>
          <p class="precio">$${producto.precio}</p>
          <button onclick="alert('Función de carrito próximamente')">Agregar al carrito</button>
        </div>
      </div>
    `).join('');

  } catch (error) {
    contenedor.innerHTML = '<p class="mensaje-vacio">Error al cargar los productos. ¿Está corriendo el servidor?</p>';
    console.error(error);
  }
}

mostrarProductos();