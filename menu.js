const xhr = new XMLHttpRequest();
const url = "https://valorant-api.com/v1/agents"; // api
let characterDetails = ""

xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && xhr.status === 200) {
        let characters = JSON.parse(xhr.responseText);
        // data/character objects
        let details = characters.data
        // for each character, display data
        details.forEach(character => {
            if (character.role != null) {
                characterDetails += displayCharacter(character);
            }
        })
        // add data to characters div
        document.querySelector('#characters').innerHTML = characterDetails;

    }
};

xhr.open("GET", url, true);
xhr.send();

// html to be rendered
function displayCharacter(character) {
    if (character.role != null) {
        return `
        <a href="details.html" onclick="window.localStorage.setItem('selected', '${character.uuid}')">
            <div class="character-card" >
                <h2>${character.displayName}</h2>
                <img class="img-card" src="media/${character.displayName}-bustportrait.jpg" alt="${character}" onerror="this.src='media/no-image.png'">        
            </div>
        </a>
        `
    };
    return "";
};
