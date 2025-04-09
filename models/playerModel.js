const db = require('../config/db');
const jwt = require("jsonwebtoken");

const Players = {
    create : async (latitude, longitude, data, city , region, country) => {
        const insertQuery = `INSERT INTO players 
            (userName, password, mobile, email, referId, affiliatorId, gender, isActive, latitude, longitude, ip, token, balance, bonus,city , region, country, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    
        const checkQuery = "SELECT COUNT(*) AS count FROM players WHERE referId = ?";
    
        try {
            // Function to generate a unique 7-character referId
            const generateUniqueReferId = async () => {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let newReferId;
                let isUnique = false;
    
                while (!isUnique) {
                    newReferId = "";
                    for (let i = 0; i < 7; i++) {
                        newReferId += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
    
                    // Check if referId already exists in the database
                    const [rows] = await db.execute(checkQuery, [newReferId]);
                    if (rows[0].count === 0) {
                        isUnique = true; // Found a unique referId
                    }
                }
    
                return newReferId;
            };
    
            // Generate a unique referId
            const uniqueReferId = await generateUniqueReferId();

    
            // Insert the new record with the unique referId
            const [results] = await db.execute(insertQuery, [
                data.userName,
                data.password,
                data.mobile,
                data.email,
                uniqueReferId,
                data.affiliatorId,
                data.gender,
                data.isActive,
                latitude,
                longitude,
                data.ip,
                '',
                data.balance,
                data.bonus,
                city ,
                region,
                country
            ]);
    
            let token;
            if(data){
                token = jwt.sign({id : results.insertId, type : 'Player'}, process.env.JWT_KEY);
                await Players.updateUserToken(results.insertId, token);
            }
            
            const insertedId = results.insertId;

            const [createdPlayer] = await db.execute('SELECT * FROM players WHERE id = ?', [insertedId]);

            return {
                status: "success",
                data: results,
                token: token,
                createdPlayer: createdPlayer[0],
                insertId: results.insertId
            };
        } catch (err) {
            throw err;
        }
    },
    

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM players ORDER BY created_at DESC`);

            const modifiedResults = results.map(user => ({
                ...user,
                roleName: user.roleName
            }));

            let dataJSON = {
                status: 'success',
                data: modifiedResults
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getBalance: async (id) => {
        try {
            const [results] = await db.execute(`SELECT * FROM players WHERE id = ?`, [id]);

            let json = {
               playerId : id,
               balance : results[0].balance,
               bonus : results[0].bonus,
            }

            let dataJSON = {
                status: 'success',
                data: json
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getById: async (id) => {
        try {
            const [results] = await db.execute(`SELECT * FROM players WHERE id = ?`, [id]);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getByAffiliatorId: async (id) => {
        try {
            const [results] = await db.execute(`SELECT * FROM players WHERE affiliatorId = ?`, [id]);

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
      
          let query = 'SELECT * FROM players';
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['userName','email','mobile','affiliatorId','referId','balance','bonus'];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM players');
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


    getUserStatus: async (id) => {
        const sql = 'SELECT * FROM players WHERE id = ?';
        try {
            const [results] = await db.execute(`SELECT * FROM players WHERE id = ?`, [id]);

            let dataJSON = {
                status: 'success',
                data: results[0]
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    update: async (id, data) => {
        const sqlUpdate = 'UPDATE players SET userName = ?, password = ?, referId = ?, affiliatorId = ?, gender = ?, isActive = ?, mobile = ?, email = ?,latitude = ?, longitude = ?, ip = ?, balance = ?, bonus = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [updateResults] = await db.execute(sqlUpdate, [data.userName, data.password, data.referId, data.affiliatorId, data.gender, data.isActive, data.mobile, data.email,latitude ,longitude , data.ip, data.balance, data.bonus, id]);


            const sqlSelect = 'SELECT * FROM players WHERE id = ?';
            const [updatedUser] = await db.execute(sqlSelect, [id]);

            if (updatedUser.length === 0) {
                throw new Error('User not found');
            }

            let dataJSON = {
                status: 'success',
                data: updatedUser[0]
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    updateUserToken: async (id, data) => {
        const sqlUpdate = 'UPDATE players SET token = ?, updated_at = NOW() WHERE id = ?';
        try {
            db.execute(sqlUpdate, [data, id]);
        } catch (err) {
            throw err;
        }
    },

    updatePlayerBalance: async (id, balance) => {
        const sql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [balance, id]);


            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    updateUserStatus: async (id, isActive) => {
        const sql = 'UPDATE players SET isActive = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [isActive, id]);


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
            const [results] = await db.execute('DELETE FROM players WHERE id = ?', [id]);

            return results;
        } catch (err) {
            throw err;
        }
    },
    findByuserName: async (lat, lon , userName, ip, city , region, country) => {
        const sql = 'SELECT * FROM players WHERE userName = ?';
        try {

            const [results] = await db.execute(sql, [userName]);

            if (results.length > 0) {
                await db.execute('UPDATE players SET latitude = ?, longitude = ?, ip = ?, city = ?, region = ?, country = ? WHERE id = ?', [lat, lon, ip, city , region, country, results[0].id]);

                return {
                    status: 'success',
                    data: results[0]
                };
            } else {
                return {
                    status: 'not_found',
                    data: null
                };
            }
        } catch (err) {
            throw err;
        }
    },
    verifyPassword: async function (inputPassword, storedPassword) {
        try {
            return inputPassword === storedPassword;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = Players;