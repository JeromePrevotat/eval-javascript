import { BornePublique } from './modules/publicBorne.js';
import { BornePrivee } from './modules/privateBorne.js';
import { Reservation } from './modules/reservation.js';

const adresseInput = document.getElementById("adresse-input");
const adressLookupBtn = document.getElementById("adress-lookup-btn");
const switchModeBtn = document.getElementById("switch-mode-btn");
const bornesTable = document.getElementById("bornes-table");
const bornesTableBody = document.getElementById("bornes-table-body");
const reservationFormContainer = document.getElementById("reservation-form-container");
const reservationTitle = document.getElementById("reservation-title");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const durationInput = document.getElementById("duree-input");
const confirmReservationBtn = document.getElementById("confirm-reservation-btn");
const reservationTableBody = document.getElementById("reservations-table-body");

let latitude;
let longitude;
let circle;
let isLocalStorageAvailable = false;
const bornes = [];
const reservations = [];
const proprietaireNames = [
    "Adélaïde", "Adèle", "Adeline",
    "Adrien", "Adrienne", "Agathe",
    "Aglaé", "Agnès", "Aimé",
    "Aimée", "Alain", "Alban",
    "Albane", "Albert", "Albin",
    "Alex", "Alexandra", "Alexandre",
    "Alexandrine", "Alexia", "Alexis",
    "Alfred", "Alice", "Aliette",
    "Aline", "Alix", "Alizée",
    "Amandine", "Ambre", "Amédée",
    "Amélie", "Anaïs", "André",
    "Andrée", "Ange", "Angèle",
    "Angeline", "Angélique", "Annabelle",
    "Anne", "Annette", "Annick",
    "Annie", "Antoine", "Antoinette",
    "Antonin", "Ariane", "Ariel",
    "Arielle", "Arlette", "Armand",
    "Armande", "Armel", "Armelle",
    "Arnaud", "Arsène", "Arthur",
    "Aubin", "Aude", "Auguste",
    "Augustin", "Aurélie", "Aurélien",
    "Auriane", "Aurore", "Axel",
    "Axelle", "Aymeric",

    "Baptiste", "Barnabé", "Basile",
    "Bastien", "Baudouin", "Béatrice",
    "Bénédicte", "Benjamin", "Benjamine",
    "Benoît", "Benoîte", "Bérangère",
    "Bérenger", "Bérengère", "Bérénice",
    "Bernadette", "Bernard", "Bertin",
    "Bertrand", "Blanche", "Blandine",
    "Brice", "Brigitte", "Bruno",

    "Camille", "Capucine", "Carine",
    "Carole", "Caroline", "Catherine",
    "Cathy", "Cécile", "Cédric",
    "Céline", "Chantal", "Charlène",
    "Charles", "Charlotte", "Chimène",
    "Chloé", "Christèle", "Christelle",
    "Christian", "Christiane", "Christine",
    "Christophe", "Claire", "Clarisse",
    "Claude", "Claudette", "Claudie",
    "Claudine", "Clémence", "Clément",
    "Clémentine", "Clotilde", "Colette",
    "Constance", "Constant", "Constantin",
    "Coralie", "Corentin", "Corinne",
    "Cyril", "Cyrille",

    "Damien", "Daniel", "Danièle",
    "Danielle", "Daphné", "David",
    "Delphine", "Denis", "Denise",
    "Diane", "Didier", "Dominique",
    "Donatien", "Dorian", "Doriane",
    "Dorothée",

    "Edgard", "Edith", "Edmond",
    "Edouard", "Edwige", "Eléonore",
    "Eliane", "Elisabeth", "Elise",
    "Elodie", "Eloi", "Eloïse",
    "Elsa", "Emeline", "Emile",
    "Emilie", "Emilien", "Emma",
    "Emmanuel", "Emmanuelle", "Eric",
    "Erwan", "Estelle", "Esther",
    "Etienne", "Eudes", "Eugène",
    "Eugénie", "Evariste", "Eve",
    "Evelyne",

    "Fabien", "Fabienne", "Fabrice",
    "Fanny", "Faustine", "Félix",
    "Ferdinand", "Flavie", "Flavien",
    "Flore", "Florence", "Florent",
    "Florentine", "Florian", "Floriane",
    "Florine", "France", "Francis",
    "Franck", "François", "Françoise",
    "Frédéric", "Frédérique",

    "Gabriel", "Gabrielle", "Gaël",
    "Gaëlle", "Gaétan", "Gaétane",
    "Garence", "Gaspard", "Gaston",
    "Gauthier", "Gautier", "Geneviève",
    "Geoffroy", "Georges", "Georgette",
    "Gérald", "Géraldine", "Gérard",
    "Germain", "Germaine", "Ghislain",
    "Ghislaine", "Gilbert", "Gildas",
    "Gilles", "Gisèle", "Godefroy",
    "Gonzague", "Grace", "Grégoire",
    "Guillaume", "Gustave", "Guy",
    "Guylaine",

    "Hector", "Hélène", "Héloïse",
    "Henri", "Henriette", "Herbert",
    "Hervé", "Honoré", "Hortense",
    "Hubert", "Hugues",

    "Irène", "Isabelle",

    "Jacqueline", "Jacques", "Janine",
    "Jannick", "Jasmine", "Jean",
    "Jean-Baptiste", "Jean-Louis", "Jean-Loup",
    "Jean-Luc", "Jean-Marie", "Jeanne",
    "Jeannette", "Jeannine", "Jérémie",
    "Jérôme", "Joachim", "Joanne",
    "Jocelyn", "Jocelyne", "Joël",
    "Joëlle", "Johan", "Johanne",
    "Josée", "Joseph", "Joséphine",
    "Josette", "Josiane", "Jules",
    "Julie", "Julien", "Julienne",
    "Juliette", "Justin", "Justine",

    "Karine",

    "Lambert", "Laure", "Laurence",
    "Laurent", "Laurette", "Lauriane",
    "Léa", "Léon", "Léonard",
    "Léonie", "Léopold", "Léopoldine",
    "Liliane", "Line", "Lionel",
    "Lise", "Loïc", "Louis",
    "Louise", "Luc", "Lucas",
    "Lucie", "Lucien", "Lucile",
    "Ludivine", "Ludovic", "Lydie",

    "Madeleine", "Magali", "Manon",
    "Marc", "Marcel", "Marcelin",
    "Marianne", "Marie", "Marie-Ange",
    "Marie-Josée", "Marielle", "Marie-Lou",
    "Marin", "Marine", "Marion",
    "Marjorie", "Martial", "Martin",
    "Martine", "Marylène", "Maryline",
    "Maryse", "Maryvonne", "Mathias",
    "Mathieu", "Mathilde", "Mathis",
    "Matthias", "Matthieu", "Maud",
    "Maurice", "Maxence", "Maxime",
    "Maximilien", "Maximilienne", "Mégane",
    "Mélanie", "Michel", "Michèle",
    "Micheline", "Michelle", "Milène",
    "Mireille", "Monique", "Morgane",
    "Muriel", "Murielle", "Mylène",

    "Nadège", "Nadine", "Nathalie",
    "Nelly", "Nicolas", "Nicole",
    "Noël", "Noëlle", "Noémie",
    "Norbert",

    "Odile", "Olivier", "Ophélie",
    "Oriane",

    "Pascal", "Pascale", "Pascaline",
    "Patrice", "Patricia", "Patrick",
    "Paul", "Paule", "Paulette",
    "Paulin", "Pauline", "Philippe",
    "Philippine", "Pierre", "Pierrette",

    "Quentin",

    "Rachel", "Raoul", "Raphaël",
    "Raphaëlle", "Raymond", "Régine",
    "Régis", "Réjane", "Rémi",
    "Rémy", "Renaud", "René",
    "Renée", "Richard", "Robert",
    "Robin", "Rodolphe", "Rodrigue",
    "Roger", "Roland", "Rolande",
    "Romain", "Romane", "Romuald",
    "Rosalie", "Rose", "Roseline",
    "Rosine", "Roxane",

    "Sabine", "Samuel", "Sandrine",
    "Sarah", "Sébastien", "Ségolène",
    "Serge", "Séverine", "Sibylle",
    "Simon", "Simone", "Solange",
    "Solène", "Sophie", "Stéphane",
    "Stéphanie", "Suzanne", "Sylvain",
    "Sylvaine", "Sylvestre", "Sylviane",
    "Sylvie",

    "Tanguy", "Théodore", "Théophile",
    "Thérèse", "Thibaud", "Thibaut",
    "Thierry", "Thomas", "Timothée",
    "Tiphaine", "Tristan",

    "Ursule",

    "Valentin", "Valérie", "Valéry",
    "Vanessa", "Véronique", "Victoire",
    "Victor", "Vincent", "Violaine",
    "Virginie", "Viviane", "Vivien",

    "Xavier",

    "Yann", "Yannick", "Yolande",
    "Yveline", "Yves", "Yvon",

    "Zacharie", "Zoé"
];
// Leaflet library
const mapContainer = document.getElementById("map");
let map = L.map(mapContainer);
// Overpass API
const overpassApiendpoint = 'https://overpass-api.de/api/interpreter';
const overpassTimeout = 10; // seconds
const radius = 5000; // meters

