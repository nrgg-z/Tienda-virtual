const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

// Agregar un producto al carrito (o sumar cantidad si ya existe)
const agregarAlCarrito = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { producto_id, cantidad } = req.body;

    if (!producto_id) {
      return res.status(400).json({ mensaje: 'El producto_id es obligatorio' });
    }

    const producto = await Producto.findByPk(producto_id);
    if (!producto || !producto.activo) {
      return res.status(404).json({ mensaje: 'Producto no encontrado o no disponible' });
    }

    const cantidadAgregar = cantidad || 1;

    // Verificar si el producto ya está en el carrito de este usuario
    let itemCarrito = await Carrito.findOne({
      where: { usuario_id, producto_id },
    });

    if (itemCarrito) {
      // Ya existe: sumamos la cantidad
      itemCarrito.cantidad += cantidadAgregar;
      await itemCarrito.save();
    } else {
      // No existe: creamos un nuevo item
      itemCarrito = await Carrito.create({
        usuario_id,
        producto_id,
        cantidad: cantidadAgregar,
      });
    }

    res.status(200).json(itemCarrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Ver el carrito del usuario logueado
const obtenerCarrito = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;

    const items = await Carrito.findAll({
      where: { usuario_id },
      include: { model: Producto, as: 'producto' },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Actualizar la cantidad de un item del carrito
const actualizarCantidad = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ mensaje: 'La cantidad debe ser mayor a 0' });
    }

    const item = await Carrito.findOne({ where: { id, usuario_id } });
    if (!item) {
      return res.status(404).json({ mensaje: 'Item de carrito no encontrado' });
    }

    item.cantidad = cantidad;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Eliminar un item del carrito
const eliminarDelCarrito = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { id } = req.params;

    const item = await Carrito.findOne({ where: { id, usuario_id } });
    if (!item) {
      return res.status(404).json({ mensaje: 'Item de carrito no encontrado' });
    }

    await item.destroy();
    res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
};