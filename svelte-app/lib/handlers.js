//handlers.js

import {getResponse} from "../lib/utils"

export async function handleInput(Event, search_text) {
    //recognizing event source
   if (Event.type === "keydown" && Event.key === "Enter") {
    //console.log("successful keydown")
   }
   else if (Event.type === "click") {
    //console.log("successful click")
   }
   else return
   //handling the event
   //console.log("input: ", search_text) 
   await getResponse(search_text) ;
}