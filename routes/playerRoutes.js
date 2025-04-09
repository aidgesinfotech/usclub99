const express = require('express');
const router = express.Router();
const PlayersController = require('../controllers/playerController');
const { auth } = require('../middlewares/auth.js');

router.post('/createPlayer', PlayersController.createPlayer);
router.get('/getAllPlayers',auth, PlayersController.getAllPlayers);
router.get('/getPlayerBalance/:id', PlayersController.getPlayerBalance);
router.get('/getPlayerById/:id',auth, PlayersController.getPlayerById);
router.get('/getPlayersByAffiliatorId/:id',auth, PlayersController.getPlayersByAffiliatorId);
router.get('/getAllPlayersByPage',auth, PlayersController.getAllPlayersByPage);
router.post('/loginPlayer', PlayersController.loginPlayer);
router.put('/updatePlayer/:id',auth, PlayersController.updatePlayer);
router.put('/updatePlayerBalance/:id',auth, PlayersController.updatePlayerBalance);
router.put('/updatePlayerStatus/:id',auth, PlayersController.updatePlayerStatus);
router.delete('/deletePlayer/:id',auth, PlayersController.deletePlayer);

module.exports = router;