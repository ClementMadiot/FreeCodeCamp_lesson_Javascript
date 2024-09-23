const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
// info pokemon
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imgContainer = document.getElementsByClassName("img-container");
const types = document.getElementById("name-or-id");
//stats pokemon
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
//fetch
const listPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const dataPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}";

// display pokemon name, id, url
const displayPokemon = (data) => {
  const img = document.createElement("img");
  img.alt = data.name;
  imgContainer[0].appendChild(img);


  pokemonName.textContent = data.name;
  pokemonId.textContent = "#" + data.id;

  fetch(dataPokemon.replace("{name-or-id}", data.id))
    .then((response) => response.json())
    .then((data) => {
      weight.textContent = "Weight: " + data.weight;
      height.textContent = "Height: " + data.height;
      img.src = data.sprites.front_default;
      for (let i = 0; i < data.types.length; i++) {
        const typeName = data.types[i].type.name;
        const type = document.createElement("span");
        type.classList.add("types");
        types.appendChild(type);
        type.textContent = typeName;
        type.style.backgroundColor = `var(--${typeName})`; 
      }      
    });
};

const checkPokemon = (data) => {
  const { results, count } = data;
  if (searchInput.value >= count || searchInput.value < 1) {
    alert("Pokemon not found");
  }

  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    const { name, id } = pokemon;
    if (searchInput.value === name || searchInput.value == id) {
      searchInput.value = "";
      displayPokemon(results[i]);
    }
  }
};

// reset display
const resetDisplay = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  imgContainer[0].textContent = "";
  types.textContent = "";
};

// fetch pokemon data
const fetchPokemon = async () => {
  try {
    const res = await fetch(listPokemon);
    const data = await res.json();
    // console.log(data.results);
    // displayPokemon(data);
    // addEventListener search button
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      checkPokemon(data);
    });
  } catch (err) {
    console.log(err);
  }
};
fetchPokemon();
