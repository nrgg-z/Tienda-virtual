const express = require('express');
const router = express.Router();
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controllers/categoriaController');
const verificarToken = require('../middleware/verificarToken');

// Rutas públicas (cualquiera puede ver categorías)
router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);

// Rutas protegidas (requieren estar logueado)
router.post('/', verificarToken, crearCategoria);
router.put('/:id', verificarToken, actualizarCategoria);
router.delete('/:id', verificarToken, eliminarCategoria);

module.exports = router;