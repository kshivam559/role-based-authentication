const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.use(verifyToken, isAdmin);

router.get('/users', async (req, res) => {
  const [users] = await db.query('SELECT id, username, email, role FROM users');
  res.json(users);
});


router.post('/create-user', async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    // Check for duplicate username
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, hashed, email, role]);
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


router.delete('/delete-user/:id', async (req, res) => {
  try {
    // Prevent deletion of admin user
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!users.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (users[0].role === 'admin' && users[0].username === 'admin') {
      return res.status(403).json({ error: 'Cannot delete default admin user' });
    }
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;