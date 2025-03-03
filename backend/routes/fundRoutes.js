const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fundController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/open-ended/:fundFamily', authMiddleware.authenticate, fundController.getOpenEndedSchemes);

module.exports = router;
