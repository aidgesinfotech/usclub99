const express = require('express');
const router = express.Router();
const CasinoProvidersController = require('../controllers/casinoprovidersController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCasinoProviders',auth, CasinoProvidersController.createCasinoProvider);
router.get('/getAllCasinoProviders',auth, CasinoProvidersController.getAllCasinoProviders);
router.get('/getAllCasinoProvidersByPage',auth, CasinoProvidersController.getAllCasinoProvidersByPage);
router.put('/updateCasinoProviders/:id',auth, CasinoProvidersController.updateCasinoProvider);
router.delete('/deleteCasinoProviders/:id',auth, CasinoProvidersController.deleteCasinoProvider);

module.exports = router;
