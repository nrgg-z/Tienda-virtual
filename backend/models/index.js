const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Carrito = require('./Carrito');

// Una categoría tiene muchos productos
Categoria.hasMany(Producto, {
  foreignKey: 'categoria_id',
  as: 'productos',
});

// Un producto pertenece a una categoría
Producto.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria',
});

// Un usuario tiene muchos items de carrito
Usuario.hasMany(Carrito, {
  foreignKey: 'usuario_id',
  as: 'itemsCarrito',
});
Carrito.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario',
});

// Un producto puede estar en muchos carritos (de distintos usuarios)
Producto.hasMany(Carrito, {
  foreignKey: 'producto_id',
  as: 'enCarritos',
});
Carrito.belongsTo(Producto, {
  foreignKey: 'producto_id',
  as: 'producto',
});

module.exports = { Categoria, Producto, Usuario, Carrito };