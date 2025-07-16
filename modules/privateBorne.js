import { Borne } from './borne.js';
import { BornePublique } from './publicBorne.js';

export class BornePrivee extends Borne {
    constructor(latitude, longitude, proprietaire) {
        super(latitude, longitude);
        this.proprietaire = proprietaire;
    }

    toHTML() {
        return `<div class="borne" data-id="${this.id}">
                    <p style="font-weight: bold;">Borne ID: ${this.id}</p>
                    <p>Coordonées: ${this.latitude}, ${this.longitude}
                    <br>
                    Type: ${this instanceof BornePublique ? 'Publique' : 'Privée'}
                    <br>
                    Propriétaire: ${this.proprietaire}</p>
                </div>`;
    }
}