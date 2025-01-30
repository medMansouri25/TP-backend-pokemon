const test = require('tape');
const supertest = require('supertest');
const app = require('../serveur'); // Assure-toi que tu as bien exporté ton app.js dans serveur.js

const request = supertest(app);

// Test de l'endpoint /api/v1/pokemons
test('GET /api/v1/pokemons - devrait renvoyer une liste de pokémons', async (t) => {
    const response = await request.get('/api/v1/pokemons');

    // Vérifier que la réponse est un code 200 (OK)
    t.equal(response.status, 200, 'Le code de statut de la réponse devrait être 200');

    // Vérifier que le corps de la réponse est un tableau
    t.ok(Array.isArray(response.body), 'La réponse devrait être un tableau');

    // Vérifier que chaque objet Pokémon dans le tableau a un champ "name"
    const pokemon = response.body[0];
    t.ok(pokemon.name, 'Chaque Pokémon devrait avoir un champ "name"');

    t.end();
});

// Test de l'endpoint /api/v1/pokemons/search avec un nom spécifique
test('GET /api/v1/pokemons/search?name=pikachu - devrait renvoyer Pikachu', async (t) => {
    const response = await request.get('/api/v1/pokemons/search?name=pikachu');

    t.equal(response.status, 200, 'Le code de statut de la réponse devrait être 200');

    // Vérifier que la réponse contient "pikachu"
    const pokemon = response.body[0];
    t.equal(pokemon.name.french.toLowerCase(), 'pikachu', 'Le nom du Pokémon doit être Pikachu');

    t.end();
});

// Test de l'endpoint /api/v1/pokemons/search avec un critère de type
test('GET /api/v1/pokemons/search?type=electrique - devrait renvoyer des pokémons de type "électrique"', async (t) => {
    const response = await request.get('/api/v1/pokemons/search?type=electrique');

    t.equal(response.status, 200, 'Le code de statut de la réponse devrait être 200');

    // Vérifier que tous les Pokémon dans la réponse sont de type "électrique"
    const pokemons = response.body;
    pokemons.forEach(pokemon => {
        t.ok(pokemon.type.includes('électrique'), `Le Pokémon ${pokemon.name.french} devrait être de type "électrique"`);
    });

    t.end();
});
