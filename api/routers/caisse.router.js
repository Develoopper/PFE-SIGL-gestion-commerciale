const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const caisseControllers = require('../controllers/caisse.controllers');
const router = new express.Router();

router.get('/caisse', verifyAccessToken, caisseControllers.index);

router.post('/caisse', verifyAccessToken, caisseControllers.store);

module.exports = router;
