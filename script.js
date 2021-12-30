
const baseURL = 'https://pokeapi.co/api/v2';

const totalPokemon = 9;

let pokemonContainer = document.getElementById('pokemon-container');

let formButton = document.getElementById('load-cards-button');

function fetchPokemonList () {
    fetch(`${baseURL}/pokemon?limit=${totalPokemon}`)
        .then(response => response.json())
        .then(jsonData => {
            let pokemonList = jsonData.results;

            for (let pokemon of pokemonList) {
                fetchPokemonData(pokemon);
            }

        })
}

function fetchPokemonData (pokemon) {
    let url = pokemon.url;

    fetch(url)
        .then(response => response.json())
        .then(pokemonData => {
            console.log(pokemonData)

            displayPokemon(pokemonData);
        })
}

function displayPokemon (pokemonData) {
    let pokemonCard = document.createElement('div');
    let pokemonId = document.createElement('h3');
    let pokemonName = document.createElement('h2');
    let pokemonImage = document.createElement('img');
    let pokemonPhysical = document.createElement('p');
    let pokemonTypes = document.createElement('ul');
    
    pokemonId.innerText = "#" + pokemonData.id;
    pokemonName.innerText = (pokemonData.name).toUpperCase();
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonPhysical.innerText = "Height: " + pokemonData.height + "ft  |  Weight: " + pokemonData.weight + "lbs";
    pokemonTypes.innerText = "Types";
    displayTypes(pokemonData.types, pokemonTypes);


    pokemonCard.classList.add('pokemon-card');
    pokemonId.classList.add('pokemon-id');
    pokemonName.classList.add('pokemon-name');
    pokemonImage.classList.add('pokemon-image');
    pokemonPhysical.classList.add('pokemon-physical');
    pokemonTypes.classList.add('pokemon-types');

    pokemonCard.append(pokemonId, pokemonName, pokemonImage, pokemonPhysical, pokemonTypes);

    pokemonContainer.appendChild(pokemonCard);

}

function displayTypes (typesArray, typesList) {
    for (let typeName of typesArray) {
        typesListItem = document.createElement('li');
        typesListItem.innerText = typeName.type.name;
        typesList.appendChild(typesListItem);

    }
    
}

formButton.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchPokemonList();
});
