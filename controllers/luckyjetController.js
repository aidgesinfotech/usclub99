const luckyjet = require('../models/luckyjetModel');

exports.changeResult = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await luckyjet.changeResult(id, req.body);
        res.status(201).json({ message: 'Result Changed', id: result.insertId });
    } catch (err) {
        console.error('Error Changing Result:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllRounds = async (req, res) => {
    try {
      const results = await luckyjet.getAllRounds();
      res.status(200).json(results);
    } catch (err) {
      console.error('Error fetching Rounds:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
};