function isStorageAvailable(type){
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
    return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}

function displayReservations(reservations) {
    // Clear previous table content
    reservationTableBody.innerHTML = "";
    // Aucune Réservation en cours
    if (reservations.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.textContent = "Aucune réservation trouvée";
        tr.appendChild(td);
        reservationTableBody.appendChild(tr);
    }
    // Add each Reservation to the table
    reservations.forEach(reservation => {
        reservationTableBody.appendChild(reservation.toHTMMLTable());
    });
}

function validateReservationInputs() {}

function confirmReservation() {
    let error = null;
    error = validateReservationInputs();
    if (error) {
        console.error("Invalid reservation inputs:", error);
        return;
    }
    // Get the values from the form inputs and the borne ID from the data-id attribute
    const borneId = reservationFormContainer.dataset.borneId;
    if (!borneId) {
        console.error("Borne ID is not set in the reservation form container.");
        return;
    }
    // Find the type of the Borne using the ID
    const typeBorne = bornes.filter(borne => borne.id == borneId)[0].type;
    const date = dateInput.value;
    const startTime = timeInput.value;
    const duration = durationInput.value;

    // Create a new Reservation object
    const reservation = new Reservation(borneId, typeBorne, date, startTime, duration);
    reservations.push(reservation);
    // Save the reservation to localStorage if available
    if (isLocalStorageAvailable) {
        localStorage.setItem("reservations", JSON.stringify(reservations));
        displayReservations(getReservationsFromLocalStrorage());
    }
    // Display from memory if localStorage is not available
    else displayReservations(reservations);
    // Clear Inputs for the next reservation
    setDefaultReservationInputsValues();
    durationInput.value = '';
}

