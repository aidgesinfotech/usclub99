const express = require('express');
const router = express.Router();
const CasinoGamesController = require('../controllers/casinogamesController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCasinoGames',auth, CasinoGamesController.createCasinoGame);
router.get('/getAllCasinoGames', CasinoGamesController.getAllCasinoGames);
router.get('/getAllCasinoGamesByPage',auth, CasinoGamesController.getAllCasinoGamesByPage);
router.put('/updateCasinoGames/:id',auth, CasinoGamesController.updateCasinoGame);
router.delete('/deleteCasinoGames/:id',auth, CasinoGamesController.deleteCasinoGame);

module.exports = router;
