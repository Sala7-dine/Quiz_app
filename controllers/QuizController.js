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
            const themeId = req.query.choice;
            const data = await QuizModel.getAllQuestions(themeId);
            
            // Vérifier si des questions existent
            if (!data || data.length === 0) {
                return res.status(404).render('home/quiz', { 
                    themes: await QuizModel.getAllTheme(),
                    error: 'Aucune question trouvée pour ce thème.' 
                });
            }

            this.render('home/questions' , {
                questions: data,
                themeId: themeId
            });

        }catch(err) {
            this.handleError(err);
        }

    }


    async saveQuizResult(req, res) {
        try {
            const { pseudo, theme_id, score, total_questions, time_spent, answers } = req.body;

            const normalizedPseudo = pseudo ? pseudo.toLowerCase().trim() : null;

            if (!normalizedPseudo || !theme_id || score === undefined || !total_questions) {
                return res.status(400).json({ success: false, message: 'Données manquantes' });
            }

            const gameData = {
                pseudo: normalizedPseudo,
                theme_id: parseInt(theme_id),
                score: parseInt(score),
                total_questions: parseInt(total_questions),
                time_spent: parseInt(time_spent) || 0,
                answers: answers || []
            };
            
            const result = await QuizModel.saveGameResult(gameData);

            res.json({ success: true, message: 'Résultat sauvegardé avec succès' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }

    async getHistory(req, res) {
        try {
            const { pseudo } = req.query;
            if (!pseudo) {
                return res.status(400).json({ success: false, message: 'Pseudo manquant' });
            }

            const normalizedPseudo = pseudo.toLowerCase().trim();
            
            const history = await QuizModel.getGameHistory(normalizedPseudo);
            
            res.json({ success: true, data: history });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }

    async getLeaderboard(req, res) {
        try {
            const topScores = await QuizModel.getTopScores(10);
            res.json({ success: true, data: topScores });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }
}

module.exports = QuizController;