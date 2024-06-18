import {
    API_SERVEUR_URL,
    stationInfoUrl,
    stationStatusUrl,
    INCIDENTS_URL,
    API_ETABLISSEMENTS_SUPERIEURS, meteoUrl
} from "./config";
import {fetchWithProxy} from "./dataloader";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

async function fetchData(url) {
    const response = await fetchWithProxy(url);
    return response.data.stations;
}


function createMarker(station, status, map) {
    const marker = L.marker([station.lat, station.lon], {icon: L.icon({
            iconUrl: '../resources/icon-bicycle.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })}).addTo(map);
    marker.bindPopup(`
        <b>${station.name}</b><br>
        <b>Adresse:</b> ${station.address}<br>
        <b>Vélos disponibles:</b> ${status.num_bikes_available}<br>
        <b>Places libres:</b> ${status.num_docks_available}
    `);
}

function createIncident(incident, map) {
    const { location, short_description } = incident;
    const latlng = location.polyline.split(' ').map(coord => parseFloat(coord));

    const marker = L.marker(latlng, {
        icon: L.icon({
            iconUrl: '../resources/icon-incident.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);

    marker.bindPopup(`
        <b>${short_description}</b><br>
        <b>Description:</b> ${incident.description}<br>
        <b>Début:</b> ${incident.starttime}<br>
        <b>Fin:</b> ${incident.endtime}<br>
        <b>Localisation:</b> ${location.location_description}
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
    <form id="reservation-form-${restaurant.RestaurantID}" style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;">
        <label for="nom" style="font-weight: bold; color: #333;">Nom:</label>
        <input type="text" id="nom" name="nom" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="prenom" style="font-weight: bold; color: #333;">Prénom:</label>
        <input type="text" id="prenom" name="prenom" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="nbPersonne" style="font-weight: bold; color: #333;">Nombre de personnes:</label>
        <input type="number" id="nbPersonne" name="nbPersonne" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="tel" style="font-weight: bold; color: #333;">Téléphone:</label>
        <input type="text" id="tel" name="tel" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <input type="hidden" id="idRestaurant" name="idRestaurant" value="${restaurant.RestaurantID}">
        
        <input type="submit" value="Réserver" style="padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50; color: white; font-weight: bold; cursor: pointer; font-size: 16px;">
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
                const response = await fetchWithProxy(`${API_SERVEUR_URL}/reserverTable`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.text();
                alert(result);
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la réservation. Veuillez réessayer.');
            }
        });
    });
}


function createEtablissementMarker(etablissement, map){
    const marker = L.marker([etablissement.coordonnees.lat, etablissement.coordonnees.lon], {
        icon: L.icon({
            iconUrl: '../resources/icon-etablissement.png',
            iconSize: [41, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);

    marker.bindPopup(`
        <b>${etablissement.implantation_lib}</b><br>
        <b>Siège Libéral:</b> ${etablissement.siege_lib}<br>
        <b>Type d'établissement:</b> ${etablissement.type_d_etablissement}<br>
        <b>Adresse: </b>${etablissement.adresse_uai}
    `);
}




const ajouterEvenementAjoutRestaurant = (map) => {
    map.on('click', async function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // On utilise Geocoder pour avoir l'adresse à partir de la latitude et la longitude
        const geocoder = L.Control.Geocoder.nominatim();
        geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
            const result = results[0];
            if (result) {
                const address = result.name;

                // Popup avec un formulaire pour entrer le nom du restaurant
                const popupContent = `
                    <form id="restaurant-form" style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;">
                        <label for="restaurant-name" style="font-weight: bold; color: #333;">Nom du restaurant:</label>
                        <input type="text" id="restaurant-name" name="restaurant-name" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
                        <button type="submit" style="padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50; color: white; font-weight: bold; cursor: pointer; font-size: 16px;">Ajouter</button>
                    </form>
                `;


                const popup = L.popup()
                    .setLatLng(e.latlng)
                    .setContent(popupContent)
                    .openOn(map);

                // Listener pour le formulaire de soumission
                document.getElementById('restaurant-form').addEventListener('submit', async function (event) {
                    event.preventDefault();

                    const restaurantName = document.getElementById('restaurant-name').value;

                    const restaurant = {
                        Nom: restaurantName,
                        Adresse: address,
                        Latitude: lat,
                        Longitude: lng
                    };

                    try {
                        const response = await fetchWithProxy(`${API_SERVEUR_URL}/ajouterRestaurant`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(restaurant)
                        });

                        const result = await response.json();

                        createRestaurantMarker(restaurant, map);

                        // On ferme le popup après l'ajout
                        popup.remove();

                        console.log('Restaurant ajouté avec succès:', result);
                    } catch (error) {
                        console.error('Erreur:', error);
                    }
                });
            } else {
                alert('Adresse non trouvée');
            }
        });
    });
}

async function getRestaurants() {
    try {
        return await fetchWithProxy(`${API_SERVEUR_URL}/restaurants`);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getIncidents() {
    try {
        return await fetchWithProxy(INCIDENTS_URL);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getEtablissements(){
    try{
        return await fetchWithProxy(API_ETABLISSEMENTS_SUPERIEURS);
    }catch(error){
        console.error('Error:', error);
    }
}



export function displayWeatherData(weatherData) {
    const weatherForecast = document.getElementById('weather-forecast');
    weatherForecast.innerHTML = ''; // Clear previous data

    const hours = Object.keys(weatherData).filter(key => key.includes(':00:00'));
    hours.forEach(hour => {
        const weather = weatherData[hour];
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';

        const time = new Date(hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        weatherCard.innerHTML = `
            <div class="weather-time">${hour}</div>
            <div class="weather-temp">${(weather.temperature['2m'] - 273.15).toFixed(1)} °C</div>
            <div class="weather-humidity">Humidité: ${weather.humidite['2m']}%</div>
            <div class="weather-wind">Vent: ${weather.vent_moyen['10m']} km/h</div>
        `;

        weatherForecast.appendChild(weatherCard);
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

        const restaurantsReceived= await getRestaurants();

        restaurantsReceived.forEach(restaurant => {
            createRestaurantMarker(restaurant, map);
        });

        ajouterEvenementAjoutRestaurant(map);


        const etablissementsReceived = await getEtablissements();
        console.log(JSON.stringify(etablissementsReceived.results));
        etablissementsReceived.results.forEach(etablissement => {
            createEtablissementMarker(etablissement, map)
        });


        const incidentsReceived = await getIncidents();
        incidentsReceived.incidents.forEach(incident => {
            createIncident(incident, map);
        });

        const legend = L.control({ position: 'bottomright' });

        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML += '<i style="background: url(../resources/icon-bicycle.png) no-repeat center center / contain"></i>Stations Vélib<br>';
            div.innerHTML += '<i style="background: url(../resources/icon-restaurant.png) no-repeat center center / contain"></i>Restaurants<br>';
            div.innerHTML += '<i style="background: url(../resources/icon-incident.png) no-repeat center center / contain"></i>Incidents<br>';
            div.innerHTML += '<i style="background: url(../resources/icon-etablissement.png) no-repeat center center / contain"></i>Etablissements du supérieur<br>';
            return div;
        };

        legend.addTo(map);


        const weatherData = await fetchWithProxy(meteoUrl);
        displayWeatherData(weatherData);


    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}
