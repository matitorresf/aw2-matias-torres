const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper function to read users.json
const getUsers = () => {
  const usersPath = path.join(__dirname, '../data/users.json');
  const data = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to users.json
const saveUsers = (users) => {
  const usersPath = path.join(__dirname, '../data/users.json');
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
};

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const users = getUsers();
  const newUser = req.body;
  newUser.user_id = users.length ? users[users.length - 1].user_id + 1 : 1;
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
  const users = getUsers();
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.user_id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    saveUsers(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const users = getUsers();
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.user_id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    saveUsers(users);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

module.exports = router;
