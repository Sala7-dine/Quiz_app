const BaseController = require('../core/BaseController');
const UserModel = require('../models/UserModel');

class AuthController extends BaseController {
    
    // Afficher la page de connexion
    showLoginPage(req, res) {
        res.render('auth/login');
    }

    // Afficher la page d'inscription
    showRegisterPage(req, res) {
        res.render('auth/register');
    }

    // Inscription utilisateur
    async register(req, res) {
        try {
            const userInfo = req.body;

            // Vérifier si l'email existe déjà
            const existingUser = await UserModel.findByEmail(userInfo.email);
            if (existingUser) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Cet email est déjà utilisé !" 
                });
            }

            // Créer le nouvel utilisateur
            await UserModel.create(userInfo);

            // Créer la session automatiquement après l'inscription
            const newUser = await UserModel.findByEmail(userInfo.email);
            req.session.user = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name.toLowerCase().trim()
            };

            res.json({ 
                success: true, 
                message: "Inscription réussie !" 
            });
            
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Connexion utilisateur
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findByEmailAndPassword(email, password);
            
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Email ou mot de passe incorrect" 
                });
            }

            // Créer la session avec le nom normalisé
            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name.toLowerCase().trim()
            };

            res.json({ 
                success: true, 
                message: "Connexion réussie !",
                user: {
                    name: user.name,
                    email: user.email
                }
            });
            
        } catch (error) {
            this.handleError(error, res);
        }
    }

    // Déconnexion utilisateur
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: "Erreur lors de la déconnexion" 
                });
            }
            res.json({ 
                success: true, 
                message: "Déconnexion réussie" 
            });
        });
    }

    // Vérifier l'authentification
    checkAuth(req, res) {
        if (req.session.user) {
            res.json({ 
                success: true,
                authenticated: true, 
                user: req.session.user 
            });
        } else {
            res.json({ 
                success: false,
                authenticated: false 
            });
        }
    }
}

module.exports = AuthController;