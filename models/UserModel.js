const { pool } = require('../config/database');


class UserModel {
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

        static async findByEmail(email) {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM users WHERE email = ? LIMIT 1",
                [email]
            );
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserModel;