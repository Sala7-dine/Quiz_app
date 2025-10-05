const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const QuizController = require("../controllers/QuizController");
const AuthController = require("../controllers/AuthController");
const { requireAuth, optionalAuth, requireAdmin } = require('../middleware/auth');
const QuestionController = require('../controllers/QuestionController');
const AdminController = require('../controllers/AdminController');


router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

router.post('/add',async (req, res) => {
    const controller = new AuthController(req, res);
    controller.showLoginPage(req, res);
});


// ========== Routes d'Authentification (publiques) ==========

// Page de connexion
router.get('/auth/login', (req, res) => {
    const controller = new AuthController(req, res);
    controller.showLoginPage(req, res);
});

// Page d'inscription
router.get('/auth/register', (req, res) => {
    const controller = new AuthController(req, res);
    controller.showRegisterPage(req, res);
});

// Connexion utilisateur
router.post('/auth/login', async (req, res) => {
    const controller = new AuthController(req, res);
    await controller.login(req, res);
});

// Inscription utilisateur
router.post('/auth/register', async (req, res) => {
    const controller = new AuthController(req, res);
    await controller.register(req, res);
});

// Déconnexion utilisateur
router.post('/auth/logout', (req, res) => {
    const controller = new AuthController(req, res);
    controller.logout(req, res);
});

// Vérifier l'authentification
router.get('/auth/check', (req, res) => {
    const controller = new AuthController(req, res);
    controller.checkAuth(req, res);
});

// Inscription utilisateur (depuis page d'accueil)
router.post('/add',async (req, res) => {
    const controller = new HomeController(req, res);
    await controller.postUser(req, res);
});

// ========== Routes Protégées ==========

// Route protégée - nécessite authentification
router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard');
});

// Route protégée - nécessite authentification
router.get('/quiz/questions', requireAuth, async (req , res) => {
    try{
        const controller = new QuizController(req , res);
        await controller.getAllQuestions(req , res);
    }catch (err) {
        throw err;
    }
});

// Route protégée - page de sélection des thèmes
router.get('/quiz', requireAuth, async (req, res) => {
    try {
        const controller = new QuizController(req, res);
        await controller.getQuiz(req, res);
    } catch (err) {
        throw err;
    }
});
router.get('/admin/create', requireAdmin, async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.showCreate(req, res);
});

// Admin dashboard
router.get('/admin/dashboard', requireAdmin, async (req, res) => {
    const controller = new AdminController(req, res);
    await controller.dashboard(req, res);
});


// Routes protégées pour les résultats de quiz
router.post('/quiz/save-result', requireAuth, async (req, res) => {
    try {
        const controller = new QuizController(req, res);
        await controller.saveQuizResult(req, res);
    } catch (err) {
        throw err;
    }
});

// Route protégée pour récupérer l'historique d'un joueur
router.get('/quiz/history', requireAuth, async (req, res) => {
    try {
        const controller = new QuizController(req, res);
        await controller.getHistory(req, res);
    } catch (err) {
        throw err;
    }
});

// Route pour récupérer le classement
router.get('/quiz/leaderboard', async (req, res) => {
    try {
        const controller = new QuizController(req, res);
        await controller.getLeaderboard(req, res);
    } catch (err) {
        throw err;
    }
});

// router.get('/dashboard', (req, res) => {
//     res.render('dashboard');
// });


router.post('/save-question', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.postQuestion(req, res);
});
router.get('/admin/questions', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.listQuestions(req, res);
});

router.get('/admin/questions/delete/:id', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.deleteQuestion(req, res);
});


router.get('/admin/questions/edit/:id', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.showEdit(req, res);
});

router.post('/admin/questions/update/:id', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.updateQuestion(req, res);
});

module.exports = router;