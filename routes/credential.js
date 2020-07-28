const express = require('express');
const router = express.Router();
const credController = require('../controllers/credential');

router.get('/sites/list', credController.getCredentials);
router.post('/sites', credController.addCredentials);

module.exports = router;