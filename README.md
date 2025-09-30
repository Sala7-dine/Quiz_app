# 🧩 Quiz Full-Stack Multi-Utilisateurs

> Un projet complet combinant **Node.js + Express + MySQL + EJS** pour gérer un quiz interactif avec utilisateurs, scores et rôles.

---

## 📖 Contexte du projet

Après avoir développé une première version **front-only (HTML/JS)** avec données locales, l’objectif est désormais de créer une **application full-stack** :

* Multi-utilisateurs
* Gestion de comptes & rôles
* Base de données pour les questions et scores
* Dashboards pour utilisateurs et administrateurs

Ce projet introduit les bases du **développement full-stack moderne**, ouvrant la voie vers la **stack MERN** 🚀

---

## ✍️ Fonctionnalités

| 🌟 Fonctionnalité           | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| 👥 Gestion des utilisateurs | Inscription, connexion/déconnexion, rôles (User / Admin)         |
| 🎯 Quiz dynamique           | Questions/thématiques stockées en base MySQL                     |
| 📝 Historique perso         | Scores et parties jouées pour chaque utilisateur                 |
| 📊 Dashboard utilisateur    | Moyenne des scores, nombre de parties, classement global (top 5) |
| 🛠️ Dashboard admin         | CRUD sur les questions + suivi des scores des utilisateurs       |
| 🏅 Bonus                    | Système de badges ("Débutant", "Intermédiaire", "Expert")        |

---

## 🚨 Contraintes & Exigences Techniques

### ⚙️ Back-end

* **Node.js + Express**
* Routes : `users`, `questions`, `scores`
* Middleware pour vérifier les rôles (auth / admin)
* Vues générées avec **EJS**

### 🗄️ Base de données MySQL

| Table         | Colonnes                                                      |
| ------------- | ------------------------------------------------------------- |
| **users**     | `id`, `username`, `password_hash`, `role`                     |
| **questions** | `id`, `thematique`, `question`, `options`, `reponse_correcte` |
| **scores**    | `id`, `user_id`, `thematique`, `score`, `date`                |

### 🎨 Front intégré au back

* Formulaires (login, inscription, quiz)
* Pages dynamiques générées avec **EJS**

### 🔐 Sécurité

* Sessions & cookies pour persistance de la connexion
* Variables d’environnement pour credentials & secrets

### 📂 Structure du code

```
📦 project-root
 ┣ 📂 routes/         # Définitions des routes (users, quiz, scores)
 ┣ 📂 controllers/    # Logique métier
 ┣ 📂 services/       # Interactions DB / traitements
 ┣ 📂 views/          # Templates EJS
 ┣ 📂 public/         # CSS, JS client
 ┣ 📄 app.js       # Point d'entrée
 ┣ 📄 .env            # Variables d’environnement
 ┗ 📄 README.md
```

---

## 🚀 Installation & Lancement

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/Sala7-dine/quiz-fullstack.git
cd quiz_app
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer la base de données

Créer une base MySQL puis exécuter les scripts SQL fournis (`/database/init.sql`).

Configurer le fichier `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=quiz_app
SESSION_SECRET=your_secret
```

### 4️⃣ Lancer le serveur

```bash
npm start
```

### 5️⃣ Accéder à l’application

👉 [http://localhost:3000](http://localhost:3000)

---

## 📊 Exemple de flux utilisateur

| Étape                 | Utilisateur            | Admin            |
| --------------------- | ---------------------- | ---------------- |
| 🔑 Authentification   | ✅ Login / Signup       | ✅ Login          |
| 🎮 Jouer un quiz      | ✅ Oui                  | 🚫               |
| 📜 Historique perso   | ✅ Oui                  | 🚫               |
| 🛠️ Gestion questions | 🚫                     | ✅ CRUD           |
| 📊 Dashboard          | ✅ Moyenne & classement | ✅ Stats globales |

---

## 💡 Améliorations possibles

* 🎨 UI/UX plus moderne avec **TailwindCSS**
* 🌐 Version API REST pour usage externe
* 🔔 Notifications temps réel avec **Socket.io**
* 📱 Responsive design mobile

---
