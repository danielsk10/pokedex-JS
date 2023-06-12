const pokemonName = document.querySelector("span.pokemon__name");
const pokemonNumber = document.querySelector("span.pokemon__number");
const pokemonImage = document.querySelector("img.pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const card = document.querySelector(".card")

const buttonPrev = document.querySelector(".btn__prev")
const buttonNext = document.querySelector(".btn__next")

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }

    
    //para achar o tipo é resJson.types[0].type.name
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = "loading...";
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonImage.style.display = "block"
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        switch(data.types[0].type.name){
            case "electric": 
                card.style.backgroundColor = "#ebf876"
            break;
    
            case "fire":
                card.style.backgroundColor = "rgb(253, 64, 64)"
            break;
    
            case "rock":
                card.style.backgroundColor = "rgb(189, 111, 10)"
            break
    
            case "grass":
                card.style.backgroundColor = "rgb(91, 248, 60)"
            break

            case "water":
                card.style.backgroundColor = "rgb(183, 213, 229)"
            break

            case "bug":
                card.style.backgroundColor = "rgb(83, 247, 178)"
            break

            case "normal":
                card.style.backgroundColor = "rgb(226, 226, 226)"
            break
            
            default:
                card.style.backgroundColor = "white"
        }
    
        input.value = ""
        searchPokemon = data.id
    }else{
        card.style.backgroundColor = "white"
        pokemonImage.style.display = "none"
        pokemonName.innerHTML = "Not found :c"
        pokemonNumber.innerHTML = ""
    }

   

}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }

});

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)

