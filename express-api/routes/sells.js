const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getSells = () => {
  const sellsPath = path.join(__dirname, '../data/sells.json');
  const data = fs.readFileSync(sellsPath, 'utf8');
  return JSON.parse(data);
};

const saveSells = (sells) => {
  const sellsPath = path.join(__dirname, '../data/sells.json');
  fs.writeFileSync(sellsPath, JSON.stringify(sells, null, 2), 'utf8');
};

// Obtener todas las ventas
router.get('/', (req, res) => {
  const sells = getSells();
  res.json(sells);
});

// Crear una nueva venta
router.post('/', (req, res) => {
  const sells = getSells();
  const newSell = req.body;
  newSell.sell_id = sells.length ? sells[sells.length - 1].sell_id + 1 : 1;
  sells.push(newSell);
  saveSells(sells);
  res.status(201).json(newSell);
});

// Actualizar una venta
router.put('/:id', (req, res) => {
  const sells = getSells();
  const sellId = parseInt(req.params.id, 10);
  const sellIndex = sells.findIndex(s => s.sell_id === sellId);

  if (sellIndex !== -1) {
    sells[sellIndex] = { ...sells[sellIndex], ...req.body };
    saveSells(sells);
    res.json(sells[sellIndex]);
  } else {
    res.status(404).json({ error: 'Venta no encontrada' });
  }
});

// Eliminar una venta
router.delete('/:id', (req, res) => {
  const sells = getSells();
  const sellId = parseInt(req.params.id, 10);
  const sellIndex = sells.findIndex(s => s.sell_id === sellId);

  if (sellIndex !== -1) {
    sells.splice(sellIndex, 1);
    saveSells(sells);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Venta no encontrada' });
  }
});

module.exports = router;
