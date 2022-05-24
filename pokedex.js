let action = "go";

document.getElementById("pokeball__button").addEventListener("click", function () {
    let table = document.getElementById("poketable");
    let bodyRef = table.getElementsByTagName('tbody')[0];
    console.log(bodyRef);
    console.log(table);
    bodyRef.innerHTML = '';
    if(action==="go"){
        getName(document.getElementById("Name").value);
        // document.getElementById("searchButton").textContent = "New Search";
        action="reload";
    } else {
        // document.getElementById("searchButton").textContent = "Search Pokedex";
        action="go";
        location.reload();
    }
    // document.getElementById("searchButton").disabled = true;
    // document.getElementById("NewSearch").disabled = false;
});
// document.getElementById("NewSearch").addEventListener("click", function () {
//     document.getElementById("searchButton").disabled = false;
//     document.getElementById("NewSearch").disabled = true;
// })
function displayPokemon(data) {
    const pokemonImg = data.sprites.front_default;
    const pokemonID = data.id;
    const pokemonName = data.name;
    const abilities = data.abilities;
    const moves = data.moves;

    document.getElementById("image").src = pokemonImg;
    let table = document.getElementById("poketable");
    let bodyRefByTag = table.getElementsByTagName('tbody')[0];
    // console.log(bodyRefByTag);
    let body = table.createTBody();
    let row = body.insertRow();
    // console.log(abilities.length + " " + moves.length);
    const arrLongest = (abilities.length > moves.length) ? abilities.length : moves.length;
    for (let i = 0; i < arrLongest; i++) {
        row = body.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        try {
            if(i>0){
                console.log(`${i})    ${pokemonName}`);
                cell1.innerHTML = `${i+1})    ${pokemonName}`;
            } else {
                console.log(`${i})    ${pokemonID}`);
                cell1.innerHTML = `${i+1})    ${pokemonID}`;
            }
        } catch (err) {
            // error handling
        }
        try {
            let ability = abilities[i].ability.name;
            console.log(`${i}) ability: (${ability})`);
            cell2.innerHTML = ability;
        } catch (err) {
            // error handling
        }
        try {
            let move = moves[i].move.name;
            console.log(`${i}) move: (${move})`);
            cell3.innerHTML = move;
        } catch (err) {
            // error handling
        }
    }
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
