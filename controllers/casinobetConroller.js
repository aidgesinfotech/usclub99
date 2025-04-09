const Casinobets = require('../models/casinobetModel');

exports.createCasinobet = async (req, res) => {
  try {
    const result = await Casinobets.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Casinobet created', id: result.data.insertId });
  } catch (err) {
    console.error('Error creating Casinobet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinobets = async (req, res) => {
  try {
    const results = await Casinobets.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Casinobets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinobetsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Casinobets.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Casinobets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateCasinoBetStatus = async (req, res) => {
    const id = req.params.id;
    const { isWin } = req.body;
    try {
        await Casinobets.updateCasinoBetStatus(id, isWin);
        res.status(200).json({ message: 'Casino Bet Status updated' });
    } catch (err) {
        console.error('Error updating Casino Bet Status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCasinobet = async (req, res) => {
  const id = req.params.id;
  try {
    await Casinobets.update(id, req.body, req.userDetails);
    res.status(200).json({ message: 'Casinobet updated' });
  } catch (err) {
    console.error('Error updating Casinobet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCasinobet = async (req, res) => {
  const id = req.params.id;
  try {
    await Casinobets.delete(id, req.userDetails);
    res.status(200).json({ message: 'Casinobet deleted' });
  } catch (err) {
    console.error('Error deleting Casinobet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
