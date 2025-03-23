// File: routes/userInfoRoutes.js
const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
const auth = require('../middleware/auth');

// POST /api/userinfo - Create or update user info
router.post('/', auth, userInfoController.saveUserInfo);

// GET /api/userinfo - Get user info
router.get('/', auth, userInfoController.getUserInfo);

module.exports = router;