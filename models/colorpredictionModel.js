const db = require('../config/db');

const colorprediction = {
    placeHalfMinBet: async (data) => {
        const sql = 'INSERT INTO halfmin_bet (roundId, playerId, status, betAmt, selected, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
        const playerSql = 'SELECT * FROM players WHERE id = ?';
        const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.roundId, data.playerId, data.status, data.betAmt, data.selected]);
            const [player] = await db.execute(playerSql, [data.playerId]);
            const [balance] = await db.execute(balanceSql, [(player[0].balance - data.betAmt), data.playerId]);


            let dataJSON = {
                status: 'success',
                data: results
            }
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getHalfMinBetByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM halfmin_bet';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM halfmin_bet');
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
    getHalfMinRoundByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM color_halfmin';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM color_halfmin');
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
    
    
    
    
    
    placeOneMinBet: async (data) => {
        const sql = 'INSERT INTO onemin_bet (roundId, playerId, status, betAmt, selected, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
        const playerSql = 'SELECT * FROM players WHERE id = ?';
        const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.roundId, data.playerId, data.status, data.betAmt, data.selected]);
            const [player] = await db.execute(playerSql, [data.playerId]);
            const [balance] = await db.execute(balanceSql, [(player[0].balance - data.betAmt), data.playerId]);


            let dataJSON = {
                status: 'success',
                data: results
            }
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getOneMinBetByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM onemin_bet';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM onemin_bet');
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
    getOneMinRoundByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM color_onemin';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM color_onemin');
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
    
    
    
    
    
    
    placeThreeMinBet: async (data) => {
        const sql = 'INSERT INTO threemin_bet (roundId, playerId, status, betAmt, selected, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
        const playerSql = 'SELECT * FROM players WHERE id = ?';
        const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.roundId, data.playerId, data.status, data.betAmt, data.selected]);
            const [player] = await db.execute(playerSql, [data.playerId]);
            const [balance] = await db.execute(balanceSql, [(player[0].balance - data.betAmt), data.playerId]);


            let dataJSON = {
                status: 'success',
                data: results
            }
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getThreeMinBetByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM threemin_bet';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM threemin_bet');
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
    getThreeMinRoundByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM color_threemin';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM color_threemin');
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
    
    
    
    
    
    
    placeFiveMinBet: async (data) => {
        const sql = 'INSERT INTO fivemin_bet (roundId, playerId, status, betAmt, selected, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
        const playerSql = 'SELECT * FROM players WHERE id = ?';
        const balanceSql = 'UPDATE players SET balance = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [data.roundId, data.playerId, data.status, data.betAmt, data.selected]);
            const [player] = await db.execute(playerSql, [data.playerId]);
            const [balance] = await db.execute(balanceSql, [(player[0].balance - data.betAmt), data.playerId]);


            let dataJSON = {
                status: 'success',
                data: results
            }
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getFiveMinBetByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM fivemin_bet';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM fivemin_bet');
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
    getFiveMinRoundByPage: async (limit, pageNo, searchtxt) => {
        try {
            const offset = (pageNo - 1) * limit;

            let query = 'SELECT * FROM color_fivemin';
            let queryParams = [];

            if (searchtxt) {
                const columns = ['roundId'];
                const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
                query += ` WHERE ${searchConditions}`;
                queryParams = columns.map(() => `%${searchtxt}%`);
            }

            query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            const [results] = await db.execute(query, queryParams);

            const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM color_fivemin');
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
};

module.exports = colorprediction;