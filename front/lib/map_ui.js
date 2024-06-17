import {stationInfoUrl, stationStatusUrl} from "./config";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.heat';


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

        // TODO A remplacer par la reponse de l'API au endpont /restaurants
        const restaurantsReceived = [
            {"RestaurantID":1,"Nom":"Tanto Bene","Adresse":"1 Av. Foch, 54000 Nancy","Latitude":48.6895,"Longitude":6.177},
            {"RestaurantID":2,"Nom":"foodies burger","Adresse":"4 Rue des Tiercelins, 54000 Nancy","Latitude":48.6896,"Longitude":6.1852},
            {"RestaurantID":3,"Nom":"Khan Restaurant","Adresse":"58 Rue des Ponts, 54000 Nancy","Latitude":48.6871,"Longitude":6.1827},
            {"RestaurantID":4,"Nom":"Koboon","Adresse":"34 Av. du XX Corps, 54000 Nancy","Latitude":48.6938,"Longitude":6.1911},
            {"RestaurantID":5,"Nom":"Zeugma","Adresse":"32-34 Rue des S�urs Macarons, 54000 Nancy","Latitude":48.6891,"Longitude":6.1848},
            {"RestaurantID":6,"Nom":"C�t� Sushi","Adresse":"18 Pl. Henri Mengin, 54000 Nancy","Latitude":48.6903,"Longitude":6.1819},
            {"RestaurantID":7,"Nom":"Chicken Street","Adresse":"16 Av. du G�n�ral Leclerc, 54000 Nancy","Latitude":48.6851,"Longitude":6.186}
        ];

        restaurantsReceived.forEach(restaurant => {
            // Crée un marker rouge pour chaque restaurant sur la map
            const marker = L.marker([restaurant.Latitude, restaurant.Longitude], {
                icon: L.icon({
                    iconUrl: '../resources/icon-restaurant.png',
                    iconSize: [41, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(map);

            // Chaque restaurant a son propre formulaire (id différent)
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
                form.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const formData = new FormData(form);
                    const data = {
                        nom: formData.get('nom'),
                        prenom: formData.get('prenom'),
                        nbPersonne: parseInt(formData.get('nbPersonne')),
                        tel: formData.get('tel'),
                        idRestaurant: parseInt(formData.get('idRestaurant'))
                    };

                    fetch('/reserverTable', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(result => {
                            alert('Réservation réussie!');
                        })
                        .catch(error => {
                            console.error('Erreur:', error);
                            alert('Erreur lors de la réservation. Veuillez réessayer.');
                        });
                });
            });
        });


    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

