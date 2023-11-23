var input = document.getElementById("search_bar") ;
var target = document.getElementById("target") ;
var button = document.getElementById("search_button") ;
var s_par = document.getElementById("star_data") ;
button.addEventListener("click", updateParagraph) ;
input.addEventListener("keydown", function(event){
    if(event.key=="Enter") {updateParagraph() ;}
})
fetchData() ;




//replaces the target element with the input value
function updateParagraph() {
    target.textContent=input.value ;
}

//fetches names and IDs
async function fetchData() {
    var query = `
      query AllFilms {
        allPeople {
          people {
            id
            name
          }
        }
      }
    `;

    try {
        const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
    body: JSON.stringify({query: query})
    }) ;
    const data = await response.json() ;
    console.log("DATA:", data) ;
    return data ; 
    } 
    catch(error) {
        console.log("ERROR:", error) ;
    }
}