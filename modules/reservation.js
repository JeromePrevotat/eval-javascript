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
        const actionTd = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm reservation-delete-btn';
        deleteBtn.textContent = 'Supprimer';
        // Call custom event listener for deletion
        deleteBtn.addEventListener('click', () => {
            this.deleteReservationEvent();
        });
        actionTd.appendChild(deleteBtn);
        row.appendChild(actionTd);
        return row;
    }

    // Custom Event for deletion
    deleteReservationEvent(){
        const event = new CustomEvent('delete-reservation-event', {
            detail: {
                reservationId: this.id,
            }
        });
        // Dispatch the event to the document so it can be catched by the listener
        document.dispatchEvent(event);
    }
}
