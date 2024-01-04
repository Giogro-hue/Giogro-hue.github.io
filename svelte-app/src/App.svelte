<script>
	import {handleInput} from '../lib/handlers'
    import { Info } from './stores';
    
    //initialize variable to store input value
    let search_text
    //subscribe to the Info store
    let currentInfo 
    Info.subscribe(
        (info) => {
            currentInfo = info 
    }
   )  
</script>

<h1>Star wars finder</h1>

<div class = "searchbar">
<input type="text" bind:value={search_text} on:keydown={(e) => handleInput(e, search_text)}>
<button on:click={(e) => handleInput(e, search_text)}>Search</button>
</div>

{#if currentInfo !== null}
    <p>Character name : {currentInfo.data.person.name}</p>
{/if}


<style>
    .searchbar{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    h1{
        display: flex;
        justify-content: center;
    }
</style>