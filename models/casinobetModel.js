const db = require('../config/db');

const casinobet = {
  create: async (data) => {
    const sql = 'INSERT INTO casinobet (gameName, gameId, amt, isWin, userId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
    const playerSql = 'SELECT * FROM players WHERE id = ?';
    const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
    try {
        const [results] = await db.execute(sql, [data.gameName, data.gameId, data.amt, data.isWin, data.userId]);
        const [player] = await db.execute(playerSql, [data.userId]);
        const [balance] = await db.execute(balanceSql, [(player[0].balance-data.amt) ,data.userId]);

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
      const [results] = await db.execute('SELECT * FROM casinobet ORDER BY created_at DESC');
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = 'SELECT * FROM casinobet';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['gameName'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM casinobet');
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
    const sql = 'UPDATE casinobet SET gameName = ?, gameId = ?, amt = ?, isWin = ?, userId = ?, updated_at = NOW() WHERE id = ?';
    
    try {
      const [results] = await db.execute(sql, [data.gameName, data.gameId, data.amt, data.isWin, data.userId, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },
  
  updateCasinoBetStatus: async (id, status) => {
    const sql = 'UPDATE casinobet SET isWin = ?, updated_at = NOW() WHERE id = ?';
    try {
        const [results] = await db.execute(sql, [status, id]);


        let dataJSON = {
            status: 'success',
            data: results
        };

        return dataJSON;
    } catch (err) {
        throw err;
    }
},

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM casinobet WHERE id = ?', [id]);
      

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = casinobet;