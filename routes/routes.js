const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');
const QuestionController = require('../controllers/QuestionController');


router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

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
router.get('/admin/create', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.showCreate(req, res);
});

router.post('/save-question', async (req, res) => {
    const controller = new QuestionController(req, res);
    await controller.postQuestion(req, res);
});

module.exports = router;