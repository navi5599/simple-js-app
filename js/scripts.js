let pokCharizard = {
  name: 'Charizard',
  type: ['Fire', 'Flying'],
  height: 6,
  abilities: ['Blaze', 'Flamethrower']
};

let pokButterfree = {
  name: 'Butterfree',
  type: ['Bug', 'Flying'],
  height: 3,
  abilities: ['Confuse', 'Sleep Powder']
};

let pokPikachu = {
  name: 'Pikachu',
  type: ['Electric'],
  height: 1,
  abilities: ['Quickattack', 'Thunderbolt']
};

let pokGengar = {
  name: 'Gengar',
  type: ['Ghost', 'Poison'],
  height: 4.5,
  abilities: ['Cursed Body', 'Nightmare']
};

let pokMewtwo = {
  name: 'Mewtwo',
  type: ['Psychic'],
  height: 5,
  abilities: ['Pressure', 'Psychic beam']
};

let pokScyther = {
  name: 'Scyther',
  type: ['Bug', 'Flying'],
  height: 4,
  abilities: ['Swarm', 'Slash']
};

let pokemonRepository = (function () { //IIFE
    let pokemonList = [
    pokCharizard,
    pokButterfree,
    pokPikachu,
    pokGengar,
    pokMewtwo
  ];

  function getAll () {
    return pokemonList;
  }

  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  }

})()


function loopFunction(pokemons) {
  document.write(pokemons.name);
  document.write(' (' + 'height: ' + pokemons.height + ') ');
  if (pokemons.height > 5) {
    document.write(' - WOW,that is a big pokemon!');
  }else if (pokemons.height <= 5 && pokemons.height >= 3) {
    document.write(' - An average pokemon');
  }else {
    document.write(' - Small pokemon');
  }
  document.write('<br>');
}

pokemonRepository.add(pokScyther);
pokemonRepository.getAll().forEach(loopFunction);
