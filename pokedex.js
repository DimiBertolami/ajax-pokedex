// getName("pikachu")
document.getElementById("searchButton").addEventListener("click", RunSearch);

function RunSearch(){
    getName(document.getElementById("Name").value);
}


function displayPokemon(data) {
    const pokemonImg = data.sprites.front_default;
    const pokemonID = data.id;
    const pokemonName = data.name;
    const abilities = `${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}`;
    document.getElementById("image").src = pokemonImg;
    DisplayData("id", pokemonID);
    DisplayData("pokemonName", pokemonName);
    DisplayData("abilities", abilities);
}

function DisplayData(elementID, data){
    element = document.getElementById(elementID);
    h1 = document.createElement("h1");
    h1.innerHTML = data;
    element.appendChild(h1);
}

function getName(name = "pikachu"){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            console.log(data);
            displayPokemon(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}
