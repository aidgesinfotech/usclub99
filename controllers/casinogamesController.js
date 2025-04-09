const CasinoGames = require('../models/casinogamesModel');

exports.createCasinoGame = async (req, res) => {
  try {
    const result = await CasinoGames.create(req.body,req.userDetails);
    res.status(201).json({ message: 'CasinoGame created', id: result.insertId });
  } catch (err) {
    console.error('Error creating CasinoGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoGames = async (req, res) => {
  try {
    const results = await CasinoGames.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching CasinoGames:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoGamesByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await CasinoGames.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching CasinoGames:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCasinoGame = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoGames.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'CasinoGame updated' });
  } catch (err) {
    console.error('Error updating CasinoGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCasinoGame = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoGames.delete(id,req.userDetails);
    res.status(200).json({ message: 'CasinoGame deleted' });
  } catch (err) {
    console.error('Error deleting CasinoGame:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
