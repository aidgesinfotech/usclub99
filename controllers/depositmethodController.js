const DepositMethods = require('../models/depositmethodModel');

exports.createDepositMethod = async (req, res) => {
  try {
    const result = await DepositMethods.create(req.body,req.userDetails);
    res.status(201).json({ message: 'DepositMethod created', id: result.insertId });
  } catch (err) {
    console.error('Error creating DepositMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDepositMethods = async (req, res) => {
  try {
    const results = await DepositMethods.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching DepositMethods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDepositMethodsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await DepositMethods.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching DepositMethods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDepositMethod = async (req, res) => {
  const id = req.params.id;
  try {
    await DepositMethods.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'DepositMethod updated' });
  } catch (err) {
    console.error('Error updating DepositMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDepositMethod = async (req, res) => {
  const id = req.params.id;
  try {
    await DepositMethods.delete(id,req.userDetails);
    res.status(200).json({ message: 'DepositMethod deleted' });
  } catch (err) {
    console.error('Error deleting DepositMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
