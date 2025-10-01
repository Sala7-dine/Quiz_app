const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');


router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

// router.post('/add',async (req, res) => {
//     const controller = new HomeController(req, res);
//     await controller.postUser(req, res);
// });

router.post('/add',async (req, res) => {
    const controller = new AuthController(req, res);
    await controller.postUser(req, res);
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});
router.get('/login', (req, res) => {
  res.render('auth/login');
});

module.exports = router;