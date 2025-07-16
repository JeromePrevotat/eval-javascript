import { Borne } from './borne.js';

export class BornePrivee extends Borne {
    constructor(latitude, longitude, proprietaire) {
        super(latitude, longitude);
        this.proprietaire = proprietaire;
    }

    toHTMLMarker() {
        return `<div class="borne" data-id="${this.id}">
                    <p style="font-weight: bold;">Borne ID: ${this.id}</p>
                    <p>Coordonées: ${this.latitude}, ${this.longitude}
                    <br>
                    Type: Privée
                    <br>
                    Propriétaire: ${this.proprietaire}</p>
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
        typeTd.textContent = 'Privée';
        row.appendChild(typeTd);
        const ownerTd = document.createElement('td');
        ownerTd.textContent = this.proprietaire;
        row.appendChild(ownerTd);
        return row;
    }
}