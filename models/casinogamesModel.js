const db = require('../config/db');

const casinogames = {
  create: async (data) => {
    const sql = 'INSERT INTO casinogames (name, providerCode, categoryId, thumbnail, thumbnailId, slug, created_at, updated_at) VALUES (?,?,?,?,?,?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.name , data.providerCode , data.categoryId , data.thumbnail , data.thumbnailId , data.slug]);
      
      
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
      const [results] = await db.execute(`SELECT * FROM casinogames ORDER BY created_at DESC`);
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
    
        let query = 'SELECT * FROM casinogames';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['name'];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM casinogames');
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
    const sql = 'UPDATE casinogames SET name = ?, providerCode = ?, categoryId = ?, thumbnail = ?, thumbnailId = ?, slug = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, data.providerCode, data.categoryId, data.thumbnail, data.thumbnailId, data.slug, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id,userDetails) => {
    try {
      const [results] = await db.execute('DELETE FROM casinogames WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = casinogames;
