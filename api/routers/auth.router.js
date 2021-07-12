const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const authController = require('../controllers/auth.controller');
const router = new express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/resume', verifyAccessToken, authController.resume);
router.post('/logout', verifyAccessToken, authController.logout);
router.post('/globalLogout', verifyAccessToken, authController.globalLogout);

module.exports = router;
