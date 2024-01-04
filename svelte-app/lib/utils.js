//various utils

import { Info } from "../src/stores"

export async function getResponse(text) {
    //retrieve namelist
    let namelist = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
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
    namelist = await namelist.json()
    namelist = namelist.data.allPeople.people
    //find ID associated with the searched name
    const id = namelist.find(person => person.name === text).id
    if(!id) {
        console.log("Error, wrong name")
        return
    }
    //construct query
  
    let info = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query Person($personId: ID) {
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
              `,
            variables :{
              "personId": `${id}`
            }
          })
  })
  info = await info.json()
  Info.set(info)
}