import item from "./domCreate.js";
import getFilm from "./getFilm.js";

const getFilmClass = new getFilm()
const domCreateClass = new item()
const apiKey ="f0d479f0ac3290d9fdbd78165fca7935"

const movieList = document.getElementById("film-list")
const trendButton = document.getElementById("trend")
const populationButton = document.getElementById("population")
const moreButton = document.getElementById("more")
const searchInput = document.getElementById("searchBar")
searchInput.addEventListener("input",e => {
    const li = document.querySelectorAll("#film-list li h1")
    for(const x of li){
        const value = new RegExp(e.target.value,"i")
        if(x.innerHTML.search(value) > -1){
            x.parentElement.style.display = "block"
        }
        else{
            x.parentElement.style.display = "none"
        }
    }
    
})

let globalUrl = null
let count = 2
let string = "page="+count

trendButton.addEventListener("click",async (e)=>{
    e.preventDefault()
    const url =`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    const data = await getFilmClass.get(url)
    const movieData = data.results
    trend(movieData)
    count =-1
})

populationButton.addEventListener("click",async (e) =>{
    e.preventDefault()
    const url =`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const data = await getFilmClass.get(url)
    const movieData = data.results
    population(movieData)
    globalUrl = url.replace("page=1",string)
    moreButton.style.pointerEvents = "auto"
    count =2
})

moreButton.addEventListener("click",async function (e) { 
    e.preventDefault()
    if(globalUrl && count <=10&&count > -1){
        const data = await fetch(globalUrl)
        const movieData = await data.json()
        moreMovie(movieData.results)
        count++
        string = "page="+count
        globalUrl = globalUrl.slice(0,99)+string
        console.log(globalUrl)
    }
    else{
        alert("Limit Aşıldı Veya Trend Filmlerden Daha Fazla istediniz")
        return
    }
 })

function trend(movieData){
    movieList.innerHTML =""
    movieData.forEach(element => {
        const li =  domCreateClass.domCreate(element)
         movieList.append(li)
    });
}
function population(movieData){
    movieList.innerHTML =""
    movieData.forEach( element => {
        const li =  domCreateClass.domCreate(element)
         movieList.append(li)
     
    });
}

function moreMovie(movieData){
    movieData.forEach(element =>{
        const li = domCreateClass.domCreate(element)
        movieList.append(li)
})
}