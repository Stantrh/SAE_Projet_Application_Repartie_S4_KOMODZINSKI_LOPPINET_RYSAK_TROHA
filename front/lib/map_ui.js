import {stationInfoUrl, stationStatusUrl} from "./config";
import {fetchApi} from "./dataloader";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';

async function fetchData(url) {
    const response = await fetchApi(url);
    const data = await response.json();
    return data.data.stations;
}

function createMarker(station, status, map) {
    const marker = L.marker([station.lat, station.lon]).addTo(map);
    marker.bindPopup(`
        <b>${station.name}</b><br>
        Adresse: ${station.address}<br>
        Vélos disponibles: ${status.num_bikes_available}<br>
        Places libres: ${status.num_docks_available}
    `);
}

function createRestaurantMarker(restaurant, map) {
    const marker = L.marker([restaurant.Latitude, restaurant.Longitude], {
        icon: L.icon({
            iconUrl: '../resources/icon-restaurant.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);

    const popupContent = `
        <b>${restaurant.Nom}</b><br>
        Adresse: ${restaurant.Adresse}<br><br>
        <form id="reservation-form-${restaurant.RestaurantID}">
            <label for="nom">Nom:</label><br>
            <input type="text" id="nom" name="nom"><br>
            <label for="prenom">Prénom:</label><br>
            <input type="text" id="prenom" name="prenom"><br>
            <label for="nbPersonne">Nombre de personnes:</label><br>
            <input type="number" id="nbPersonne" name="nbPersonne"><br>
            <label for="tel">Téléphone:</label><br>
            <input type="text" id="tel" name="tel"><br><br>
            <input type="hidden" id="idRestaurant" name="idRestaurant" value="${restaurant.RestaurantID}">
            <input type="submit" value="Réserver">
        </form>
    `;

    marker.bindPopup(popupContent);

    marker.on('popupopen', function() {
        const form = document.getElementById(`reservation-form-${restaurant.RestaurantID}`);
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const data = {
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                nbPersonne: parseInt(formData.get('nbPersonne')),
                tel: formData.get('tel'),
                idRestaurant: parseInt(formData.get('idRestaurant'))
            };

            try {
                const response = await fetchApi('/reserverTable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                alert('Réservation réussie!');
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la réservation. Veuillez réessayer.');
            }
        });
    });
}

export async function initMap() {
    try {
        const stationInfo = await fetchData(stationInfoUrl);
        const stationStatus = await fetchData(stationStatusUrl);

        const map = L.map('map').setView([48.683331, 6.2], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        stationInfo.forEach(station => {
            const status = stationStatus.find(s => s.station_id === station.station_id);
            if (status) {
                createMarker(station, status, map);
            }
        });

        // TODO A changer par le retour api à l'endpoint /restaurants (get)
        const restaurantsReceived = [
            {"RestaurantID":1,"Nom":"Tanto Bene","Adresse":"1 Av. Foch, 54000 Nancy","Latitude":48.6895,"Longitude":6.177},
            {"RestaurantID":2,"Nom":"foodies burger","Adresse":"4 Rue des Tiercelins, 54000 Nancy","Latitude":48.6896,"Longitude":6.1852},
            {"RestaurantID":3,"Nom":"Khan Restaurant","Adresse":"58 Rue des Ponts, 54000 Nancy","Latitude":48.6871,"Longitude":6.1827},
            {"RestaurantID":4,"Nom":"Koboon","Adresse":"34 Av. du XX Corps, 54000 Nancy","Latitude":48.6938,"Longitude":6.1911},
            {"RestaurantID":5,"Nom":"Zeugma","Adresse":"32-34 Rue des Sœurs Macarons, 54000 Nancy","Latitude":48.6891,"Longitude":6.1848},
            {"RestaurantID":6,"Nom":"Côté Sushi","Adresse":"18 Pl. Henri Mengin, 54000 Nancy","Latitude":48.6903,"Longitude":6.1819},
            {"RestaurantID":7,"Nom":"Chicken Street","Adresse":"16 Av. du Général Leclerc, 54000 Nancy","Latitude":48.6851,"Longitude":6.186}
        ];

        restaurantsReceived.forEach(restaurant => {
            createRestaurantMarker(restaurant, map);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}
