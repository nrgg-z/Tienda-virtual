const API_URL = 'http://localhost:3000/api';

async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`);
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los productos');
  }
  return await respuesta.json();
}

async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias`);
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar las categorías');
  }
  return await respuesta.json();
}