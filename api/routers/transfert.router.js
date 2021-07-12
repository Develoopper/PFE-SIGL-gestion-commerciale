const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const transfertControllers = require('../controllers/transfert.controllers');
const router = new express.Router();

router.get('/transferts', verifyAccessToken, transfertControllers.index);

router.post('/transferts', verifyAccessToken, transfertControllers.store);

module.exports = router;
