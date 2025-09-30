const { pool } = require('../config/database');

class UsereModel {
    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM users");
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(userInfo) {
        try {
            await pool.query("INSERT INTO users (name , email , password) VALUES (? , ? , ?)", [userInfo.username ,userInfo.email,userInfo.password]);
            return { success: true };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UsereModel;