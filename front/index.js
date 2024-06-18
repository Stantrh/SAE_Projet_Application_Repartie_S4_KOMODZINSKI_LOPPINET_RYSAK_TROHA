import {initMap} from './lib/map_ui.js';
import {fetchApi} from "./lib/dataloader";

// Dès que tout le DOM est chargé, on initialise la map
document.addEventListener('DOMContentLoaded', async () => {


    await initMap();

    console.log("FETCH DE l'API DONNEES BLOQUEES");
    const rep = await fetchApi('https://www.datagrandest.fr/data4citizen/d4c/api/datasets/1.0/1642070072496-1/alternative_exports/90c43af4-e5b9-4069-8bf1-61a5b900b476/')

});