function setDefaultReservationInputsValues() {
    const today = new Date();
        // Set default values for date input to today's date "YYYY-MM-DD"
        dateInput.value = today.toLocaleDateString('sv-SE');
        // Set default time to current hour and minute "HH:MM" with local timezone
        timeInput.value = today.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
}

function handleReservation(borneId, type, proprietaire) {
    reservationFormContainer.style.display = 'block';
    reservationFormContainer.dataset.borneId = borneId;
    const titleText = (proprietaire == null || proprietaire == "N/A") ?
                                        `Réserver la borne ${type} (${borneId})` :
                                        `Réserver la borne ${type} (${borneId}) de ${proprietaire}`;
    reservationTitle.textContent = titleText;
    setDefaultReservationInputsValues();
}

function buildTable() {
    if (bornes.length === 0) {
        console.warn("No Bornes available to display in the table.");
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.textContent = "Aucune borne disponible";
        tr.appendChild(td);
        bornesTableBody.appendChild(tr);
        return;
    }
    // Clear previous table content
    bornesTableBody.innerHTML = "";
    // Add each Borne to the table
    bornes.forEach(borne => {
        bornesTableBody.appendChild(borne.toHTMLTable());
    });
}

function pickRandomname(){
    const randomIndex = Math.floor(Math.random() * proprietaireNames.length);
    return proprietaireNames[randomIndex];
}

function fillBornesArray(data){
    if (!data || !data.elements) {
        console.error("Invalid data received from Overpass API");
        return;
    }
    if (data.elements.length === 0) {
        console.warn("No charging stations found in the specified area.");
        return;
    }
    // Clear previous list
    bornes.length = 0;
    // Add each Borne to the empty list
    data.elements.forEach(element => {
        // Even ID are Public
        if(element.id % 2 === 0) {
            const borne = new BornePublique(element.lat, element.lon);
            borne.id = element.id;
            borne.marker = L.marker([element.lat, element.lon]).addTo(map);
            borne.marker.bindPopup(borne.toHTMLMarker());
            bornes.push(borne);
        } else {
            const borne = new BornePrivee(element.lat, element.lon, pickRandomname());
            borne.id = element.id;
            borne.marker = L.marker([element.lat, element.lon]).addTo(map);
            borne.marker.bindPopup(borne.toHTMLMarker());
            bornes.push(borne);
        }
    });


}

