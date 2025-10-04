const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const QuizController = require("../controllers/QuizController");
const AuthController = require("../controllers/AuthController");
const AuthController = require('../controllers/AuthController');


router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

router.get('/quiz', async (req, res) => {

    const controller = new QuizController(req, res);
    await controller.getQuiz(req, res);
});
// router.post('/add',async (req, res) => {
//     const controller = new HomeController(req, res);
//     await controller.postUser(req, res);
// });

router.post('/add',async (req, res) => {
    const controller = new AuthController(req, res);
    await controller.postUser(req, res);
});

router.post('/connexion',async (req, res) => {
    const controller = new AuthController(req, res);
    await controller.loginUser(req, res);
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


router.get('/quiz/questions' , async (req , res) => {

    try{
        const controller = new QuizController(req , res);
        await controller.getAllQuestions(req , res);

    }catch (err) {
        throw err;
    }
});



// Route pour sauvegarder les résultats du quiz
router.post('/quiz/save-result', async (req, res) => {
    try {
        const controller = new QuizController(req, res);
        await controller.saveQuizResult(req, res);
    } catch (err) {
        throw err;
    }
});

// Route pour récupérer l'historique d'un joueur
router.get('/quiz/history', async (req, res) => {
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

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


module.exports = router;