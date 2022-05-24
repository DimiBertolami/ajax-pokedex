document.getElementById("searchButton").addEventListener("click", function () {
    let table = document.getElementById("poketable");
    let bodyRef = table.getElementsByTagName('tbody')[0];
    console.log(bodyRef);
    console.log(table);
    bodyRef.innerHTML = '';
    // replaceTable();
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
    let table = document.getElementById("poketable");
    let bodyRefByTag = table.getElementsByClassName('table table-hover')[0];
    console.log(bodyRefByTag);
    let body = table.createTBody();
    let row = body.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    console.log(abilities.length + " " + moves.length);
    const arrLongest = (abilities.length > moves.length) ? abilities.length : moves.length;
    cell1.innerHTML = `${pokemonID} (${pokemonName})`;
    for (let i = 0; i < arrLongest; i++) {
        row = body.insertRow();
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        try {
            let ability = abilities[i].ability.name;
            console.log(i);
            console.log(`ability: (${ability})`);
            cell2.innerHTML = ability;
        } catch (err) {
            // error handling
        }
        try {
            let move = moves[i].move.name;
            console.log(i);
            console.log(`move: (${move})`);
            cell3.innerHTML = move;
        } catch (err) {
            // error handling
        }
    }
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
        // .catch((error) => console.error("FETCH ERROR:", error));
        .catch((error) => console.error("FETCH ERROR:", error));
}
