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

let pokemonList = [
  pokCharizard,
  pokButterfree,
  pokPikachu,
  pokGengar,
  pokMewtwo
];

for (i = 0; i <= 4; i++) {
  document.write(pokemonList[i].name);
  document.write(' (' + 'height: ' + pokemonList[i].height + ') ');
  if (pokemonList[i].height > 5) {
    document.write(' - WOW,that is a big pokemon!');
  }else if (pokemonList[i].height <= 5 && pokemonList[i].height >= 3) {
    document.write(' - An average pokemon');
  }else {
    document.write(' - Small pokemon');
  }
  document.write('<br>');
}
