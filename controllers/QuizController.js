const BaseController = require('../core/BaseController');
const QuizModel = require("../models/QuizModel");

class QuizController extends BaseController {

    async getQuiz(req , res) {

        try {
            const data = await QuizModel.getAllTheme();
            this.render('home/quiz' , { themes : data });
        }catch(error) {
            this.handleError(error);
        }
    }

    async getAllQuestions(req , res) {

        try {
            const data = await QuizModel.getAllQuestions(req.query.choice);
            this.render("home/questions" , {questions : data});
        }catch(err) {
            this.handleError(err);
        }

    }
}

module.exports = QuizController;