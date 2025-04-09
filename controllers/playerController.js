const jwt = require("jsonwebtoken");
const axios = require('axios');
const Players = require('../models/playerModel');

exports.createPlayer = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon, city , regionName, country } = IPData.data;
            
            
            const result = await Players.create(lat, lon, req.body, city , regionName, country);

            res.status(201).json({
                message: 'Player created',
                Player: result.createdPlayer,
                token: result.token,
                id: result.insertId
            });
        }else{
            res.status(400).json({ error: 'Ip Required for Creating any Player' });
        }
    } catch (err) {
        console.error('Error creating Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllPlayers = async (req, res) => {
    try {
        const results = await Players.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Players:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPlayerById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await Players.getById(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error updating Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPlayersByAffiliatorId = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await Players.getByAffiliatorId(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error updating Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPlayerBalance = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await Players.getBalance(id);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error updating Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllPlayersByPage = async (req, res) => {
    try {
      const { limit = 10, page = 1, searchtxt = '' } = req.query;
      
      const results = await Players.getAllByPage(Number(limit), Number(page), searchtxt);
  
      res.status(200).json({
        status: 'success',
        data: results.data,
        totalCount: results.totalCount,
        totalPages: Math.ceil(results.totalCount / limit),
        currentPage: page
      });
    } catch (err) {
      console.error('Error fetching Players:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.updatePlayer = async (req, res) => {
    const ip = req.body.ip;
    const id = req.params.id;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon } = IPData.data;

            const results = await Players.update(lat, lon, id, req.body);
            res.status(200).json(results);
        }else{
            res.status(400).json({ error: 'Ip Required for Updating any Player' });
        }
    } catch (err) {
        console.error('Error updating Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePlayerStatus = async (req, res) => {
    const id = req.params.id;
    const { isActive } = req.body;
    try {
        await Players.updatePlayerStatus(id, isActive);
        res.status(200).json({ message: 'Player Status updated' });
    } catch (err) {
        console.error('Error updating Player Status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePlayerBalance = async (req, res) => {
    const id = req.params.id;
    const { balance } = req.body;
    try {
        await Players.updatePlayerBalance(id, balance);
        res.status(200).json({ message: 'Player Balance updated' });
    } catch (err) {
        console.error('Error updating Player Balance:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePlayer = async (req, res) => {
    const id = req.params.id;
    try {
        await Players.delete(id);
        res.status(200).json({ message: 'Player deleted' });
    } catch (err) {
        console.error('Error deleting Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginPlayer = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon, city , regionName, country } = IPData.data;

            const { userName, password } = req.body;

            const Player = await Players.findByuserName(lat, lon ,userName , ip, city , regionName, country); 
            if (!Player || !Player.data) {
                return res.status(404).json({ error: 'Player not found' });
            }

            if (password !== Player.data.password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            let token;
            if(Player.data){
                token = jwt.sign({id : Player.data.id, type : 'Player'}, process.env.JWT_KEY);
                await Players.updateUserToken(Player.data.id, token);
            }

            res.status(200).json({
                message: 'Login successful',
                Player: Player.data,
                token: token
            });
        }else{
            res.status(400).json({ error: 'Ip Required for Login to Player' });
        }

    } catch (err) {
        console.error('Error logging in Player:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};