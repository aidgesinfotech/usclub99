const express = require('express');
const router = express.Router();
const WithdrawsController = require('../controllers/withdrawController');
const { auth } = require('../middlewares/auth.js');

router.post('/createWithdraw',auth, WithdrawsController.createWithdraw);
router.get('/getAllWithdraw',auth, WithdrawsController.getAllWithdraws);
router.get('/getAllWithdrawsByPage',auth, WithdrawsController.getAllWithdrawsByPage);
router.get('/getAllWithdrawsByPlayer/:id',auth, WithdrawsController.getAllWithdrawsByPlayer);
router.put('/updateWithdraw/:id',auth, WithdrawsController.updateWithdraw);
router.get('/approveWithdraw/:id',auth, WithdrawsController.approveWithdraw);
router.get('/rejectWithdraw/:id',auth, WithdrawsController.rejectWithdraw);
router.delete('/deleteWithdraw/:id',auth, WithdrawsController.deleteWithdraw);

module.exports = router;
