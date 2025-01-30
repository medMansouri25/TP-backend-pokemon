// controllers/pokemonController.js
const pokedex = require('../../../data/pokedex.json');  // Importer le fichier pokedex.json

// Fonction qui retourne la liste des Pokémon
const getAllPokemons = (req, res) => {
    res.json(pokedex);
};
// Fonction pour récupérer un Pokémon par ID
const getPokemonById = (req, res) => {
    const id = parseInt(req.params.id); // Récupérer l'ID depuis l'URL et le convertir en nombre
    const pokemon = pokedex.find(p => p.id === id); // Chercher le Pokémon dans le JSON

    if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    res.json(pokemon);
};
// Fonction de recherche avec plusieurs critères
const searchPokemons = (req, res) => {
    let { name, type, hp } = req.query;  // Récupération des paramètres de la requête

    let filteredPokemons = pokedex;

    // Filtrer par nom (partiel, insensible à la casse)
    if (name) {
        const lowerCaseName = name.toLowerCase();
        console.log(lowerCaseName)
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.name.french.toLowerCase().includes(lowerCaseName)
        );
    }

    // Filtrer par type (un ou plusieurs types)
    if (type) {
        const types = type.split(',').map(t => t.trim().toLowerCase()); // Gérer plusieurs types séparés par une virgule
        filteredPokemons = filteredPokemons.filter(pokemon =>
            types.every(t => pokemon.type.map(pt => pt.toLowerCase()).includes(t))
        );
    }

    // Filtrer par HP (points de vie)
    if (hp) {
        const hpValue = parseInt(hp);
        if (!isNaN(hpValue)) {
            filteredPokemons = filteredPokemons.filter(pokemon => pokemon.base.HP >= hpValue);
        }
    }

    // Vérifier s'il y a des résultats
    if (filteredPokemons.length === 0) {
        return res.status(404).json({ message: "Aucun Pokémon trouvé avec ces critères" });
    }

    res.json(filteredPokemons);
};


// Exporter la fonction pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = {
    getAllPokemons,
    getPokemonById,
    searchPokemons

};