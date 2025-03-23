// File: routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/signup - Register a user
router.post('/signup', authController.signup);

// POST /api/auth/signin - Login a user
router.post('/signin', authController.signin);

module.exports = router;

