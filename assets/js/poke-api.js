const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height / 10
    pokemon.weight = pokeDetail.weight / 10
    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability
    const stats = pokeDetail.stats.map((typeSlot) => typeSlot.stat.name)
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat
    const baseStats = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat)
    const [baseStat] = baseStats
    pokemon.baseStats = baseStats
    pokemon.baseStat = baseStat
    const eggGroups = pokeDetail.speciesDetail.egg_groups.map((group) => group.name);
    pokemon.eggGroup = eggGroups;
    const generasEn = pokeDetail.speciesDetail.genera.find((genus) => genus.language.name === "en");
    const genusNameEn = generasEn ? generasEn.genus.replace(" Pokémon", "") : "Descrição não encontrada";
    pokemon.generaEn = genusNameEn;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemonUrl) => {
    return fetch(pokemonUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(async (pokeDetail) => {
            const speciesResponse = await fetch(pokeDetail.species.url);
            if (!speciesResponse.ok) {
                throw new Error(`Failed to fetch Pokemon species: ${speciesResponse.status} ${speciesResponse.statusText}`);
            }
            const speciesDetail = await speciesResponse.json();
            pokeDetail.speciesDetail = speciesDetail;
            return pokeDetail;
        })
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => Promise.all(pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon.url))))
        .then((pokemonsDetails) => pokemonsDetails);
};