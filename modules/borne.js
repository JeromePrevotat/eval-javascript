export class Borne{
    constructor(latitude, longitude) {
        this.id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.marker = null;
    }

    toHTMLMarker() {
        // Container
        const div = document.createElement('div');
        div.className = 'borne';
        div.dataset.id = this.id;
        // ID
        const idParagraph = document.createElement('p');
        idParagraph.style.fontWeight = 'bold';
        idParagraph.textContent = `Borne ID: ${this.id}`;
        div.appendChild(idParagraph);
        // Coordonées and Type
        const infosParagraph = document.createElement('p');
        // Use pre-wrap to allow line breaks
        infosParagraph.style.whiteSpace = 'pre-wrap';
        infosParagraph.textContent = `Coordonées: ${this.latitude}, ${this.longitude}\nType: Publique`;
        div.appendChild(infosParagraph);
        // Button
        const button = document.createElement('button');
        button.className = 'btn btn-primary btn-sm btn-book';
        button.textContent = 'Réserver';
        div.appendChild(button);
        return div;
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
        const actionTd = document.createElement('td');
        const reserverBtn = document.createElement('button');
        reserverBtn.className = 'btn btn-primary btn-sm btn-book';
        reserverBtn.textContent = 'Réserver';
        actionTd.appendChild(reserverBtn);
        row.appendChild(actionTd);
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