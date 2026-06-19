const express = require('express');
const router = express.Router();

//const { register, login } = require('../controllers/authController');
//router.post('/register', register);
//router.post('/login', login);

// Temp placeholder so server.js doesn't crash
router.get('/ping', (req, res) => res.json({ message: 'auth route working' }));

module.exports = router;