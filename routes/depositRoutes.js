const express = require('express');
const router = express.Router();
const DepositsController = require('../controllers/depositController');
const { auth } = require('../middlewares/auth.js');

router.post('/createDeposit',auth, DepositsController.createDeposit);
router.get('/getAllDeposit',auth, DepositsController.getAllDeposits);
router.get('/getAllDepositsByPage',auth, DepositsController.getAllDepositsByPage);
router.get('/getAllDepositsByPlayer/:id',auth, DepositsController.getAllDepositsByPlayer);
router.put('/updateDeposit/:id',auth, DepositsController.updateDeposit);
router.get('/approveDeposit/:id',auth, DepositsController.approveDeposit);
router.get('/rejectDeposit/:id',auth, DepositsController.rejectDeposit);
router.delete('/deleteDeposit/:id',auth, DepositsController.deleteDeposit);

module.exports = router;
