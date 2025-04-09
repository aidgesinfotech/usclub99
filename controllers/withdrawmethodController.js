const WithdrawMethods = require('../models/withdrawmethodModel');

exports.createWithdrawMethod = async (req, res) => {
  try {
    const result = await WithdrawMethods.create(req.body,req.userDetails);
    res.status(201).json({ message: 'WithdrawMethod created', id: result.insertId });
  } catch (err) {
    console.error('Error creating WithdrawMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWithdrawMethods = async (req, res) => {
  try {
    const results = await WithdrawMethods.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching WithdrawMethods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWithdrawMethodsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await WithdrawMethods.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching WithdrawMethods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateWithdrawMethod = async (req, res) => {
  const id = req.params.id;
  try {
    await WithdrawMethods.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'WithdrawMethod updated' });
  } catch (err) {
    console.error('Error updating WithdrawMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteWithdrawMethod = async (req, res) => {
  const id = req.params.id;
  try {
    await WithdrawMethods.delete(id,req.userDetails);
    res.status(200).json({ message: 'WithdrawMethod deleted' });
  } catch (err) {
    console.error('Error deleting WithdrawMethod:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
