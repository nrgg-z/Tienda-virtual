const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

// Crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = req.body;

    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({ mensaje: 'Nombre, precio y categoría son obligatorios' });
    }

    // Verificar que la categoría exista
    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'La categoría indicada no existe' });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Obtener todos los productos (solo los activos, con su categoría incluida)
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { activo: true },
      include: { model: Categoria },
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
      include: { model: Categoria },
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id, activo } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.nombre = nombre ?? producto.nombre;
    producto.descripcion = descripcion ?? producto.descripcion;
    producto.precio = precio ?? producto.precio;
    producto.stock = stock ?? producto.stock;
    producto.imagen_url = imagen_url ?? producto.imagen_url;
    producto.categoria_id = categoria_id ?? producto.categoria_id;
    producto.activo = activo ?? producto.activo;

    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Eliminar un producto (soft delete: solo lo desactiva)
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.activo = false;
    await producto.save();

    res.status(200).json({ mensaje: 'Producto desactivado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};