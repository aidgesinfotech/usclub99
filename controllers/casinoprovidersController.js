const CasinoProviders = require('../models/casinoprovidersModel');

exports.createCasinoProvider = async (req, res) => {
  try {
    const result = await CasinoProviders.create(req.body,req.userDetails);
    res.status(201).json({ message: 'CasinoProvider created', id: result.insertId });
  } catch (err) {
    console.error('Error creating CasinoProvider:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoProviders = async (req, res) => {
  try {
    const results = await CasinoProviders.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching CasinoProviders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCasinoProvidersByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await CasinoProviders.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching CasinoProviders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCasinoProvider = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoProviders.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'CasinoProvider updated' });
  } catch (err) {
    console.error('Error updating CasinoProvider:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCasinoProvider = async (req, res) => {
  const id = req.params.id;
  try {
    await CasinoProviders.delete(id,req.userDetails);
    res.status(200).json({ message: 'CasinoProvider deleted' });
  } catch (err) {
    console.error('Error deleting CasinoProvider:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
