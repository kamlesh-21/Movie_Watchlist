const watchlistEl = document.getElementById("watchlist");

function renderWatchlist(){
    let html = ''
    const newWatchlist = JSON.parse(localStorage.getItem("watchlistKey"));
    for (let movie of newWatchlist){
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

function removeMovie(id) {
    const newWatchlist = JSON.parse(localStorage.getItem("watchlistKey"));
    watchlist = newWatchlist.filter(iter => iter.Id !== id);
    localStorage.setItem("watchlistKey", JSON.stringify(watchlist));
    renderWatchlist();
}

window.onload=()=>renderWatchlist();