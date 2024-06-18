import {initMap} from './lib/map_ui.js';
import {fetchApi} from "./lib/dataloader";

// Dès que tout le DOM est chargé, on initialise la map
document.addEventListener('DOMContentLoaded', async () => {


    await initMap();
    
});
