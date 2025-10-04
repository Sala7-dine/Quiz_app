const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const { connectDB } = require('./config/database');

dotenv.config();

const app = express();
const port = process.env.PORT;

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'quiz-app-default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true en production avec HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
    }
}));

// Middleware pour parser les requêtes POST (body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques (optionnel)
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à la DB MySQL
connectDB();

// Chargement des routes
const routes = require('./routes/routes');
app.use('/', routes);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

