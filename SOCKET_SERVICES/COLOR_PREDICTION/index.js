require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());

// ✅ Use MySQL Connection Pool
const db = mysql.createPool({
    connectionLimit: 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("Connected to MySQL Database");
        connection.release();
    }
});

// ✅ Round Timers and Configurations
const rounds = {
    "1minute": { duration: 60, table: "color_onemin", timer: null },
    "3minute": { duration: 180, table: "color_threemin", timer: null },
    "5minute": { duration: 300, table: "color_fivemin", timer: null }
};

// ✅ Track active users in rounds
const activeUsers = {};

// ✅ Function to start a round
function startRound(roundName) {
    const round = rounds[roundName];
    let secondsLeft = round.duration;
    const roundId = `${Date.now()}`;
    console.log(`Starting ${roundName} with ID: ${roundId}`);

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database connection error:", err);
            return;
        }

        // Insert new round into database
        connection.query(`INSERT INTO ${round.table} (roundId, startTime) VALUES (?, NOW())`, 
            [roundId], 
            (err) => {
                connection.release();
                if (err) {
                    console.error("Error inserting round:", err);
                    return;
                }
            }
        );
    });

    // Send live timer updates
    round.timer = setInterval(() => {
        if (secondsLeft > 0) {
            io.to(roundName).emit("timer_update", { roundId, secondsLeft });
            secondsLeft--;
        } else {
            clearInterval(round.timer);
            endRound(roundName, roundId);
        }
    }, 1000);
}

// ✅ Function to end a round
function endRound(roundName, roundId) {
    const round = rounds[roundName];

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return;
        }

        // Check if admin has set a static result
        connection.query(`SELECT result FROM ${round.table} WHERE roundId=?`, [roundId], (err, rows) => {
            if (err) {
                console.error("Error checking result:", err);
                connection.release();
                return;
            }

            let result = rows[0]?.result;

            // If no result is set by admin, generate one
            if (!result) {
                result = Math.floor(Math.random() * 10).toString(); // Generate number 0-9
                connection.query(`UPDATE ${round.table} SET result=? WHERE roundId=?`, [result, roundId], () => {
                    connection.release();
                });
            } else {
                connection.release();
            }

            console.log(`Round ${roundName} ended with ID: ${roundId}, Result: ${result}`);
            io.to(roundName).emit("round_result", { roundId, result });

            activeUsers[roundName] = [];
            setTimeout(() => startRound(roundName), 5000); // Delay before new round starts
        });
    });
}

// ✅ Handle Admin-Set Result via Socket
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ User joins a round
    socket.on("join_round", (roundName) => {
        if (!rounds[roundName]) return;

        socket.join(roundName);
        if (!activeUsers[roundName]) activeUsers[roundName] = [];
        activeUsers[roundName].push(socket.id);

        console.log(`User ${socket.id} joined ${roundName}`);
    });

    // ✅ Admin sets a round result manually
    socket.on("set_round_result", ({ roundId, roundType, result }) => {
        const round = rounds[roundType];
        if (!round) return;

        db.getConnection((err, connection) => {
            if (err) {
                console.error("Database error:", err);
                return;
            }

            connection.query(
                `UPDATE ${round.table} SET result=? WHERE roundId=?`,
                [result, roundId],
                (err) => {
                    connection.release();
                    if (err) {
                        console.error("Error updating result:", err);
                        return;
                    }

                    console.log(`✅ Result updated for ${roundType} Round ID: ${roundId}, Result: ${result}`);
                    // io.to(roundType).emit("round_result", { roundId, result });
                }
            );
        });
    });


    // ✅ Handle user disconnection
    socket.on("disconnect", () => {
        Object.keys(activeUsers).forEach((roundName) => {
            activeUsers[roundName] = activeUsers[roundName].filter((id) => id !== socket.id);
        });
        console.log("User disconnected:", socket.id);
    });
});

// ✅ Start all rounds initially
Object.keys(rounds).forEach(startRound);

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});
