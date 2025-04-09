const CasinoCategorys = require('../models/casinocategorysModel');

exports.createCasinoCategory = async (req, res) => {
  try {
    const result = await CasinoCategorys.create(req.body,req.userDetails);
    res.status(201).json({ message: 'CasinoCategory created', id: result.insertId });
  } catch (err) {
    console.error('Error creating CasinoCategory:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoCategorys = async (req, res) => {
  try {
    const results = await CasinoCategorys.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching CasinoCategorys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoCategorysByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await CasinoCategorys.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching CasinoCategorys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCasinoCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoCategorys.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'CasinoCategory updated' });
  } catch (err) {
    console.error('Error updating CasinoCategory:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCasinoCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoCategorys.delete(id,req.userDetails);
    res.status(200).json({ message: 'CasinoCategory deleted' });
  } catch (err) {
    console.error('Error deleting CasinoCategory:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
