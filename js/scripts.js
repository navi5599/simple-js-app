let pokCharizard = {
  name: "Charizard",
  type: ["Fire", "Flying"],
  height: 6,
  abilities: ["Blaze", "Flamethrower"],
};

let pokButterfree = {
  name: "Butterfree",
  type: ["Bug", "Flying"],
  height: 3,
  abilities: ["Confuse", "Sleep Powder"],
};

let pokPikachu = {
  name: "Pikachu",
  type: ["Electric"],
  height: 1,
  abilities: ["Quickattack", "Thunderbolt"],
};

let pokGengar = {
  name: "Gengar",
  type: ["Ghost", "Poison"],
  height: 4.5,
  abilities: ["Cursed Body", "Nightmare"],
};

let pokMewtwo = {
  name: "Mewtwo",
  type: ["Psychic"],
  height: 5,
  abilities: ["Pressure", "Psychic beam"],
};

let pokScyther = {
  name: "Scyther",
  type: ["Bug", "Flying"],
  height: 4,
  abilities: ["Swarm", "Slash"],
};

let pokemonRepository = (function () {
  //IIFE
  let pokemonList = [
    pokCharizard,
    pokButterfree,
    pokPikachu,
    pokGengar,
    pokMewtwo,
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    // typeof {} === "object" , try that in the console
    if (typeof pokemon !== "object") {
      return "A pokemon object is required";
    }
    /** this gets the fields in the pokemon oject and places them in an array
    includes is a method on arrays that searches for the existence of certain items in an array
    The exclamation marks means not, so in our i, we are saying, if the name is not in the keys array, or.. **/
    const keys = Object.keys(pokemon);
    if (
      !keys.includes("name") ||
      !keys.includes("type") ||
      !keys.includes("height") ||
      !keys.includes("abilities")
    ) {
      return "The pokemon object is missing some required fields";
    }
    pokemonList.push(pokemon);
  }

  function findPokemonByName(name) {
    let result = getAll().filter((pokemon) => pokemon.name === name);
    // filter returns an array, so we need to get the pokemon by index
    return result[0];
  }

  function addListItem(pokemon) {
    let listItems = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pkmn-button');

    //This is another way to add even listener to button,outside of function
    //addEventListenerToBtn(button, pokemon);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    listItems.appendChild(listItem);
    };

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  /**function addEventListenerToBtn(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });**/

  return {
    getAll: getAll,
    add: add,
    findPokemonByName,
    addListItem: addListItem
  };
})();

function loopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.add(pokScyther);
pokemonRepository.getAll().forEach(loopFunction);
