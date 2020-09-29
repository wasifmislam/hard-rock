document.getElementById("serach-btn").addEventListener("click",searchLyric );
   
function searchLyric(){

document.getElementById("show_song").innerHTML='';
    

const title_song = document.getElementById("search-song").value;
fetch(`https://api.lyrics.ovh/suggest/${title_song}`)
.then(res => res.json())
.then(data => {
    fetchdata = data;
    for ( i = 0; i < data.data.length; i++) {
    const title = data.data[i].title
    const artist=data.data[i].artist.name


    document.getElementById("show_song").innerHTML += `
    <div   class="single-result row align-items-center my-3 p-3">
    <div  class="author lead"><h3><strong>${title}</strong></h3>
  
    Album by <span>${artist}</span> 
    </div>
    <div>
    <a href="#lyrics"><button onClick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button>  </a>
    </div>
    </div>
    `
    
    if(i==9){
        break;
    };
}});


}


function getLyrics(index){
 document.getElementById("lyrics").innerHTML='';   
const title = fetchdata.data[index].title;
const artist = fetchdata.data[index].artist.name;

fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
.then(res => res.json())
.then(data => {
    var lyrics = data.lyrics;
    document.getElementById("lyrics").innerHTML = `<h2 class="text-success mb-4">${title}</h2>
                                                  <pre  class="lyric text-white">${lyrics}</pre>`
    console.log(lyrics);
})
}


