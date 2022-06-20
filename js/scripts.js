let pokemonRepository = (function () {
  //IIFE
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
      !keys.includes("name")
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
    console.log(pokemon)
    let listItems = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pkmn-button');

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    listItems.appendChild(listItem);
    };

  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
  }


  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let pokemonImg = document.createElement('img');
    pokemonImg.classList.add('pkmn-img');
    pokemonImg.src = pokemon.imageUrl;

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let contentElement2 = document.createElement('p');
    contentElement2.innerText = 'Weight: ' + pokemon.weight;

    closeButtonElement.addEventListener('click', hideModal);
    console.log(pokemon.types)

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonImg);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentElement2);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Remove modal when clicking outside of a div
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
