const express = require('express');
const router = express.Router();
const CasinoCategorysController = require('../controllers/casinocategorysController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCasinoCategorys',auth, CasinoCategorysController.createCasinoCategory);
router.get('/getAllCasinoCategorys',auth, CasinoCategorysController.getAllCasinoCategorys);
router.get('/getAllCasinoCategorysByPage',auth, CasinoCategorysController.getAllCasinoCategorysByPage);
router.put('/updateCasinoCategorys/:id',auth, CasinoCategorysController.updateCasinoCategory);
router.delete('/deleteCasinoCategorys/:id',auth, CasinoCategorysController.deleteCasinoCategory);

module.exports = router;
