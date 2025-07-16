import { Borne } from './borne.js';

export class BornePrivee extends Borne {
    constructor(latitude, longitude, proprietaire) {
        super(latitude, longitude);
        this.proprietaire = proprietaire;
    }

    toHTML() {
        return `<div class="borne" data-id="${this.id}">
                    <p>Latitude: ${this.latitude}</p>
                    <p>Longitude: ${this.longitude}</p>
                    <p>Propriétaire: ${this.proprietaire}</p>
                </div>`;
    }
}