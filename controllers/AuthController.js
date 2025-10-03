const BaseController = require('../core/BaseController');
const UserModel = require('../models/UserModel');

const bcrypt = require("bcrypt");
class AuthController extends BaseController{
 async postUser(req, res) {
  try {
    const saltRounds = 10;
    const userInfo = req.body;

    const existingUser = await UserModel.findByEmail(userInfo.email);
    if (existingUser) {
      return res.status(400).send("Cet email est déjà utilisé !");
    }

  
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    userInfo['password'] = hashedPassword;

    await UserModel.create(userInfo);

    res.redirect('/login');
  } catch (error) {
    this.handleError(error, res);
  }
}


   async loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
   

    if (!user) {
      return res.status(401).send("Utilisateur non trouvé");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Mot de passe incorrect");
    }

      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name
      };

    res.send("Connexion réussie !");
    
  } catch (error) {
    this.handleError(error, res);
  }
}


    }
    module.exports = AuthController;