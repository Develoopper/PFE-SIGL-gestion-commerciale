const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const venteControllers = require('../controllers/vente.controllers');
const router = new express.Router();

router.get('/ventes', verifyAccessToken, venteControllers.index);

router.post('/ventes', verifyAccessToken, venteControllers.store);

module.exports = router;
