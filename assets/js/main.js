const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonCard = document.getElementById('pokemon-card')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="pokemon-card" class="pokemon ${pokemon.type}" data-toggle="modal" data-target="#pokemonModal${pokemon.number}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                   ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
         </li>

         <div class="modal fade" id="pokemonModal${pokemon.number}" tabindex="-1" role="dialog" aria-labelledby="pokemonModalLabel"
         aria-hidden="true">

         <div class="modal-dialog" role="document">

             <div class="modal-content">

                 <div class="modal-header ${pokemon.type}">
                     <h5 class="modal-title" id="pokemonModalLabel">Detalhes do Pokémon</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>


                 <div class="modal-body ${pokemon.type}">
 
                     <div class="header">
                         <div class="div_id">
                             <span class="number">#${pokemon.number}</span>
                         </div>
                         <div class="pokemon-details">
                             <h2 class="mt-3 mb-0">${pokemon.name}</h2>

                           
                             <ol class="tipos">
                                 ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                             </ol>
 
                         </div>
 
                         <div class="pokemon-img">
                             <img src="${pokemon.photo}"
                                 alt="${pokemon.name}">
                         </div>
                     </div>
 
                     <div class="abas">
 
                         <ul class="nav nav-tabs" id="myTabs" role="tablist">
                             <li class="nav-item">
                                 <a class="nav-link active" id="about-tab" data-toggle="tab" href="#about${pokemon.number}" role="tab"
                                     aria-controls="about" aria-selected="true">About</a>
                             </li>

                             <li class="nav-item">
                                    <a class="nav-link" id="stats-tab" data-toggle="tab" href="#stats${pokemon.number}" role="tab"
                                 aria-controls="evolution" aria-selected="false">Base Stats</a>
                             </li>

                         </ul>




                         <div class="tab-content" id="myTabsContent">

                             <div class="tab-pane fade show active" id="about${pokemon.number}" role="tabpanel"
                                 aria-labelledby="about-tab">

                                 <div class="row">
                                     <div class="d-flex">
                                         <div class="flex-grow-1-title text-left">
                                             <p class="text-left"><strong>Genera:</strong></p>
                                             <p class="text-left"><strong>Height:</strong></p>
                                             <p class="text-left"><strong>Weight:</strong></p>
                                             <p class="text-left"><strong>Abilities:</strong></p>
                                         </div>
                                         <div class="flex-grow-1-value text-left">
                                            <p>${pokemon.generaEn}</p>
                                             <p>${pokemon.height} m</p>
                                             <p class="">${pokemon.weight} kg</p>
                                             ${pokemon.abilities.map((ability) => ` <p class="p_habilidades">${ability}</p>`).join('')}

                                         </div>
                                     </div>
                                 </div>


                                 <div class="row">
                                     <div class="d-flex">
                                         <p class="breeding"><strong class="breeding">Breeding</strong></p>
                                     </div>
                                 </div>


                                 <div class="row">
                                     <div class="d-flex">
                                         <div class="flex-grow-1 text-left">
                                             <p class="text-left"><strong>Egg Groups:</strong></p>
                                         </div>
                                         <div class="flex-grow-1-value text-left">    
                                            ${pokemon.eggGroup.map((eggGroup) => `<p class="p_egg_group" >${eggGroup}</p>`).join('')}
                                         </div>
                                     </div>
                                 </div>
                             </div>


                             <div class="tab-pane fade" id="stats${pokemon.number}" role="tabpanel"
                                 aria-labelledby="about-tab">

                                 <div class="row">

                                    <div class="d-flex">

                                         <div class="flex-grow-1-title text-left">
                                            <p class="text-left"><strong>HP:</strong></p>
                                            <p class="text-left"><strong>Attack:</strong></p>
                                            <p class="text-left"><strong>Defense:</strong></p>
                                            <p class="text-left"><strong>Sp.Atk:</strong></p>
                                            <p class="text-left"><strong>Sp.Def:</strong></p>
                                            <p class="text-left"><strong>Speed:</strong></p>
                                         </div>

                                         <div class="flex-grow-1-value text-left">
                                            ${pokemon.stats.map((stat, index) => `<p id="base_stat" class="base_stat"</p>${pokemon.baseStats[index]}</p>`).join('')}
                                        </div>

                                         
                                        <div class="flex-grow-1-value text-left div_progress">
                                             ${pokemon.stats.map((stat, index) => `<progress class="base_stat" value="${pokemon.baseStats[index]}" max="100"></progress>`).join('')}
                                        </div>


                                    </div>
                            
                                 </div>

                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})