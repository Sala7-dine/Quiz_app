const { pool } = require('../config/database');

class QuizModel {

    static async getAllTheme() {
        try {
            const [rows] = await pool.query("SELECT * FROM themes");
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAllQuestions(theme){

        try {
            const [rows] = await pool.query("SELECT * FROM questions where theme_id = ?" , [theme]);
            return rows.map(row => ({
                ...row,
                multiQuestion: row.multi_question,
                correctAnswer: typeof row.correct_answer === 'string' ? JSON.parse(row.correct_answer) : row.correct_answer,
                options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options
            }));
        }catch (error){
            throw error;
        }
    }

    static async create(userInfo) {
        try {
            await pool.query("INSERT INTO users (name , email , password) VALUES (? , ? , ?)", [userInfo.username ,userInfo.email,userInfo.password]);
            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    static async saveGameResult(gameData) {
        try {
            const { pseudo, theme_id, score, total_questions, time_spent, answers } = gameData;
            
            const [result] = await pool.query(
                "INSERT INTO games (pseudo, theme_id, score, total_questions, time_spent, answers) VALUES (?, ?, ?, ?, ?, ?)", 
                [pseudo, theme_id, score, total_questions, time_spent, JSON.stringify(answers)]
            );
            
            return { success: true, insertId: result.insertId };
        } catch (error) {
            throw error;
        }
    }

    static async getGameHistory(pseudo, limit = 10) {
        try {
            const [rows] = await pool.query(`
                SELECT g.*, t.titre as theme_name 
                FROM games g 
                JOIN themes t ON g.theme_id = t.id 
                WHERE g.pseudo = ? 
                ORDER BY g.created_at DESC 
                LIMIT ?
            `, [pseudo, limit]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getTopScores(limit = 10) {
        try {
            const [rows] = await pool.query(`
                SELECT pseudo, AVG(score) as avg_score, COUNT(*) as games_played, 
                       AVG(score/total_questions * 100) as success_rate
                FROM games 
                GROUP BY pseudo 
                ORDER BY avg_score DESC, success_rate DESC 
                LIMIT ?
            `, [limit]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuizModel;