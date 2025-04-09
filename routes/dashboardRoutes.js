const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const { auth } = require('../middlewares/auth.js');

router.get('/superAdminDashboard',auth, DashboardController.superadminDashboard);
router.get('/playerProfile/:id',auth, DashboardController.playerProfile);

module.exports = router;