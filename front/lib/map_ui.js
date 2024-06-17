import {stationInfoUrl, stationStatusUrl} from "./config";
import {fetchApi} from "./dataloader";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';
import 'leaflet-control-geocoder';

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
        Description: ${incident.description}<br>
        Début: ${incident.starttime}<br>
        Fin: ${incident.endtime}<br>
        Localisation: ${location.location_description}
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
                        <form id="restaurant-form">
                            <label for="restaurant-name">Nom du restaurant:</label>
                            <input type="text" id="restaurant-name" name="restaurant-name" required>
                            <button type="submit">Ajouter</button>
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

                    // TODO Verifier envoie AU SERVEUR A LA ROUTE /ajouterRestaurant
                    const restaurant = {
                        Nom: restaurantName,
                        Adresse: address,
                        Latitude: lat,
                        Longitude: lng
                    };

                    try {
                        const response = await fetchApi('/ajouterRestaurant', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(restaurant)
                        });
                        // TODO A remettre lorsque l'api marche à l'endpoint /ajouterRestaurant (post)
                        // if (!response.ok) {
                        //     throw new Error('Erreur lors de l\'ajout du restaurant');
                        // }
                        //
                        // const result = await response.json();

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

        ajouterEvenementAjoutRestaurant(map);

        // TODO A changer par le retour api à l'endpoint /incidents (get)
        const incidentsReceived = [
            {
                "type": "CONSTRUCTION",
                "description": "Chauffage urbain - Voirie: R�duction � une file de circulation, R�tr�cissement des voies",
                "short_description": "Chauffage urbain - Voirie",
                "starttime": "2024-06-01T00:00:00",
                "endtime": "2024-08-30T00:00:00",
                "location": {
                    "street": "Boulevard Louis Barthou",
                    "polyline": "48.670705110635964 6.186903512600356",
                    "location_description": "BOULEVARD LOUIS BARTHOU, VANDOEUVRE"
                },
                "source": {
                    "name": "M�tropole du Grand Nancy",
                    "reference": "Grand_Nancy"
                },
                "updatetime": "2024-03-21T20:29:37.251429",
                "creationtime": "2024-03-21T20:29:37.251421",
                "id": "FrMdGN54180828"
            },
            {
                "type": "CONSTRUCTION",
                "description": "Chantier ponctuel - Voirie: D�viation pour les pi�tons (pas de passage interdit), Suppression d'un sens de circulation (Rue en sens unique)",
                "short_description": "Chantier ponctuel - Voirie",
                "starttime": "2023-06-28T00:00:00",
                "endtime": "2024-06-28T00:00:00",
                "location": {
                    "street": "Rue Saint-Jean",
                    "polyline": "48.69070423748256 6.182203192232047",
                    "location_description": "RUE SEMARD ST JEAN ST GEORGES, NANCY"
                },
                "source": {
                    "name": "M�tropole du Grand Nancy",
                    "reference": "Grand_Nancy"
                },
                "updatetime": "2024-03-21T20:29:37.322720",
                "creationtime": "2024-03-21T20:29:37.322712",
                "id": "FrMdGN54171862"
            },
        ];

        incidentsReceived.forEach(incident => {
            createIncident(incident, map);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}
