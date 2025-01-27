// app.js
const express = require('express');
const app = express();

// Importer le contrôleur
const pokemonController = require('./controlleur');

// Route pour exposer l'ensemble des Pokémon en utilisant le contrôleur
app.get('/api/v1/pokemons', pokemonController.getAllPokemons);

module.exports = app;

