const express = require('express');
const router = express.Router();
const WithdrawMethodsController = require('../controllers/withdrawmethodController');
const { auth } = require('../middlewares/auth.js');

router.post('/createWithdrawMethod',auth, WithdrawMethodsController.createWithdrawMethod);
router.get('/getAllWithdrawMethod',auth, WithdrawMethodsController.getAllWithdrawMethods);
router.get('/getAllWithdrawMethodsByPage',auth, WithdrawMethodsController.getAllWithdrawMethodsByPage);
router.put('/updateWithdrawMethod/:id',auth, WithdrawMethodsController.updateWithdrawMethod);
router.delete('/deleteWithdrawMethod/:id',auth, WithdrawMethodsController.deleteWithdrawMethod);

module.exports = router;
