const express = require('express');
const router = express.Router();
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productoController');
const verificarToken = require('../middleware/verificarToken');

// Rutas públicas (cualquiera puede ver productos)
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas (requieren estar logueado)
router.post('/', verificarToken, crearProducto);
router.put('/:id', verificarToken, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

module.exports = router;