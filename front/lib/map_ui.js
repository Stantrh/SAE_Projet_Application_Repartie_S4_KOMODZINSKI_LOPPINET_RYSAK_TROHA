import {stationInfoUrl, stationStatusUrl} from "./lib/config";
import L from 'leaflet';

/**
 * Fonction qui permet d'initialiser la carte
 * @returns {Promise<void>}
 */
export async function initMap() {
    try {
        // On récupère d'abord les infos auprès des 2 urls avec promise all
        // comme ça, les 2 promesses sont obligées d'être un succès
        const [stationInfoResponse, stationStatusResponse] = await Promise.all([
            fetch(stationInfoUrl),
            fetch(stationStatusUrl)
        ]);

        // Puis on convertir les données en json
        const stationInfoData = await stationInfoResponse.json();
        const stationStatusData = await stationStatusResponse.json();

        const stationInfo = stationInfoData.data.stations;
        const stationStatus = stationStatusData.data.stations;

        // On initialise la carte avec les coordonnées du centre de nancy
        // https://www.coordonneesgps.net/coordonnees-gps/nancy-54100-29689-ville
        // et le niveau de zoom (+ la valeur est grande, + c'est zoomé)
        const map = L.map('map').setView([48.683331, 6.2], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Maintenant on parcourt les informations contenue pour chaque station
        stationInfo.forEach(station => {
            const status = stationStatus.find(s => s.station_id === station.station_id);
            if (status) {
                // On crée un marker avec Leaflet qu'on ajoute à la map
                const marker = L.marker([station.lat, station.lon]).addTo(map);
                // Puis lorsqu'un utilisateur clique sur un marker, alors le texte là s'affichera
                marker.bindPopup(`
                    <b>${station.name}</b><br>
                    Adresse: ${station.address}<br>
                    Vélos disponibles: ${status.num_bikes_available}<br>
                    Places libres: ${status.num_docks_available}
                `);
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}