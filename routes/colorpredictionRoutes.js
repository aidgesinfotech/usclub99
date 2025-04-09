const express = require('express');
const router = express.Router();
const ColorpredictionsController = require('../controllers/colorpredictionController');
const { auth } = require('../middlewares/auth.js');

router.post('/placeHalfMinBet',auth, ColorpredictionsController.placeHalfMinBet);
router.get('/getHalfMinBetByPage',auth, ColorpredictionsController.getHalfMinBetByPage);
router.get('/getHalfMinRoundByPage',auth, ColorpredictionsController.getHalfMinRoundByPage);

router.post('/placeOneMinBet',auth, ColorpredictionsController.placeOneMinBet);
router.get('/getOneMinBetByPage',auth, ColorpredictionsController.getOneMinBetByPage);
router.get('/getOneMinRoundByPage',auth, ColorpredictionsController.getOneMinRoundByPage);

router.post('/placeThreeMinBet',auth, ColorpredictionsController.placeThreeMinBet);
router.get('/getThreeMinBetByPage',auth, ColorpredictionsController.getThreeMinBetByPage);
router.get('/getThreeMinRoundByPage',auth, ColorpredictionsController.getThreeMinRoundByPage);

router.post('/placeFiveMinBet',auth, ColorpredictionsController.placeFiveMinBet);
router.get('/getFiveMinBetByPage',auth, ColorpredictionsController.getFiveMinBetByPage);
router.get('/getFiveMinRoundByPage',auth, ColorpredictionsController.getFiveMinRoundByPage);

module.exports = router;
