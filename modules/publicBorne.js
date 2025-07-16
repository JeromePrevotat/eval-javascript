import { Borne } from './borne.js';

export class BornePublique extends Borne {
    constructor(latitude, longitude) {
        super(latitude, longitude);
        this.type = 'Publique';
    }

    toHTMLMarker() {
        return super.toHTMLMarker();
    }

    toHTMLTable() {
        return super.toHTMLTable();
    }
}