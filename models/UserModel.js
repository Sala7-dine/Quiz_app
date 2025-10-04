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
            // Normaliser le nom : minuscules et sans espaces superflus
            const normalizedName = userInfo.username.toLowerCase().trim();
            await pool.query("INSERT INTO users (name , email , password) VALUES (? , ? , ?)", [normalizedName, userInfo.email, userInfo.password]);
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

    static async findByEmailAndPassword(email, password) {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1",
                [email, password]
            );
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserModel;