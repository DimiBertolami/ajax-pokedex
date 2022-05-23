/*
*   element.addEventListener("click", function() {});
*
*
*
*
* */
document.getElementById("searchButton").addEventListener("click", function () {
    document.getElementById("abilities").innerHTML = "";
    document.getElementById("moves").innerHTML = "";
    getName(document.getElementById("Name").value);
});

function displayPokemon(data) {
    const pokemonImg = data.sprites.front_default;
    const pokemonID = data.id;
    const pokemonName = data.name;
    const abilities = data.abilities;
    const moves = data.moves;

    document.getElementById("image").src = pokemonImg;
    // let row = document.getElementById("poketable").insertRow(-1);
    // let cell1 = row.insertCell(0);
    // let cell2 = row.insertCell(1);
    // let cell3 = row.insertCell(2);
    // let cell4 = row.insertCell(3);
    DisplayData("id", pokemonID);
    // cell1.innerHTML = pokemonID;
    // alert(abilities.length);

    // if abilities.length is larger than moves.length then run for loop that many times and check if the other value is empty
    if (abilities.length > moves.length) {
        // loopAbilities;
        for (let i = 0; i < abilities.length; i++) {
            let abilty = abilities[i].ability.name;
            let move = moves[i].move.name;
            console.log(i);
            console.log(abilty);

            DisplayData("abilities", abilty, false);
            let row = document.getElementById("poketable").insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = pokemonID;
            cell2.innerHTML += abilty;
            cell3.innerHTML += move;
        }
    } else {
        // loopmoves;
        for (let i = 0; i < moves.length; i++) {
            let abilty = abilities[i].ability.name;
            let move = moves[i].move.name;
            console.log(i);
            console.log(move);
            DisplayData("moves", move, false);
            let row = document.getElementById("poketable").insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = pokemonID;
            cell2.innerHTML += abilty;
            cell3.innerHTML += move;
        }
    }
}

function addRowData(cell = cell2, ID, abilitiy, move) {
    let row = document.getElementById("poketable").insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = "";
    cell2.innerHTML = data;
    cell3.innerHTML = "";
    cell4.innerHTML = "";

}

function DisplayData(elementID, data, dataFlush = true) {
    // if(dataFlush){document.getElementById(elementID).innerHTML = ""}
    let element = document.getElementById(elementID);
    h1 = document.createElement("h1");
    h1.innerHTML = data;
    element.appendChild(h1);
}

function getName(name = "pikachu") {
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
