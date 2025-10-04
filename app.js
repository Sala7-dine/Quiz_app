const express = require('express');
const session = require("express-session");
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const { connectDB } = require('./config/database');

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware pour parser les requêtes POST (body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'quiz-app-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // set to true if using https
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
    }
}));

// Configuration des vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques (optionnel)
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à la DB MySQL
connectDB();

// Chargement des routes
const routes = require('./routes/routes');
app.use('/', routes); // Monte les routes à la racine (ou changez le prefixe si besoin)
// app.use('/add' , routes);
// app.use('/quiz' , routes);
// app.use('/quiz/questions' , routes);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

