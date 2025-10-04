const BaseController = require("../core/BaseController");
const QuestionModel = require("../models/QuestionModel");

class QuestionController extends BaseController {
  async showCreate(req, res) {
    try {
      const themes = await QuestionModel.getAllThemes();
      res.render("admin/create_question", { themes });
    } catch (error) {
      this.handleError(error);
    }
  }

  async postQuestion(req, res) {
    try {
      const {
        question,
        theme_id,
        newTheme,
        option1,
        option2,
        option3,
        option4,
        correct,
      } = req.body;

      let finalThemeId = theme_id;

      if (newTheme && newTheme.trim() !== "") {
        finalThemeId = await QuestionModel.createTheme(newTheme.trim());
      }
      await QuestionModel.create({
        theme_id: finalThemeId,
        question,
        option1,
        option2,
        option3,
        option4,
        correct,
      });

      res.redirect("/admin/create");
    } catch (error) {
      this.handleError(error);
    }
  }

  async listQuestions(req, res) {
    try {
      const themes = await QuestionModel.getAllThemes();
      const themeId = req.query.theme_id;
      let questions = [];

      if (themeId) {
        questions = await QuestionModel.getByTheme(themeId);
      }

      res.render("admin/list_questions", {
        themes,
        questions,
        selectedTheme: themeId,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  async deleteQuestion(req, res) {
    try {
      const { id } = req.params;
      const deleted = await QuestionModel.delete(id);

      if (!deleted) {
        return res.status(404).send("Question non trouvée");
      }

      res.redirect("/admin/questions");
    } catch (error) {
      this.handleError(
        res,
        error,
        "Erreur lors de la suppression de la question"
      );
    }
  }

 
  async showEdit(req, res) {
    try {
      const { id } = req.params;
      const question = await QuestionModel.getById(id); 
      const themes = await QuestionModel.getAllThemes();

      if (!question) return res.status(404).send("Question non trouvée");

     
      let options = (() => {
        const raw = question.options;
        if (Array.isArray(raw)) return raw.slice(0, 4);
        if (typeof raw === "string") {
          try {
            const p = JSON.parse(raw);
            if (Array.isArray(p)) return p.slice(0, 4);
          } catch (e) {}
          return raw
            .split(",")
            .map((s) => s.trim())
            .slice(0, 4);
        }
        return [String(raw)];
      })();
      while (options.length < 4) options.push("");

      res.render("admin/edit_question", { question, options, themes });
    } catch (error) {
      this.handleError(error);
    }
  }

  
  async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const {
        question,
        theme_id,
        newTheme,
        option1,
        option2,
        option3,
        option4,
        correct,
      } = req.body;

      let finalThemeId = theme_id;
      if (newTheme && newTheme.trim() !== "") {
        finalThemeId = await QuestionModel.createTheme(newTheme.trim());
      }

      await QuestionModel.update(id, {
        theme_id: finalThemeId,
        question,
        option1,
        option2,
        option3,
        option4,
        correct,
      });

      res.redirect("/admin/questions");
    } catch (error) {
      this.handleError(error);
    }
  }
}

module.exports = QuestionController;