async function fetchBornes(){
    if (!latitude || !longitude) {
        console.error("Latitude and Longitude are not set. Please get the location first.");
        return;
    }
    // Items are classified as node/way/relation
    // Ignore ways and relations for now as they represents area and as such have a different coord structure
    // way["amenity"="charging_station"](around:${radius},${latitude},${longitude});
    // relation["amenity"="charging_station"](around:${radius},${latitude},${longitude});
    const query = `[out:json][timeout:${overpassTimeout}];
    (
        node["amenity"="charging_station"](around:${radius},${latitude},${longitude});
    );
    out geom;`;
        
    try {
        const response = await fetch(overpassApiendpoint, {
            // POST is the recommended method for Overpass API
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `data=${encodeURIComponent(query)}`
        });
        // Error handling
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Everything is ok, parse the JSON response
        const data = await response.json();
        // Create Bornes from the data
        fillBornesArray(data);
    } catch (error) {
        console.error("Error fetching data from Overpass API:", error);
    }
}

async function adressLookUp(){
    const endpoint = 'https://nominatim.openstreetmap.org/search?q=';
    const queryParam = sanitizeInput(adresseInput.value) + '&format=json';

    try {
        // Send the GET request to Nominatim API
        let response = await fetch(endpoint + queryParam, {
            method: 'GET',
            headers: {
                'User-Agent': 'Evaluation JavaScript App'
            }
        });
        // Error handling
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // Parse the JSON response
        const data = await response.json();
        console.log("Response from Nominatim:", data);
        // Check if data is not empty and set the map location
        if (data.length == 0) {
            console.warn("No results found for the provided address.");
            return;
        }
        // Center the map on the first result
        latitude = data[0].lat;
        longitude = data[0].lon;
        setMapLocation(latitude, longitude);
        // Add a circle to the map at the location
        circle = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 5000
        }).addTo(map);
        // Get Bornes around this location
        fetchBornes();        
    }
    catch (error) {
        console.error("Error fetching data from Nominatim:", error);
    }
}

function setMapLocation(latitude, longitude) {
    if (latitude && longitude) {
        map.setView([latitude, longitude], 14);
    } else {
        console.error("Invalid latitude or longitude provided.");
    }
}

function addMapCredits(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
}

function getLocation(){
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

function addEventListeners() {
    const testButton = document.getElementById("test-button");
    testButton.addEventListener("click", () => test());

    adressLookupBtn.addEventListener("click", (event) => {
        event.preventDefault();
        adressLookUp();
    });

    switchModeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Toggle the map view mode
        if(mapContainer.style.display === "none") {
            mapContainer.style.display = "block";
            bornesTable.style.display = "none";
        } else {
            mapContainer.style.display = "none";
            bornesTable.style.display = "block";
            buildTable();
        }
    });

    confirmReservationBtn.addEventListener("click", (event) => {
        event.preventDefault();
        confirmReservation();
    });

    // Custom event listener for reservation
    document.addEventListener('custom-reservation-event', (event) => {
        const { borneId, type, proprietaire } = event.detail;
        handleReservation(borneId, type, proprietaire);
    });

    console.log("Event Listeners added");
}

function sanitizeInput(input) {
    // Removes <HTML Tags> and trims whitespace
    return input.replace(/<[^>]*>/g, '').trim();
}

function getReservationsFromLocalStrorage() {
    if (isLocalStorageAvailable && localStorage.getItem("reservations")) {
        // Clear memory array
        reservations.length = 0;
        JSON.parse(localStorage.getItem("reservations"))
                .forEach(reservation => {
                    const reservationObj = new Reservation(
                        reservation.idBorne,
                        reservation.typeBorne,
                        reservation.date,
                        reservation.heureDebut,
                        reservation.duree);
                    reservationObj.id = reservation.id;
                    // Add the reservation to the memory array
                    reservations.push(reservationObj);
        })
    }
    return reservations;
}

function main(){
    console.log("Electricity Business Application Started");
    addEventListeners();
    isLocalStorageAvailable = isStorageAvailable("localStorage");
    if (isLocalStorageAvailable !== true) console.error("LocalStorage is not available");
    initMap('map');
    if (isLocalStorageAvailable && localStorage.getItem("reservations")) {
        displayReservations(getReservationsFromLocalStrorage());
    }
}





async function test(){
    console.log(bornes);
}

main();