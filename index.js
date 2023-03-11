let moviesArray = []
let watchlistArray = []
const movieSearch = document.getElementById("movie-search")
const inputEl = document.getElementById("search")
const resultsEl = document.getElementById("results")
const watchlistEl = document.getElementById("watchlist");

movieSearch.addEventListener("submit", searchMovies)

function searchMovies(e){
    e.preventDefault()
    const movieName = inputEl.value 
    fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=f601880c`)
        .then(res=>res.json())
        .then(data=>{
            const movie = {
                Title: data.Title,
                Poster: data.Poster,
                imdbRating: data.imdbRating,
                Runtime: data.Runtime,
                Genre: data.Genre,
                Plot: data.Plot,
                Id: data.imdbID
            }
            moviesArray.push(movie);
            localStorage.setItem("movies", JSON.stringify(moviesArray));
            renderResult(movie);
        })
}

function renderResult(i) {
    resultsEl.innerHTML = `
        <div class="info">
            <img class="poster" id="poster" src="${i.Poster}">
            <div class="main-body">
                <div class="heading">
                    <h3 class="title">${i.Title}</h3>
                    <h3 class="rating">${i.imdbRating}</h3>
                </div>
                <div class="mid-section">
                    <h3 class="runtime">${i.Runtime}</h3>
                    <h3 class="genre">${i.Genre}</h3>
                    <h3 class="add" onclick="addToWatchlist('${i.Id}')">Add to Watchlist</h3>
                </div>
                <div class="plot">
                    ${i.Plot}
                </div>
            </div>
        </div>
    `   
}

function addToWatchlist(id) {
  const movie = moviesArray.find((movie) => movie.Id === id);
  watchlistArray.push(movie);
  localStorage.setItem("watchlistKey", JSON.stringify(watchlistArray));
  renderWatchlist()
}

function removeMovie(id) {
  watchlist = watchlistArray.filter(iter => iter.Id !== id);
  localStorage.setItem("watchlistKey", JSON.stringify(watchlist));
  renderWatchlist();
}

function renderWatchlist(){
    let html = ''
    const NewWatchlist = JSON.parse(localStorage.getItem("watchlistKey"));
    for (let movie of NewWatchlist){
        html += `
            <div class="info">
                <img class="poster" id="poster" src="${movie.Poster}">
                <div class="main-body">
                    <div class="heading">
                        <h3 class="title">${movie.Title}</h3>
                        <h3 class="rating">${movie.imdbRating}</h3>
                    </div>
                    <div class="mid-section">
                        <h3 class="runtime">${movie.Runtime}</h3>
                        <h3 class="genre">${movie.Genre}</h3>
                        <h3 class="add" onclick="removeMovie('${movie.Id}')">Remove from Watchlist</h3>
                    </div>
                    <div class="plot">
                        ${movie.Plot}
                    </div>
                </div>
            </div>
        `
    }
    watchlistEl.innerHTML = html
}

window.onload=()=>renderWatchlist();

