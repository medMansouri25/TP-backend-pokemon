// serveur.js
const express = require('express');
const app = express();

// Importer le contrôleur
const pokemonController = require('./api/V1/pokemons/controlleur');

// Route pour exposer l'ensemble des Pokémon en utilisant le contrôleur
app.get('/api/v1/pokemons', pokemonController.getAllPokemons);
app.get('/api/v1/pokemons/search', pokemonController.searchPokemons);
app.get('/api/v1/pokemons/:id', pokemonController.getPokemonById);

module.exports = app;

