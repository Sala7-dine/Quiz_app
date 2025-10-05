-- Script de migration pour normaliser les pseudos
-- À exécuter une seule fois pour corriger les données existantes

USE quiz_app;

-- 1. Normaliser tous les noms dans la table users
UPDATE users 
SET name = LOWER(TRIM(name)) 
WHERE name != LOWER(TRIM(name));

-- 2. Normaliser tous les pseudos dans la table games
UPDATE games 
SET pseudo = LOWER(TRIM(pseudo)) 
WHERE pseudo != LOWER(TRIM(pseudo));

-- 3. Vérifier les correspondances
SELECT 
    u.name as 'Utilisateur',
    COUNT(g.id) as 'Nombre de parties'
FROM users u
LEFT JOIN games g ON u.name = g.pseudo
GROUP BY u.name
ORDER BY COUNT(g.id) DESC;

-- 4. Afficher les parties orphelines (sans utilisateur correspondant)
SELECT 
    g.pseudo as 'Pseudo sans utilisateur',
    COUNT(*) as 'Nombre de parties'
FROM games g
LEFT JOIN users u ON g.pseudo = u.name
WHERE u.id IS NULL
GROUP BY g.pseudo;
