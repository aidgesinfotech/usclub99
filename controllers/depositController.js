const Deposits = require('../models/depositModel');

exports.createDeposit = async (req, res) => {
  try {
    const result = await Deposits.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Deposit created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDeposits = async (req, res) => {
  try {
    const results = await Deposits.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Deposits:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDepositsByPlayer = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Deposits.getByPlayer(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Deposits:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllDepositsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Deposits.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Deposits:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDeposit = async (req, res) => {
  const id = req.params.id;
  try {
    await Deposits.update(id, req.body);
    res.status(200).json({ message: 'Deposit updated' });
  } catch (err) {
    console.error('Error updating Deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.approveDeposit = async (req, res) => {
  const id = req.params.id;
  try {
    await Deposits.approveDeposit(id);
    res.status(200).json({ message: 'Deposit Approved' });
  } catch (err) {
    console.error('Error Approving Deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.rejectDeposit = async (req, res) => {
  const id = req.params.id;
  try {
    await Deposits.rejectDeposit(id);
    res.status(200).json({ message: 'Deposit Rejected' });
  } catch (err) {
    console.error('Error Rejecting Deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDeposit = async (req, res) => {
  const id = req.params.id;
  try {
    await Deposits.delete(id,req.userDetails);
    res.status(200).json({ message: 'Deposit deleted' });
  } catch (err) {
    console.error('Error deleting Deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
