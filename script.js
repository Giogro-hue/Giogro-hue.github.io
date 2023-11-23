var input = document.getElementById("search_bar") ;
var target = document.getElementById("target") ;
var button = document.getElementById("search_button") ;
var s_par = document.getElementById("star_data") ;
button.addEventListener("click", function(){
    retrieve_info(input.value) ;
}) ;
input.addEventListener("keydown", function(event){
    if(event.key=="Enter") {updateParagraph() ;}
}) ;



//main func
function retrieve_info(name) {
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

    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query }),
    })
    .then(response => response.json()) //make data into JSON
    .then(data => {
        console.log('Data received:', data.data.allPeople.people); //for debugging
        var namelist = data.data.allPeople.people ;
        console.log(namelist) ;
      for(var i=0; i<namelist.length ; i++) {
            if(name==namelist[i].name) {
                //showinfo(person.id) ;
                console.log(namelist[i].name) ;
                break ;
         }
        }
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

//click-->retrieve list of names-->find name_id in list-->query info for id-->process and show info