const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticate, portfolioController.addInvestment);
router.get('/', authMiddleware.authenticate, portfolioController.getPortfolio);

module.exports = router;
