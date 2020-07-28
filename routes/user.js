const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.signup);
router.post('/auth', userController.login);

module.exports = router;