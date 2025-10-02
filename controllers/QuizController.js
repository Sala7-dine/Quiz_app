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
            console.log(data);
            this.render('home/questions' , {questions : data});

        }catch(err) {
            this.handleError(err);
        }

    }


    async saveQuizResult(req, res) {
        try {
            const { pseudo, theme_id, score, total_questions, time_spent, answers } = req.body;
            
            if (!pseudo || !theme_id || score === undefined || !total_questions) {
                return res.status(400).json({ success: false, message: 'Données manquantes' });
            }

            await QuizModel.saveGameResult({
                pseudo,
                theme_id: parseInt(theme_id),
                score: parseInt(score),
                total_questions: parseInt(total_questions),
                time_spent: parseInt(time_spent) || 0,
                answers: answers || []
            });

            res.json({ success: true, message: 'Résultat sauvegardé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }

    async getHistory(req, res) {
        try {
            const { pseudo } = req.query;
            if (!pseudo) {
                return res.status(400).json({ success: false, message: 'Pseudo manquant' });
            }

            const history = await QuizModel.getGameHistory(pseudo);
            res.json({ success: true, data: history });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique:', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }

    async getLeaderboard(req, res) {
        try {
            const topScores = await QuizModel.getTopScores(10);
            res.json({ success: true, data: topScores });
        } catch (error) {
            console.error('Erreur lors de la récupération du classement:', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }
}

module.exports = QuizController;