const db = require('../config/db');

const deposit = {
  create: async (data) => {
    const sql = 'INSERT INTO deposit (playerId, methodId, amount, trnId, screenshot, screenshotId, isApproved, isRejected, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.playerId ,data.methodId , data.amount, data.trnId , data.screenshot, data.screenshotId, data.isApproved, data.isRejected]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const [results] = await db.execute(`SELECT * FROM deposit ORDER BY created_at DESC`);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getByPlayer: async (id) => {
    try {
      const [results] = await db.execute(`SELECT * FROM deposit WHERE playerId = ? ORDER BY created_at DESC` , [id]);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
    
  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT deposit.*, depositmethod.*, players.* 
        FROM deposit
        LEFT JOIN depositmethod ON deposit.methodId = depositmethod.id
        LEFT JOIN players ON deposit.playerId = players.id
      `;
      
      let queryParams = [];
      
      if (searchtxt) {
        const columns = ['players.playerId']; // Change the column name if needed
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY deposit.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM deposit');
      const totalCount = totalCountResults[0].totalCount;
  
      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },


  update: async (id, data) => {
    const sql = 'UPDATE deposit SET playerId = ?, methodId = ?, amount = ?, trnId = ?, screenshot = ?, screenshotId = ?, isApproved = ?, isRejected = ?, updated_at = NOW() WHERE depositId = ?';
    try {
      const [results] = await db.execute(sql, [data.playerId, data.methodId, data.amount, data.trnId, data.screenshot, data.screenshotId, data.isApproved, data.isRejected, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  approveDeposit: async (id) => {
    const sql = 'UPDATE deposit SET isApproved = ?, updated_at = NOW() WHERE depositId = ?';
    const depositSql = 'SELECT * FROM deposit WHERE depositId = ?';
    const playerSql = 'SELECT * FROM players WHERE id = ?';
    const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
    try {
      let status = true;
      const [results] = await db.execute(sql, [status, id]);
      const [depositData] = await db.execute(depositSql, [id]);
      const [player] = await db.execute(playerSql, [depositData[0].playerId]);
      const [balance] = await db.execute(balanceSql, [((player[0].balance)+(depositData[0].amount)) ,depositData[0].playerId]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },
  rejectDeposit: async (id) => {
    const sql = 'UPDATE deposit SET isRejected = ?, updated_at = NOW() WHERE depositId = ?';
    try {
      let status = true;
      const [results] = await db.execute(sql, [status, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM deposit WHERE depositId = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = deposit;
