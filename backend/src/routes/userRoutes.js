const express = require('express');
const router = express.Router();

// TODO Phase 3 — userController
router.get('/ping', (req, res) => res.json({ message: 'user route working' }));

module.exports = router;