const colorprediction = require('../models/colorpredictionModel');

exports.placeHalfMinBet = async (req, res) => {
    try {
        const result = await colorprediction.placeHalfMinBet(req.body, req.userDetails);
        res.status(201).json({ message: 'Bet Placed', id: result.insertId });
    } catch (err) {
        console.error('Error Placing Bet:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getHalfMinBetByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getHalfMinBetByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Bets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getHalfMinRoundByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getHalfMinRoundByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Rounds:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// ------------------- oneee 
exports.placeOneMinBet = async (req, res) => {
    try {
        const result = await colorprediction.placeOneMinBet(req.body, req.userDetails);
        res.status(201).json({ message: 'Bet Placed', id: result.insertId });
    } catch (err) {
        console.error('Error Placing Bet:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOneMinBetByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getOneMinBetByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Bets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOneMinRoundByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getOneMinRoundByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Rounds:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// ------------------- three 
exports.placeThreeMinBet = async (req, res) => {
    try {
        const result = await colorprediction.placeThreeMinBet(req.body, req.userDetails);
        res.status(201).json({ message: 'Bet Placed', id: result.insertId });
    } catch (err) {
        console.error('Error Placing Bet:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getThreeMinBetByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getThreeMinBetByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Bets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getThreeMinRoundByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getThreeMinRoundByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Rounds:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// ------------------- five 
exports.placeFiveMinBet = async (req, res) => {
    try {
        const result = await colorprediction.placeFiveMinBet(req.body, req.userDetails);
        res.status(201).json({ message: 'Bet Placed', id: result.insertId });
    } catch (err) {
        console.error('Error Placing Bet:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFiveMinBetByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getFiveMinBetByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Bets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFiveMinRoundByPage = async (req, res) => {
    try {
        const { limit = 10, page = 1, searchtxt = '' } = req.query;

        const results = await colorprediction.getFiveMinRoundByPage(Number(limit), Number(page), searchtxt);

        res.status(200).json({
            status: 'success',
            data: results.data,
            totalCount: results.totalCount,
            totalPages: Math.ceil(results.totalCount / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching Rounds:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};