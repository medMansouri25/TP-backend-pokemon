// app.js
const app = require('./serveur');  // Importer l'application
const PORT = process.env.PORT || 3002;  // Définir le port

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
