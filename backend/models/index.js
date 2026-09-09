const Categoria = require('./Categoria');
const Producto = require('./Producto');

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

module.exports = { Categoria, Producto };