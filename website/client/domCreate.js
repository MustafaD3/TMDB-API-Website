export default class item{
    domCreate(data){
        const dom = new Object()
        dom.li = document.createElement("li")
        dom.img = document.createElement("img")
        dom.h1 = document.createElement("h1")
        dom.div = document.createElement("div")
        const li = this.domSettings(data,dom)
        return li
    }
    domSettings(data,object){
        const baseImgURL ="https://image.tmdb.org/t/p/w500"
        object.img.setAttribute("src",baseImgURL+data.poster_path)
        object.h1.innerHTML=data.title
        if(data.release_date){
            object.div.innerHTML = "<b style='display:block;text-align:center;'>Film Hakkında</b>"+data.overview+"<hr>"+"<b style='display:block;text-align:center;'>Çıkış Tarihi<b>"+"<br>"+data.release_date
        }
        else{
            object.div.innerHTML = "<b style='display:block;text-align:center;'>Film Hakkında</b>"+data.overview+"<hr>"+"Çıkış Tarihi Bulunamadı"
        }
        
        object.div.classList.add("item")
        object.li.append(object.img,object.h1,object.div)
        return object.li
    }
}