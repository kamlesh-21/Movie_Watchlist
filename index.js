let moviesArray = []
let watchlistArray = JSON.parse(localStorage.getItem("watchlistKey")) || []
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
                    <h3 class="add" onclick="
                    ${isInWatchlist(i.Id) ? 
                        `removeFromWatchlist('${i.Id}')` :
                        `addToWatchlist('${i.Id}')`
                    }">
                    ${isInWatchlist(i.Id) ? 
                        `Remove from Watchlist` :
                        (watchlistArray.some((movie) => movie.Id === i.Id) ?
                        `Remove from Watchlist` :
                        `Add to Watchlist`
                        )
                    }
                    </h3>
                </div>
                <div class="plot">
                    ${i.Plot}
                </div>
            </div>
        </div>
        </hr>
    `   
}

function isInWatchlist(id) {
  const watchlist = JSON.parse(localStorage.getItem("watchlistKey")) || [];
  return watchlist.some((movie) => movie.Id === id);
}


function addToWatchlist(id) {
  const movie = moviesArray.find((movie) => movie.Id === id);
   if (watchlistArray.find((movie) => movie.Id === id)) {
    alert("This movie is already in your watchlist!");
  } else {
    watchlistArray.push(movie);
    localStorage.setItem("watchlistKey", JSON.stringify(watchlistArray));
    alert("Added");
  }
}

function removeFromWatchlist(id) {
  watchlistArray = watchlistArray.filter((movie) => movie.Id !== id);
  localStorage.setItem("watchlistKey", JSON.stringify(watchlistArray));
  renderResult(moviesArray.find((movie) => movie.Id === id));
}