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

}

module.exports = QuestionController;
