const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');


router.get('/', async (req, res) => {

    const controller = new HomeController(req, res);
    await controller.getUsers(req, res);

});

router.post('/add',async (req, res) => {
    const controller = new HomeController(req, res);
    await controller.postUser(req, res);
});

module.exports = router;