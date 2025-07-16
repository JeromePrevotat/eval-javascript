// import { Borne } from './modules/borne.js';
// import { BornePublique } from './modules/publicBorne.js';
// import { BornePrivee } from './modules/privateBorne.js';
// import { Reservation } from './modules/reservation.js';

const mapContainer = document.getElementById("map");
let map = L.map(mapContainer);
// let positionMarker = L.marker();

function addMapCredits(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
}

function getLocation(){
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        map = map.setView([latitude, longitude], 14);
        // positionMarker = positionMarker.setLatLng([latitude, longitude]).addTo(map);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, positionAccuracy: ${position.coords.accuracy}`);
    },
    (error) => {
        console.error("Error getting location:", error);
    },
    // OPTIONS timeout, accuracy, max cached
    { timeout: 5000, enableHighAccuracy: true, maximumAge: 2000 });
}

function initMap(mapContainer) {
    getLocation();
    addMapCredits(map);
    console.log("Map initialized");
}

function addEventListeners() {
    console.log("Event Listeners added");
}

function main(){
    console.log("Electricity Business Application Started");
    addEventListeners();
    initMap('map');
}

main();