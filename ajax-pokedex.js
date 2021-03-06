async function getData(name){
    // url = getPokemon(document.getElementById('Name').value);
    let promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let pokemon = await promise.json();
    str = '';
    // console.log(pokemon);
    // console.log(pokemon.species.url);
    pokemonID = pokemon.id;
    pokemonName = pokemon.name;
    DisplayData("id", `${pokemonID})  ${pokemon.name}`);
    document.getElementById("abilities").innerHTML = "";
    document.getElementById("moves").innerHTML = "";
    str = `${pokemonName} (ID:${pokemonID}): `;
    // console.log(str);
    try {
        // if (i=0,i<4,i++){
        for (let i = 0; i < pokemon.abilities.length; i++) {
            let ability = pokemon.abilities[i].ability.name;
            // console.log(i);
            // alert(`ability: ${ability}`);
            // cell2.innerHTML = ability;
            DisplayData("abilities", `ability: ${ability}`, false);
            // str = str & `${ability}, `;
            // console.log(str);
        }
        // }

    } catch {
        // console.error(err);
    }
    // console.log(str);

    // try {
        // if (i=0,i<4,i++){
        for (let j = 0; j < pokemon.moves.length; j++) {
            let move = pokemon.moves[j].move.name;
            // console.log(i);
            // alert(`move: (${move})`);
            // cell3.innerHTML = move;
            DisplayData("moves", `move: ${move}`, true);
            str = str &`${move}, `;

        }
        // }

    // } catch (err) {
        // console.error(err);
    // }
    // console.log(str);

    // ID = getSpeciesID(url);
    let promise2 = await fetch(`${pokemon.species.url}`);
    let speciesURL = await promise2.json();
    // console.log(str);
    console.log(speciesURL);
    // return ;
    console.log(speciesURL.evolution_chain.url);
    // chain = getEvolutionChain(ID);
    let promise3 = await fetch(`${speciesURL.evolution_chain.url}`);
    let evolution = await promise3.json();
    console.log(evolution);
    // return evolution;
    // document.getElementById("target").innerHTML = "";

    // LoopThroughEvolution(data);  chain.evolves_to[3].species chain.evolves_to[0].species.name

    if (name === "eevee") {
        for (let i = 0; i < evolution.chain.evolves_to.length; i++) {
            let promise4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[i].species.name}`);
            let evoIMG1 = await promise4.json();
            let sprites = evoIMG1.sprites;
            let img = sprites.front_default;
            let imgTemp = document.createElement("img");
            imgTemp.src = img;
            imgTemp.alt = "image " + i;
            imgTemp.width = 150;
            imgTemp.height = 150;
            imgTemp.title = `${evolution.chain.evolves_to[i].species.name}`;
            imgTemp.id = `${evolution.chain.evolves_to[i].species.name}`;
            document.getElementById("target").appendChild(imgTemp);
        }
    } else {
        // 0 = baby
        let promise5 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.species.name}`);
        let evoIMG2 = await promise5.json();
        let sprites2 = evoIMG2.sprites;
        let img2 = sprites2.front_default;
        let imgTemp2 = document.createElement("img");
        imgTemp2.src = img2;
        imgTemp2.alt = "baby";
        imgTemp2.width = 250;
        imgTemp2.height = 250;
        imgTemp2.id = "baby";
        imgTemp2.title = `${evolution.chain.species.name}`;
        document.getElementById("target").appendChild(imgTemp2);

        // 1
        let promise6 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.chain.evolves_to[0].species.name}`);
        let evoIMG3 = await promise6.json();
        let sprites3 = evoIMG3.sprites;
        let img3 = sprites3.front_default;
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

function DisplayData(elementID, data, dataFlush = true) {
    // if(dataFlush){document.getElementById(elementID).innerHTML = ""}
    let element = document.getElementById(elementID);
    h4 = document.createElement("h4");
    h4.innerHTML = data;
    element.appendChild(h4);
}

document.getElementById('pokeball__button').addEventListener('click', () => {
    getData(document.getElementById("Name").value);
});

