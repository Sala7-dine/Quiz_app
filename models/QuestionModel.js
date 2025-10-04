const { pool } = require('../config/database');

class QuestionModel {
  /**
   * 🟢 إنشاء سؤال جديد
   * يدعم إضافة theme جديد أو استعمال theme موجود
   */
  static async create(questionInfo) {
    try {
      // تجميع الخيارات الأربعة في مصفوفة
      const options = [
        questionInfo.option1,
        questionInfo.option2,
        questionInfo.option3,
        questionInfo.option4
      ];

      // تحويل المصفوفة إلى JSON قبل حفظها
      const optionsJSON = JSON.stringify(options);

      // تحويل رقم الإجابة الصحيحة إلى int
      const correct_answer = parseInt(questionInfo.correct);

      let themeId = questionInfo.theme_id;

      // ✅ إذا المستخدم كتب theme جديد بدل اختيار من القائمة
      if ((!themeId || themeId === '') && questionInfo.newTheme) {
        const [result] = await pool.query(
          "INSERT INTO themes (titre) VALUES (?)",
          [questionInfo.newTheme]
        );
        themeId = result.insertId;
      }

      // ✅ التأكد من أن themeId موجود فعلاً
      if (!themeId) {
        throw new Error("Aucun thème n'a été sélectionné ou créé.");
      }

      // ✅ إدخال السؤال
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

  /**
   * 🟢 جلب جميع الأسئلة مع عنوان الـ theme
   */
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

  /**
   * 🟢 جلب الأسئلة حسب theme معين
   */
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

  /**
   * 🟢 جلب جميع الـ themes
   */
  static async getAllThemes() {
    try {
      const [themes] = await pool.query("SELECT * FROM themes ORDER BY id DESC");
      return themes;
    } catch (err) {
      console.error('Erreur lors de la récupération des thèmes :', err);
      throw err;
    }
  }

  /**
   * 🟢 إنشاء theme جديد
   */
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
}

module.exports = QuestionModel;
