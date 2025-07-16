// import { Borne } from './modules/borne.js';
// import { BornePublique } from './modules/publicBorne.js';
// import { BornePrivee } from './modules/privateBorne.js';
// import { Reservation } from './modules/reservation.js';

const adresseInput = document.getElementById("adresse-input");
const adressLookupButton = document.getElementById("adress-lookup-btn");
const mapContainer = document.getElementById("map");
let map = L.map(mapContainer);
// let positionMarker = L.marker();
// positionMarker = positionMarker.setLatLng([latitude, longitude]).addTo(map);

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
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}, positionAccuracy: ${position.coords.accuracy}`);
    },
    (error) => {
        console.error("Error getting location:", error);
    },
    // OPTIONS timeout, accuracy, max cached
    { timeout: 5000, enableHighAccuracy: true, maximumAge: 2000 });
}

function initMap() {
    getLocation();
    addMapCredits(map);
    console.log("Map initialized");
}

async function adressLookUp(){
    const endpoint = 'https://nominatim.openstreetmap.org/search?q=';
    const queryParam = sanitizeInput(adresseInput.value) + '&format=json';

    try {
        let response = await fetch(endpoint + queryParam, {
            method: 'GET',
            headers: {
                'User-Agent': 'Evaluation JavaScript App'
            }
        });
        // Error handling
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
        const data = await response.json();
        console.log("Response from Nominatim:", data);
        return data;
    }
    catch (error) {
        console.error("Error fetching data from Nominatim:", error);
    }
}

function addEventListeners() {
    const testButton = document.getElementById("test-button");
    testButton.addEventListener("click", () => test());

    adressLookupButton.addEventListener("click", (event) => {
        event.preventDefault();
        adressLookUp();
    });
    console.log("Event Listeners added");
}

function sanitizeInput(input) {
    // Removes <HTML Tags> and trims whitespace
    return input.replace(/<[^>]*>/g, '').trim();
}

function main(){
    console.log("Electricity Business Application Started");
    addEventListeners();
    initMap('map');
}





async function test(){
    
}

main();