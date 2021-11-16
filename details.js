const xhr = new XMLHttpRequest();
const url = "https://valorant-api.com/v1/agents";

let characterDetails = ""

xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && xhr.status === 200) {
        let characters = JSON.parse(xhr.responseText);
        let details = characters.data
        let selected = window.localStorage.getItem("selected");
        console.log(selected);
        details.forEach(character => {
            if (character.uuid == selected) {
                characterDetails += displayCharacter(character)
            }
            console.log(character);

        })
        document.querySelector('#character-card').innerHTML = characterDetails;

        // if characterDetails is empty - user goes directly to this page
        if (characterDetails == "") {
            // display first character
            let character = details[0];
            characterDetails += displayCharacter(character);
            document.querySelector('#character-card').innerHTML = characterDetails;
        }
    }
};

xhr.open("GET", url, true);
xhr.send();

function displayCharacter(character) {
    if (character.role != null) {
        return `
        <div class="character">
            <img src="${character.bustPortrait}" alt="${character.displayName}">
            <div id="description">
                <h2>${character.displayName}</h2>
                <p id="role_label">${character.role.displayName.toUpperCase()}</p>
                <p>${character.description}</p>
            </div>

            <div id="abilities">
                <h3 id="abilities_label">Abilities</h3>
                <h3>${character.abilities[0].displayName}</h3>
                <p>${character.abilities[0].description}</p>
                <hr>    
                <h3>${character.abilities[1].displayName}</h3>
                <p>${character.abilities[1].description}</p>
                <hr>    
                <h3>${character.abilities[2].displayName}</h3>
                <p>${character.abilities[2].description}</p>
                <hr>    
                <h3 id="ultimate_label">Ultimate</h3>
                <h3>${character.abilities[3].displayName}</h3>
                <p>${character.abilities[3].description}</p>
            </div>
        </div>
    `
    }
    return "";
};
