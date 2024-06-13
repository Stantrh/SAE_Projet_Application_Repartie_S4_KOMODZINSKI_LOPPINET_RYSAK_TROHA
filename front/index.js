import {initMap} from './lib/map_ui.js';
import {MIAAM_URL} from "./lib/config";

// Dès que tout le DOM est chargé, on initialise la map
document.addEventListener('DOMContentLoaded', async () => {
    await initMap();
});
