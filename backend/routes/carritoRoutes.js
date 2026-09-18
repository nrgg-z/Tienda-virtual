const express = require('express');
const router = express.Router();
const {
  agregarAlCarrito,
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
} = require('../controllers/carritoController');
const verificarToken = require('../middleware/verificarToken');

// Todas las rutas de carrito requieren estar logueado
router.use(verificarToken);

router.post('/', agregarAlCarrito);
router.get('/', obtenerCarrito);
router.put('/:id', actualizarCantidad);
router.delete('/:id', eliminarDelCarrito);

module.exports = router;