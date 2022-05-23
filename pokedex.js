// getName("pikachu")
document.getElementById("searchButton").addEventListener("click", RunSearch);

function RunSearch(){
    getName(document.getElementById("Name").value);
}

function displayPokemon(data) {
    const pokemonImg = data.sprites.front_default;
    const pokemonID = data.id;
    const pokemonName = data.name;
    const abilities = data.abilities;
    const moves = data.moves;

    document.getElementById("image").src = pokemonImg;
    DisplayData("id", pokemonID);
    DisplayData("pokemonName", pokemonName);
    // alert(abilities.length);

    // loopAbilities;
    for (let i = 0; i < abilities.length; i++) {
        let abilty = abilities[i].ability.name;
        console.log(i);
        console.log(abilty);
        DisplayData("abilities", abilty, false);
    }
    // loopmoves;
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i].move.name;
        console.log(i);
        console.log(move);
        DisplayData("moves", move, false);
    }
}

// function loopArray(array, property){
//     for (let i = 0; i < array.length; i++) {
//         let tempData = property;
//         console.log(i);
//         console.log(tempData);
//         // DisplayData("moves", move, false);
//     }
// }

function DisplayData(elementID, data, dataFlush = true){
    if(dataFlush){document.getElementById(elementID).innerHTML = ""}
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
