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

function requireAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // If authenticated but not admin, show 403
    if (req.session && req.session.user) {
        return res.status(403).send('Accès refusé: Administrateur requis');
    }
    // Not authenticated, redirect to login
    return res.redirect('/auth/login');
}

module.exports = {
    requireAuth,
    optionalAuth,
    requireAdmin
};