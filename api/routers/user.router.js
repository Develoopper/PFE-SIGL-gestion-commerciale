const express = require('express');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const userControllers = require('../controllers/user.controller');
const router = new express.Router();

router.get('/users', verifyAccessToken, userControllers.index);
router.get('/users/:id', verifyAccessToken, userControllers.show);

router.post('/users', verifyAccessToken, userControllers.store);

router.patch('/users/:id', verifyAccessToken, userControllers.update);

router.delete('/users/:id', verifyAccessToken, userControllers.destroy);

module.exports = router;
