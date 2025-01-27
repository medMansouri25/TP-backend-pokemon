// controllers/pokemonController.js
const pokedex = require('../pokedex.json');  // Importer le fichier pokedex.json

// Fonction qui retourne la liste des Pokémon
const getAllPokemons = (req, res) => {
    res.json(pokedex);
};

// Exporter la fonction pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = {
    getAllPokemons
};