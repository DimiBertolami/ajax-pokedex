
document.getElementById("searchButton").addEventListener("click", function () {
    let table = document.getElementById("poketable");
    let bodyRef = table.getElementsByTagName('tbody')[0];
    console.log(bodyRef);
    bodyRef.innerHTML = '';
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
    // DisplayData("id", pokemonID);
    addRowData("cell1", pokemonID);

    console.log(abilities.length + " " + moves.length);
    // loopAbilities;
    for (let i = 0; i < abilities.length; i++) {
        let ability = abilities[i].ability.name;
        console.log(i);
        console.log(ability);

        // DisplayData("abilities", ability, false);
        addRowData("cell2", ability);

    }
    // loopmoves;
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i].move.name;
        console.log(i);
        console.log(move);
        // DisplayData("moves", move, false);
        addRowData("cell3", move);
    }
}

function addRowData(cell, cellData) {
    let table = document.getElementById("poketable");
    let bodyRef = table.getElementsByTagName('tbody')[0];
    // bodyRef.innerHTML = '';
    let header = table.createTHead();
    row = header.insertRow(0);
    // cell1 = row.insertCell(0);
    // cell2 = row.insertCell(1);
    // cell3 = row.insertCell(2);
    // cell4 = row.insertCell(3);
    // cell1.innerHTML = "ID";
    // cell2.innerHTML = "abilities";
    // cell3.innerHTML = "moves";
    // cell4.innerHTML = "evolution";
    footer = table.createTFoot();
    // row = footer.insertRow(0);
    // cell1 = row.insertCell(0);
    // cell2 = row.insertCell(1);
    // cell3 = row.insertCell(2);
    // cell4 = row.insertCell(3);
    // cell1.innerHTML = "ID";
    // cell2.innerHTML = "abilities";
    // cell3.innerHTML = "moves";
    // cell4.innerHTML = "evolution";
    body = table.createTBody();
    row = body.insertRow(-1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);
    cell1.innerHTML = "ID";
    cell2.innerHTML = "abilities";
    cell3.innerHTML = "moves";
    cell4.innerHTML = "evolution";
    if(cell==="cell1"){

    }
    if(cell==="cell2"){

    }
    if(cell==="cell3"){

    }
    if(cell==="cell4"){

    }
    switch (cell){
        case "cell1":
            cell1.innerHTML = cellData;
            cell2.innerHTML = "";
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            break;
        case "cell2":
            cell1.innerHTML = "";
            cell2.innerHTML = cellData;
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            break;
        case "cell3":
            cell1.innerHTML = "";
            cell2.innerHTML = "";
            cell3.innerHTML = cellData;
            cell4.innerHTML = "";
            break;
        case "cell4":
            cell1.innerHTML = "";
            cell2.innerHTML = "";
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            break;
    }
    table.appendChild(header);
    table.appendChild(body);
    table.appendChild(footer);
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
