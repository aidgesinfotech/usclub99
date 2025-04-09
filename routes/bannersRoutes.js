const express = require('express');
const router = express.Router();
const BannersController = require('../controllers/bannersController');
const { auth } = require('../middlewares/auth.js');

router.post('/createBanner', auth, BannersController.createBanner);
router.get('/getAllBannersByPage',auth, BannersController.getAllBannersByPage);
router.get('/getAllBanners', BannersController.getAllBanners);
router.put('/updateBanner/:id', auth, BannersController.updateBanner);
router.delete('/deleteBanner/:id', auth, BannersController.deleteBanner);

module.exports = router;