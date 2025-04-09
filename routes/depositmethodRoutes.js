const express = require('express');
const router = express.Router();
const DepositMethodsController = require('../controllers/depositmethodController');
const { auth } = require('../middlewares/auth.js');

router.post('/createDepositMethod',auth, DepositMethodsController.createDepositMethod);
router.get('/getAllDepositMethod',auth, DepositMethodsController.getAllDepositMethods);
router.get('/getAllDepositMethodsByPage',auth, DepositMethodsController.getAllDepositMethodsByPage);
router.put('/updateDepositMethod/:id',auth, DepositMethodsController.updateDepositMethod);
router.delete('/deleteDepositMethod/:id',auth, DepositMethodsController.deleteDepositMethod);

module.exports = router;
