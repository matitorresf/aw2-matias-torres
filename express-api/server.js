const express = require('express');
const app = express();

app.use(express.json());

// Importar y usar las rutas
const userRoutes = require('./routes/users');
const sellRoutes = require('./routes/sells');
const productRoutes = require('./routes/products');

app.use('/users', userRoutes);
app.use('/sells', sellRoutes);
app.use('/products', productRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
