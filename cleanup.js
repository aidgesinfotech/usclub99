import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    const formattedDate = yesterday.toISOString().split('T')[0];

    const tables = ["color_onemin", "color_threemin", "color_fivemin"];

    try {
        for (const table of tables) {
            await db.execute(`DELETE FROM ${table} WHERE DATE(startTime) = ?`, [formattedDate]);
        }
        console.log(`✅ Deleted old round data for ${formattedDate}`);
        res.status(200).json({ success: true, message: "Old data deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting old data:", error);
        res.status(500).json({ success: false, message: "Error deleting data" });
    } finally {
        await db.end();
    }
}
