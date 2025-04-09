const db = require('../config/db');

const luckyjet = {
    changeResult: async (id, data) => {
        const sql = 'UPDATE luckyjet_round SET crashPoint = ? WHERE id = ?';
        try {
        const [results] = await db.execute(sql, [data.crashPoint, id]);
        
        let dataJson = {
            status: 'success',
            data: results
        }
        return dataJson;
        } catch (err) {
        throw err;
        }
    },
    getAllRounds: async () => {
      try {
        const [results] = await db.execute(`SELECT * FROM luckyjet_round`);
        let dataJSON = {
          status: 'success',
          data: results
        };
        
        return dataJSON;
      } catch (err) {
        throw err;
      }
    },
};

module.exports = luckyjet;