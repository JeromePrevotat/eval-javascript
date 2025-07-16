export class Borne{
    constructor(latitude, longitude) {
        this.id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.marker = null;
    }

    toHTML() {
        return `<div class="borne" data-id="${this.id}">
                    <p>Latitude: ${this.latitude}</p>
                    <p>Longitude: ${this.longitude}</p>
                </div>`;
    }

    isBooked(date, time, duration) {
        return false;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getLatitude() {
        return this.latitude;
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }

    getLongitude() {
        return this.longitude;
    }
    setLongitude(longitude) {
        this.longitude = longitude;
    }

    getMarker() {
        return this.marker;
    }
    setMarker(marker) {
        this.marker = marker;
    }
}