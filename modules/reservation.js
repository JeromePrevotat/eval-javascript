 export class Reservation {
    static idGenerator = 1;
    constructor(borneId, typeBorne, date, startTime, duration) {
        this.id = Reservation.idGenerator++;
        this.idBorne = borneId;
        this.typeBorne = typeBorne;
        this.date = date;
        this.heureDebut = startTime;
        this.duree = duration;
    }

    toHTMMLTable() {
        const row = document.createElement('tr');
        row.dataset.id = this.id;
        const borneIdTd = document.createElement('td');
        borneIdTd.textContent = this.idBorne;
        row.appendChild(borneIdTd);
        const typeBorneTd = document.createElement('td');
        typeBorneTd.textContent = this.typeBorne;
        row.appendChild(typeBorneTd);
        const dateTd = document.createElement('td');
        dateTd.textContent = this.date;
        row.appendChild(dateTd);
        const startTimeTd = document.createElement('td');
        startTimeTd.textContent = this.heureDebut;
        row.appendChild(startTimeTd);
        const durationTd = document.createElement('td');
        durationTd.textContent = this.duree;
        row.appendChild(durationTd);
        return row;
    }
}
