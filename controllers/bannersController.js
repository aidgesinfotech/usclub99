const Banners = require('../models/bannersModel');

exports.createBanner = async (req, res) => {
  try {
    const result = await Banners.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Banner created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Banner:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const results = await Banners.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Banners:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBannersByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Banners.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Banners:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateBanner = async (req, res) => {
  const id = req.params.id;
  try {
    await Banners.update(id, req.body, req.userDetails);
    res.status(200).json({ message: 'Banner updated' });
  } catch (err) {
    console.error('Error updating Banner:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBanner = async (req, res) => {
  const id = req.params.id;
  try {
    await Banners.delete(id, req.userDetails);
    res.status(200).json({ message: 'Banner deleted' });
  } catch (err) {
    console.error('Error deleting Banner:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
