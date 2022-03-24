export default class getFilm{

    async get(url){
        const data = await fetch(url)
        const jsonData = await data.json()
        return jsonData
    }
    
}