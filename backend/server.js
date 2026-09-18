const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();
const { Categoria, Producto, Usuario, Carrito } = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a PostgreSQL exitosa');
    return sequelize.sync();
  })
  .then(() => console.log('✅ Modelos sincronizados (tablas creadas si no existían)'))
  .catch((error) => console.error('❌ Error:', error));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});