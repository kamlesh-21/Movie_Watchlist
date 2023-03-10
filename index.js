const movieSearch = document.getElementById("movie-search")
const inputEl = document.getElementById("search")

movieSearch.addEventListener("submit", (e)=>{
    e.preventDefault()
    renderResult()
})

function renderResult(){
    const movieName = inputEl.value 
    console.log(movieName)
    fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=f601880c`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    
}

