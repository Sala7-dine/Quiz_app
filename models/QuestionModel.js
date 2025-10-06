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

      let themeId = questionInfo.theme_id;
      if ((!themeId || themeId === '') && questionInfo.newTheme) {
        const [result] = await pool.query(
          "INSERT INTO themes (titre) VALUES (?)",
          [questionInfo.newTheme]
        );
        themeId = result.insertId;
      }
      if (!themeId) {
        throw new Error("Aucun thème n'a été sélectionné ou créé.");
      }
      await pool.query(
        "INSERT INTO questions (theme_id, question, options, correct_answer) VALUES (?, ?, ?, ?)",
        [themeId, questionInfo.question, optionsJSON, correct_answer]
      );

      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la création de la question :', err);
      throw err;
    }
  }


  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT q.*, t.titre AS theme_name
        FROM questions q
        LEFT JOIN themes t ON q.theme_id = t.id
        ORDER BY q.id DESC
      `);
      return rows;
    } catch (err) {
      console.error('Erreur lors de la récupération des questions :', err);
      throw err;
    }
  }

 
  static async getByTheme(theme_id) {
    try {
      const [rows] = await pool.query(
        "SELECT q.*, t.titre AS theme_name FROM questions q LEFT JOIN themes t ON q.theme_id = t.id WHERE q.theme_id = ?",
        [theme_id]
      );
      return rows;
    } catch (err) {
      console.error('Erreur lors de la récupération des questions par thème :', err);
      throw err;
    }
  }

 
  static async getAllThemes() {
    try {
      const [themes] = await pool.query("SELECT * FROM themes ORDER BY id DESC");
      return themes;
    } catch (err) {
      console.error('Erreur lors de la récupération des thèmes :', err);
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
      console.error('Erreur lors de la création du thème :', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM questions WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw err;
    }
}

static async getById(id) {
        const [rows] = await pool.query("SELECT * FROM questions WHERE id = ?", [id]);
        return rows[0];
    }


    static async update(id, data) {
        const options = [data.option1, data.option2, data.option3, data.option4];
        const optionsJSON = JSON.stringify(options);
        const correct_answer = parseInt(data.correct);

        const [result] = await pool.query(
            "UPDATE questions SET theme_id = ?, question = ?, options = ?, correct_answer = ? WHERE id = ?",
            [data.theme_id, data.question, optionsJSON, correct_answer, id]
        );

        return result.affectedRows > 0;
    }
}

module.exports = QuestionModel;
