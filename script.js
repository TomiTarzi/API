const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('charactersContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
async function getCharacters(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        console.error('Error al fetchar la API:', error);
        container.innerHTML = '<p style="text-align: center; color: #ff6b6b;">No se encontraron personajes.</p>';
    }
}
function displayCharacters(characters) {
    container.innerHTML = ''; 
    characters.forEach(char => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="card-content">
                <h3>${char.name}</h3>
                <p>Estado: ${char.status}</p>
                <p>Especie: ${char.species}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    getCharacters(`${API_URL}/?name=${query}`);
});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
getCharacters(API_URL);