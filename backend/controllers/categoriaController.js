const Categoria = require('../models/Categoria');

// Crear una categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    const nuevaCategoria = await Categoria.create({ nombre, descripcion });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Actualizar una categoría
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre ?? categoria.nombre;
    categoria.descripcion = descripcion ?? categoria.descripcion;
    await categoria.save();

    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

// Eliminar una categoría
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.destroy();
    res.status(200).json({ mensaje: 'Categoría eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};