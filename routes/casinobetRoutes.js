const express = require('express');
const router = express.Router();
const CasinobetsController = require('../controllers/casinobetConroller.js');
const { auth } = require('../middlewares/auth.js');

router.post('/createCasinobet', auth, CasinobetsController.createCasinobet);
router.get('/getAllCasinobetsByPage',auth, CasinobetsController.getAllCasinobetsByPage);
router.get('/getAllCasinobets', CasinobetsController.getAllCasinobets);
router.put('/updateCasinobet/:id', auth, CasinobetsController.updateCasinobet);
router.put('/updateCasinoBetStatus/:id', auth, CasinobetsController.updateCasinoBetStatus);
router.delete('/deleteCasinobet/:id', auth, CasinobetsController.deleteCasinobet);

module.exports = router;