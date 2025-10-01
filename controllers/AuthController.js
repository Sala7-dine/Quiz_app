const BaseController = require('../core/BaseController');
const UserModel = require('../models/UserModel');
const bcrypt = require("bcrypt");
class AuthController extends BaseController{
    async postUser(req, res) {
        try {
              const saltRounds = 10;
            const userInfo = req.body;
             const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
            userInfo['password'] = hashedPassword;        
            console.log('pass',userInfo.password)
            await UserModel.create(userInfo);
            res.redirect('/');
        } catch (error) {
            this.handleError(error);
        }
    }
}

    module.exports = AuthController;