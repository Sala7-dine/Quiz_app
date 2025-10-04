const BaseController = require('../core/BaseController');
const UserModel = require('../models/UserModel');

class HomeController extends BaseController {
    async getUsers(req, res) {
        try {
            const data = await UserModel.getAll();
            this.render('index', { users: data });
        } catch (error) {
            this.handleError(error);
        }
    }

    async postUser(req, res) {
        try {
            const userInfo = req.body;
            console.log(req.bdoy);
            await UserModel.create(userInfo);
            res.redirect('/');
        } catch (error) {
            this.handleError(error);
        }
    }
}

module.exports = HomeController;