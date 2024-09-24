const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
// info pokemon
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imgContainer = document.getElementsByClassName("img-container");
const types = document.getElementById("types");
//stats pokemon
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
//fetch
const listPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const dataPokemon =
  "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{types}";

// display pokemon name, id, url
const displayPokemon = (data) => {
  const img = document.createElement("img");
  img.setAttribute("id", "sprite");
  img.alt = data.name;
  imgContainer[0].appendChild(img);

  pokemonName.textContent = data.name;
  pokemonId.textContent = "#" + data.id;

  fetch(dataPokemon.replace("{types}", data.id))
    .then((response) => response.json())
    .then((data) => {
      weight.textContent = "Weight: " + data.weight;
      height.textContent = "Height: " + data.height;
      // console.log(data);
      img.src = data.sprites.front_default;
      for (let i = 0; i < data.types.length; i++) {
        const typeName = data.types[i].type.name;
        const type = document.createElement("span");
        type.classList.add("types");
        types.appendChild(type);
        type.textContent = typeName;
        type.style.backgroundColor = `var(--${typeName})`;
      }
      hp.textContent = data.stats[0].base_stat;
      attack.textContent = data.stats[1].base_stat;
      defense.textContent = data.stats[2].base_stat;
      specialAttack.textContent = data.stats[3].base_stat;
      specialDefense.textContent = data.stats[4].base_stat;
      speed.textContent = data.stats[5].base_stat;
    });
};

const checkPokemon = (data) => {
  const { results } = data;
  let value = searchInput.value;
  value = value.toLowerCase();
  if (value >= 1026 || value < 1) {
    errorDisplay();
    return;
  }

  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    const { name, id } = pokemon;
    if (value.toLowerCase() === name || value == id) {
      // console.log(name);
      displayPokemon(pokemon);
      return;
    }
  }
  errorDisplay()
};

const errorDisplay = (err) => {
  alert("Pokémon not found");
  console.error(`Pokémon not found: ${err}`);
  resetDisplay();
};

// reset display
const resetDisplay = () => {
  types.textContent = "";
  imgContainer[0].innerHTML = "";
  // stats
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

// fetch pokemon data
const fetchPokemon = async () => {
  try {
    const res = await fetch(listPokemon);
    const data = await res.json();
    /// addEventListener search button
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      resetDisplay();
      checkPokemon(data);
      searchInput.value = "";
    });
  } catch (err) {
    errorDisplay(err)
  }
};
fetchPokemon();
