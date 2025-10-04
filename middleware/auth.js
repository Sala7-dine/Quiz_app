// Middleware pour vérifier l'authentification
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

// Middleware optionnel pour les routes qui acceptent les invités
const optionalAuth = (req, res, next) => {
    // Ajouter les informations utilisateur si disponibles
    req.user = req.session && req.session.user ? req.session.user : null;
    next();
};

module.exports = {
    requireAuth,
    optionalAuth
};