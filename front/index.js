import {initMap} from './lib/map_ui.js';
import {displayWeatherData} from "./lib/map_ui.js";
import {fetchWithProxy} from "./lib/dataloader";
import {meteoUrl} from "./lib/config";

// Dès que tout le DOM est chargé, on initialise la map
document.addEventListener('DOMContentLoaded', async () => {
    await initMap();
});
