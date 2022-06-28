let pokemonRepository = (function () {
  //IIFE
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //let modalContainer = document.querySelector('#modal-container');

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
    let listItems = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    listItem.classList.add('list-group-item');
    listItem.classList.add('text-center');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-name');
    button.classList.add('text-capitalize');
    button.classList.add('btn');
    button.classList.add('btn-outline-danger');
    button.classList.add('col-sm');
    button.classList.add('col-lg-4');


    $(button).attr('data-target','#modalContainer');
    $(button).attr('data-toggle','modal');

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
      item.types = details.types[0].type.name;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    //let modalContainer = document.querySelector('#modal-container');
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalFooter = $('.modal-footer');
    modalBody.text('');
    modalTitle.text('');
    modalFooter.text('');
   
    let pokemonImg = document.createElement('img');
    pokemonImg.classList.add('mw-100');
    pokemonImg.classList.add('img-fluid');
    pokemonImg.src = pokemon.imageUrl;

    let titleElement = document.createElement('h2');
    titleElement.classList.add('text-uppercase');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.classList.add('col');
    contentElement.classList.add('text-center');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let contentElement2 = document.createElement('p');
    contentElement2.classList.add('col');
    contentElement2.classList.add('text-center');
    contentElement2.innerText = 'Weight: ' + pokemon.weight;

    let contentElement3 = document.createElement('p');
    contentElement3.classList.add('col');
    contentElement3.classList.add('text-center');
    contentElement3.innerText = 'Type: ' + pokemon.types;


    modalBody.append(pokemonImg);
    modalTitle.append(titleElement);
    modalFooter.append(contentElement);
    modalFooter.append(contentElement2);
    modalFooter.append(contentElement3);
  }

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

//search function
function searchFunction(event) {
  let search = document.getElementById('search');
  let pokemonNames = document.getElementsByClassName('pokemon-name');
  let { value } = event.target;
  let searchQuery = value.toLowerCase();
  for (let pokemonName of pokemonNames) {
    let name = pokemonName.textContent.toLowerCase();
    //display pokemon name if it contains value inside of search
    if (name.includes(searchQuery)) {
      pokemonName.closest('li').style.display = 'inline-block';
    } else {
      pokemonName.closest('li').style.display = 'none';
    }
  }
}

search.addEventListener('keyup', searchFunction);
