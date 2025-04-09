const Dashboard = require('../models/dashboardModel');

exports.superadminDashboard = async (req, res) => {
  try {
    const results = await Dashboard.superadminDashboard();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Dashboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.playerProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Dashboard.playerProfile(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};