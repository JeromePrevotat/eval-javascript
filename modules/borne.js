export class Borne{
    constructor(latitude, longitude) {
        this.id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.marker = null;
    }

    toHTMLMarker() {
        return `<div class="borne" data-id="${this.id}">
                    <p style="font-weight: bold;">Borne ID: ${this.id}</p>
                    <p>Coordonées: ${this.latitude}, ${this.longitude}
                    <br>
                    Type: Publique</p>
                </div>`;
    }

    toHTMLTable() {
        const row = document.createElement('tr');
        row.dataset.id = this.id;
        const idTd = document.createElement('td');
        idTd.textContent = this.id;
        row.appendChild(idTd);
        const coordsTd = document.createElement('td');
        coordsTd.textContent = `${this.latitude}, ${this.longitude}`;
        row.appendChild(coordsTd);
        const typeTd = document.createElement('td');
        typeTd.textContent = 'Publique';
        row.appendChild(typeTd);
        const ownerTd = document.createElement('td');
        ownerTd.textContent = 'N/A';
        row.appendChild(ownerTd);
        return row;
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