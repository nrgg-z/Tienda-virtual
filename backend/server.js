const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const Usuario = require('./models/Usuario');
const authRoutes = require('./routes/authRoutes');
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

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});