const BaseController = require('../core/BaseController');
const { pool } = require('../config/database');

class AdminController extends BaseController {
    async dashboard(req, res) {
        try {
            // Collecter quelques statistiques de base
            const queries = [
                pool.query('SELECT COUNT(*) as total FROM users'),
                pool.query('SELECT COUNT(*) as total FROM themes'),
                pool.query('SELECT COUNT(*) as total FROM questions'),
                pool.query('SELECT COUNT(*) as total FROM games'),
                pool.query('SELECT pseudo, COUNT(*) as games_played, AVG(score/total_questions * 100) as success_rate FROM games GROUP BY pseudo ORDER BY games_played DESC LIMIT 5')
            ];

            const [usersRes, themesRes, questionsRes, gamesRes, topPlayersRes] = await Promise.all(queries);

            const stats = {
                users: usersRes[0][0]?.total || 0,
                themes: themesRes[0][0]?.total || 0,
                questions: questionsRes[0][0]?.total || 0,
                games: gamesRes[0][0]?.total || 0,
                topPlayers: topPlayersRes[0] || []
            };

            res.render('admin/dashboard', { stats, user: req.session.user });
        } catch (error) {
            this.handleError(error);
        }
    }
}

module.exports = AdminController;
