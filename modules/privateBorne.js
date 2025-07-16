import { Borne } from './borne.js';

export class BornePrivee extends Borne {
    constructor(latitude, longitude, proprietaire) {
        super(latitude, longitude);
        this.proprietaire = proprietaire;
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
        infosParagraph.textContent = `Coordonées: ${this.latitude}, ${this.longitude}\nType: Privée\nPropriétaire: ${this.proprietaire}`;
        div.appendChild(infosParagraph);
        // Button
        const button = document.createElement('button');
        button.className = 'btn btn-primary btn-sm btn-book';
        button.textContent = 'Réserver';
        // Call custom event from parent class
        button.addEventListener('click', () => {
            this.reservationEvent('Privée', this.proprietaire);
        });
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
        typeTd.textContent = 'Privée';
        row.appendChild(typeTd);
        const ownerTd = document.createElement('td');
        ownerTd.textContent = this.proprietaire;
        row.appendChild(ownerTd);
        const actionTd = document.createElement('td');
        const reserverBtn = document.createElement('button');
        reserverBtn.className = 'btn btn-primary btn-sm btn-book';
        reserverBtn.textContent = 'Réserver';
        // Call custom event from parent class
        reserverBtn.addEventListener('click', () => {
            this.reservationEvent('Privée', this.proprietaire);
        });
        actionTd.appendChild(reserverBtn);
        row.appendChild(actionTd);
        return row;
    }
}