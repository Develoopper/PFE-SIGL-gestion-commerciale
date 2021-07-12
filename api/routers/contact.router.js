const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const contactControllers = require('../controllers/contact.controllers');
const router = new express.Router();

router.get('/contacts', verifyAccessToken, contactControllers.index);

router.post('/contacts', verifyAccessToken, contactControllers.store);

module.exports = router;
