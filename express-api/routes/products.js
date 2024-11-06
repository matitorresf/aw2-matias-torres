const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getProducts = () => {
  const productsPath = path.join(__dirname, '../data/product.json');
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
};

const saveProducts = (products) => {
  const productsPath = path.join(__dirname, '../data/product.json');
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
};

// Obtener todos los productos
router.get('/', (req, res) => {
  const products = getProducts();
  res.json(products);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct = req.body;
  newProduct.product_id = products.length ? products[products.length - 1].product_id + 1 : 1;
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

// Actualizar un producto
router.put('/:id', (req, res) => {
  const products = getProducts();
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.product_id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    saveProducts(products);
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const products = getProducts();
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.product_id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    saveProducts(products);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
