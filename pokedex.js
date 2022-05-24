let action = "go";

document.getElementById("pokeball__button").addEventListener("click", function () {
    let table = document.getElementById("poketable");
    let bodyRef = table.getElementsByTagName('tbody')[0];

    bodyRef.innerHTML = '';
        if(action==="go"){
        getName(document.getElementById("Name").value)
        document.getElementById("pokeball__button").innerHTML = "Go";
        action="reload";
    } else {
        action="go";
        location.reload();
    }
});
function displayEvolution(data2){
    try {
        const evolve1 = data2.chain.evolves_to[0].species.name;
        const evolve2 = data2.chain.evolves_to[1].species.name;
        // console log all you want, it's not yet working
        console.log(evolve1);
        console.log(evolve2);
    } catch (err) {
        // error handling
    }
}
function displayPokemon(data) {
    const pokemonImg = data.sprites.front_default;
    const pokemonID = data.id;
    const pokemonName = data.name;
    const abilities = data.abilities;
    const moves = data.moves;

    document.getElementById("image1").src = pokemonImg;
    let table = document.getElementById("poketable");
    let bodyRefByTag = table.getElementsByClassName('table table-hover')[0];

    let body = table.createTBody();
    let row = body.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    const arrLongest = (abilities.length > moves.length) ? abilities.length : moves.length;
    for (let i = 0; i < arrLongest; i++) {
        row = body.insertRow();
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        try {
            if(!i>0){
                cell1.innerHTML = `${pokemonID} ${pokemonName}`;
            } else {
                cell1.innerHTML = ``;
            }
        } catch (err) {
            // error handling
        }
        try {
            let ability = abilities[i].ability.name;
            cell2.innerHTML = ability;
        } catch (err) {
            // error handling
        }
        try {
            let move = moves[i].move.name;
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
            // alert(data.id);
            getEvolution(data.id);
        })
        // .catch((error) => console.error("FETCH ERROR:", error));
        .catch((error) => console.error("FETCH ERROR:", error));
}

function getEvolution(id = 1){
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("NETWORK RESPONSE ERROR");
                }
            })
            .then(data2 => {
                console.log(data2);
                displayEvolution(data2);
            })
            // .catch((error) => console.error("FETCH ERROR:", error));
            .catch((error) => console.error("FETCH ERROR:", error));
}