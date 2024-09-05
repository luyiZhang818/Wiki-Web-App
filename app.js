const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.results');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const value = input.value;
    // check for empty values
    if(!value){
        results.innerHTML = '<div class="error"> Please enter valid search term </div>';
    return;
    }
    fetchPages(value)
});

const fetchPages = async(searchValue) => {
    results.innerHTML = '<div class="loading"></div>';
    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const searchResults = data.query.search;
        if (searchResults.length < 1) {
            results.innerHTML = '<div class="error"> No matching results </div>';
            return;
        }
        renderResults(searchResults);
    } catch (error) {
        results.innerHTML = '<div class="error"> There was an error </div>';
    }
};

const renderResults = (list) => {
    // get an array of all cards info in html
    const cardsList = list.map((item) => {
        const {title, snippet, pageid} = item;
        return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
                <h4>${title}</h4>
                <p>${snippet}</p>
            </a>`;
    }).join("");

    results.innerHTML = `<div class = "articles"> 
        ${cardsList}
    </div>`
};