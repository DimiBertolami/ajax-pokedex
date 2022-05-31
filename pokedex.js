let action = "go";

document.getElementById("pokeball__button").addEventListener("click", () => {
    if (action === "go") {
        action = "reload";
        document.getElementById("pokeball__button").innerHTML = "Go";
        getData(document.getElementById("Name").value);
    } else {
        action = "go";
        location.reload();
    }
});

async function getData(name) {
    const table = document.getElementById("poketable");
    // const tBody = document.getElementById("tableBody");
    // tBody.innerHTML = "";
    // url = getPokemon(document.getElementById('Name').value);
    let promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let pokemon = await promise.json();
    console.log(pokemon.species.url);
    const pokemonID = pokemon.id;
    const sprites = pokemon.sprites;
    const abilities = pokemon.abilities;
    const moves = pokemon.moves;
    const arrLongest = (abilities.length > moves.length) ? abilities.length : moves.length;
    // console.log(`the largest array is ${arrLongest}`);
    const body = table.createTBody();
    const row = body.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    cell3.innerHTML = "";

    for (let i = 0; i < arrLongest; i++) {
        row = body.insertRow();
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        try {
            cell1.innerHTML = `${pokemonID} ${pokemonName}`;
            cell2.innerHTML = `${abilities[i].ability.name}`;
            cell3.innerHTML = `${moves[i].move.name}`;
            console.log("cells adjusted");
        } catch (err) {
            console.error(err);
        }
    }
    document.getElementById("table").appendChild(body);
    document.getElementById("target").appendChild(table);
    // get the species' url;
    let promise2 = await fetch(`${pokemon.species.url}`);
    let speciesURL = await promise2.json();
    let promise3 = await fetch(`${speciesURL.evolution_chain.url}`);
    let evolution = await promise3.json();
    document.getElementById("target").innerHTML = "";

    // Loop through evolution data;
    if (name === "eevee") {
        for (let i = 0; i < evolution.chain.evolves_to.length; i++) {
            let promise4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[i].species.name}`);
            let evoIMG1 = await promise4.json();
            let sprites = evoIMG1.sprites;
            let img = sprites.front_shiny;
            let imgTemp = document.createElement("img");
            imgTemp.src = img;
            imgTemp.alt = "image " + i;
            imgTemp.width = 150;
            imgTemp.height = 150;
            imgTemp.title = `${evolution.chain.evolves_to[i].species.name}`;
            imgTemp.id = `${evolution.chain.evolves_to[i].species.name}`;
            document.getElementById("target").appendChild(imgTemp);
        } //for..
    } else { //name is not eevee!
        // 0 = baby phase
        let promise5 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.species.name}`);
        let evoIMG2 = await promise5.json();
        let sprites2 = evoIMG2.sprites;
        let img2 = sprites2.front_shiny;
        let imgTemp2 = document.createElement("img");
        imgTemp2.src = img2;
        imgTemp2.alt = "baby phase";
        imgTemp2.width = 250;
        imgTemp2.height = 250;
        imgTemp2.id = "baby_phase";
        imgTemp2.title = `${evolution.chain.species.name}`;
        document.getElementById("target").appendChild(imgTemp2);

        // 1
        let promise6 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[0].species.name}`);
        let evoIMG3 = await promise6.json();
        let sprites3 = evoIMG3.sprites;
        let img3 = sprites3.front_shiny;
        let imgTemp3 = document.createElement("img");
        imgTemp3.src = img3;
        imgTemp3.alt = "level1";
        imgTemp3.width = 250;
        imgTemp3.height = 250;
        imgTemp3.id = "level1";
        imgTemp3.title = `${evolution.chain.evolves_to[0].species.name}`;
        document.getElementById("target").appendChild(imgTemp3);

        // 2
        const promise7 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[0].evolves_to[0].species.name}`);
        let evoIMG4 = await promise7.json();
        let sprites4 = evoIMG4.sprites;
        let img4 = sprites4.front_default;
        let imgTemp4 = document.createElement("img");
        imgTemp4.src = img4;
        imgTemp4.alt = "level2";
        imgTemp4.width = 250;
        imgTemp4.height = 250;
        imgTemp4.id = "level2";
        imgTemp4.title = `${evolution.chain.evolves_to[0].evolves_to[0].species.name}`;
        document.getElementById("target").appendChild(imgTemp4);
    }
}
