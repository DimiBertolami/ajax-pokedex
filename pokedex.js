getName("pikachu")


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

    function displayPokemon(data) {
        const pokemonID = data.id;
        const pokemonName = data.name;
        DisplayData("id", pokemonID);
        DisplayData("pokemonName", pokemonName);
    }
}

function DisplayData(elementID, data){
    element = document.getElementById(elementID);
    h1 = document.createElement("h1");
    h1.innerHTML = data;
    element.appendChild(h1);
}