const db = require('../config/db');

const withdraw = {
  create: async (data) => {
    const sql = 'INSERT INTO withdraw (playerId, methodId, amount, details, isApproved, isRejected, created_at, updated_at) VALUES (?,?,?,?,?,?, NOW(), NOW())';
    const playerSql = 'SELECT * FROM players WHERE id = ?';
    const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.playerId ,data.methodId , data.amount, data.details , data.isApproved, data.isRejected]);
      const [player] = await db.execute(playerSql, [data.playerId]);
      const [balance] = await db.execute(balanceSql, [((player[0].balance)-(data.amount)) ,data.playerId]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getByPlayer: async (id) => {
    try {
      const [results] = await db.execute(`SELECT * FROM withdraw WHERE playerId = ? ORDER BY created_at DESC` , [id]);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const [results] = await db.execute(`SELECT * FROM withdraw ORDER BY created_at DESC`);
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
        SELECT withdraw.*, withdrawmethod.*, players.* 
        FROM withdraw
        LEFT JOIN withdrawmethod ON withdraw.methodId = withdrawmethod.id
        LEFT JOIN players ON withdraw.playerId = players.id
      `;
      
      let queryParams = [];
      
      if (searchtxt) {
        const columns = ['players.playerId']; // Change the column name if needed
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY withdraw.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM withdraw');
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
    const sql = 'UPDATE withdraw SET playerId = ?, methodId = ?, amount = ?, details = ?, isApproved = ?, isRejected = ?, updated_at = NOW() WHERE withdrawId  = ?';
    try {
      const [results] = await db.execute(sql, [data.playerId, data.methodId, data.amount, data.details, data.isApproved, data.isRejected, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  approveWithdraw: async (id) => {
    const sql = 'UPDATE withdraw SET isApproved = ?, updated_at = NOW() WHERE withdrawId   = ?';
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
  rejectWithdraw: async (id) => {
    const sql = 'UPDATE withdraw SET isRejected = ?, updated_at = NOW() WHERE withdrawId = ?';
    const withdrawSql = 'SELECT * FROM withdraw WHERE withdrawId = ?';
    const playerSql = 'SELECT * FROM players WHERE id = ?';
    const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
    try {
      let status = true;
      const [results] = await db.execute(sql, [status, id]);
      const [withdrawData] = await db.execute(withdrawSql, [id]);
      const [player] = await db.execute(playerSql, [withdrawData[0].playerId]);
      const [balance] = await db.execute(balanceSql, [((player[0].balance)+(withdrawData[0].amount)) ,withdrawData[0].playerId]);
      
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
      const [results] = await db.execute('DELETE FROM withdraw WHERE withdrawId = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = withdraw;
