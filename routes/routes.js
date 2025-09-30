const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const QuizController = require("../controllers/QuizController");

router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

router.get('/quiz', async (req, res) => {

    const controller = new QuizController(req, res);
    await controller.getQuiz(req, res);

});


router.get('/quiz/questions' , async (req , res) => {

    try{
        const controller = new QuizController(req , res);
        await controller.getAllQuestions(req , res);

    }catch (err) {
        throw err;
    }
})


router.post('/add',async (req, res) => {
    const controller = new HomeController(req, res);
    await controller.postUser(req, res);
});

module.exports = router;