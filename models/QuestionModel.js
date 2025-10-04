const { pool } = require('../config/database');

class QuestionModel {

    static async create(questionInfo) {
        try {
            const options = [
                questionInfo.option1,
                questionInfo.option2,
                questionInfo.option3,
                questionInfo.option4
            ];
            const optionsJSON = JSON.stringify(options); 
            const correct_answer = parseInt(questionInfo.correct); 
            await pool.query(
                "INSERT INTO questions (theme_id, question, options, correct_answer) VALUES (?, ?, ?, ?)",
                [questionInfo.theme_id, questionInfo.question, optionsJSON, correct_answer]
            );

            return { success: true };
        } catch (err) {
            throw err;
        }
    }
    static async getAllThemes() {
        try {
            const [themes] = await pool.query("SELECT * FROM themes");
            return themes;
        } catch (err) {
            throw err;
        }
    }
    static async createTheme(titre) {
        try {
            const [result] = await pool.query(
                "INSERT INTO themes (titre) VALUES (?)",
                [titre]
            );
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = QuestionModel;
