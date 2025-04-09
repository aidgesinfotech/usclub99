const express = require('express');
const router = express.Router();
const LuckyJetController = require('../controllers/luckyjetController');
const { auth } = require('../middlewares/auth.js');

router.put('/changeResult/:id', LuckyJetController.changeResult);
router.get('/getAllRounds', LuckyJetController.getAllRounds);

module.exports = router;