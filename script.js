var input = document.getElementById("search_bar") ;
var target = document.getElementById("target") ;
var button = document.getElementById("search_button") ;
var s_par = document.getElementById("star_data") ;
button.addEventListener("click", function(){
    retrieve_info(input.value) ;
}) ;
input.addEventListener("keydown", function(event){
    if(event.key=="Enter") {
        retrieve_info(input.value) ;
    }
}) ;



//main func
function retrieve_info(name) {
    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: `query AllFilms {
            allPeople {
              people {
                id
                name
              }
            }
          }` }),
    }) 
    .then(response => response.json()) //make data into JSON
    .then(data => {
        console.log('Data received:', data.data.allPeople.people); //for debugging
        var namelist = data.data.allPeople.people ;
      for(var i=0; i<namelist.length ; i++) {
            if(name==namelist[i].name) {
                showinfo(namelist[i].id) ;
                break ;
         }
        }
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function showinfo(ID) {
    var myQuery = `query Person($personId: ID) {
      person(id: $personId) {
        name
        species {
          name
        }
        homeworld {
          name
        }
        filmConnection {
          films {
            title
          }
        }
      }
    }
    ` ;

    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: myQuery,
          variables :{
            "personId": `${ID}`
          }
        })
})
.then(response=>{
   return response.json() ;
}) 
.then(result=>{
    console.log(result) ;
})
}
//click-->retrieve list of names-->find name_id in list-->query info for id-->process and show info