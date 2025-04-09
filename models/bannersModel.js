const db = require('../config/db');

const Banners = {
  create: async (data, userDetails) => {
    const sql = 'INSERT INTO banners (image, url, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    try {
        const [results] = await db.execute(sql, [data.image, data.url]);

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
      const [results] = await db.execute('SELECT * FROM banners ORDER BY created_at DESC');
      
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
  
      let query = 'SELECT * FROM banners';
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['url'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM banners');
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

  update: async (id, data, userDetails) => {
    const sql = 'UPDATE banners SET image = ?, url = ?, updated_at = NOW() WHERE id = ?';
    
    try {
      const [results] = await db.execute(sql, [data.image, data.url, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id, userDetails) => {
    try {
      const [results] = await db.execute('DELETE FROM banners WHERE id = ?', [id]);
      

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Banners;