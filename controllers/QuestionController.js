const BaseController = require('../core/BaseController');
const QuestionModel = require('../models/QuestionModel');

class QuestionController extends BaseController {
    async showCreate(req, res) {
        try {
            const themes = await QuestionModel.getAllThemes();
            res.render('admin/create_question', { themes });
        } catch (error) {
            this.handleError(error);
        }
    }

    async postQuestion(req, res) {
        try {
            const { question, theme_id, newTheme, option1, option2, option3, option4, correct } = req.body;

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
                correct
            });

            res.redirect('/admin/create');
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

            res.render('admin/list_questions', { themes, questions, selectedTheme: themeId });
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
        this.handleError(res, error, "Erreur lors de la suppression de la question");
    }
}
    

}

module.exports = QuestionController;
