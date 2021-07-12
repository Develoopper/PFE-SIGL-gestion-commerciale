const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const achatControllers = require('../controllers/achat.controllers');
const router = new express.Router();

router.get('/achats', verifyAccessToken, achatControllers.index);

router.post('/achats', verifyAccessToken, achatControllers.store);

module.exports = router;
