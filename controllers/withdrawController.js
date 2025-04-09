const Withdraws = require('../models/withdrawModel');

exports.createWithdraw = async (req, res) => {
  try {
    const result = await Withdraws.create(req.body);
    res.status(201).json({ message: 'Withdraw created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Withdraw:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWithdraws = async (req, res) => {
  try {
    const results = await Withdraws.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Withdraws:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWithdrawsByPlayer = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Withdraws.getByPlayer(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Withdraws:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWithdrawsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Withdraws.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Withdraws:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateWithdraw = async (req, res) => {
  const id = req.params.id;
  try {
    await Withdraws.update(id, req.body);
    res.status(200).json({ message: 'Withdraw updated' });
  } catch (err) {
    console.error('Error updating Withdraw:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.approveWithdraw = async (req, res) => {
  const id = req.params.id;
  try {
    await Withdraws.approveWithdraw(id);
    res.status(200).json({ message: 'Withdraw Approved' });
  } catch (err) {
    console.error('Error Approving Withdraw:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.rejectWithdraw = async (req, res) => {
  const id = req.params.id;
  try {
    await Withdraws.rejectWithdraw(id);
    res.status(200).json({ message: 'Withdraw Rejected' });
  } catch (err) {
    console.error('Error Rejecting Withdraw:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteWithdraw = async (req, res) => {
  const id = req.params.id;
  try {
    await Withdraws.delete(id);
    res.status(200).json({ message: 'Withdraw deleted' });
  } catch (err) {
    console.error('Error deleting Withdraw:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
